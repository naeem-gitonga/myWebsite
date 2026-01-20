'use client';
import LazyImage from '@/components/LazyImage/LazyImage';
import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { imageLoader } from '@/utils/imageLoader';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function ShutdownSync(): React.JSX.Element {
  const {
    innerWrapper,
    text,
    altText,
    imageWrapper
  } = articleStyles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;

  return (
    <div id="shutdown-sync" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>A Weekend Learning macOS Development</h1>
        <ArticleDateTime imageUrl="shutdownsync" />
        <div className={imageWrapper}>
          <LazyImage
            alt="octopus working underwarter"
            loader={imageLoader}
            src="/images/octopus-working.webp"
            width={1920}
            height={1280}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            loading="eager"
            fetchPriority="high"
          />
        </div>
        
        <p className={text}>
          <strong>This project started with a noble cause.</strong> I wanted to shutdown my remote machine (a DGX Spark)
          any time I shut down my local machine (my MacBook Pro). Simple enough, right? What followed was a weekend-long
          deep dive into macOS internals that taught me more about the operating system than I ever expected.
        </p>

        <h2>The Problem</h2>
        <p className={text}>
          The setup was straightforward: I have a DGX Spark on my local network that I SSH into for ML workloads.
          When I&apos;m done for the day and shutdown my Mac, I want the Spark to shutdown too. No need to remember
          to SSH in and run <code>sudo shutdown -h now</code> separately.
        </p>

        <h2>Attempt 1: Go Application with LogoutHook</h2>
        <p className={text}>
          My first attempt was a Go application that would listen for the shutdown signal and then SSH to the
          remote machine to send the shutdown command. I learned about the deprecated <code>LogoutHook</code> mechanism
          that macOS provides through <code>com.apple.loginwindow</code>.
        </p>

        <p className={text}>
          The LogoutHook is set via:
        </p>

        <pre className={text}>
          <code>sudo defaults write com.apple.loginwindow LogoutHook /path/to/script.sh</code>
        </pre>

        <p className={text}>
          But here&apos;s the thing about LogoutHook: it&apos;s deprecated. Apple doesn&apos;t recommend it for new development.
          And when I tested it, it simply didn&apos;t trigger during shutdown. The hook is supposed to run when the user
          logs out, but the behavior during system shutdown was unreliable.
        </p>

        <h2>Attempt 2: LaunchAgents and LaunchDaemons</h2>
        <p className={text}>
          This is where I went down the rabbit hole. I learned about <code>launchd</code>, Apple&apos;s replacement for the
          traditional Unix init system. The concept is elegant:
        </p>

        <ul className={text}>
          <li><strong>LaunchAgents</strong> (<code>~/Library/LaunchAgents/</code>) - Run in user context when you log in</li>
          <li><strong>LaunchDaemons</strong> (<code>/Library/LaunchDaemons/</code>) - Run at system boot as root</li>
        </ul>

        <p className={text}>
          I created a plist file that would start a shell script at boot. The script would run <code>tail -f /dev/null</code>
          to stay alive (since macOS&apos;s <code>sleep</code> command doesn&apos;t support <code>infinity</code> like Linux does),
          and use <code>trap</code> to catch SIGTERM:
        </p>

        <pre className={text}>
{`trap shutdown_remote SIGTERM

# Keep the script running
tail -f /dev/null &
wait $!`}
        </pre>

        <p className={text}>
          I discovered a helpful plist key from Apple&apos;s own system daemons:
        </p>

        <pre className={text}>
{`<key>AlwaysSIGTERMOnShutdown</key>
<true/>`}
        </pre>

        <p className={text}>
          This guarantees that launchd sends SIGTERM to your daemon during shutdown. Combined with
          <code>ExitTimeOut</code>, you get a window to perform cleanup before SIGKILL.
        </p>

        <h2>The Real Problem: Shutdown Order</h2>
        <p className={text}>
          Here&apos;s where everything fell apart. My daemon was receiving SIGTERM correctly, but by the time it tried
          to SSH to the remote machine, the network was already down. I saw errors like:
        </p>

        <pre className={text}>
          <code>ssh: Could not resolve hostname spark-45ca.local: nodename nor servname provided</code>
        </pre>

        <p className={text}>
          The mDNS/Bonjour service (which resolves <code>.local</code> hostnames) had already been terminated.
          Okay, I thought, I&apos;ll just use the IP address directly. But then:
        </p>

        <pre className={text}>
          <code>ssh: connect to host 192.168.2.17 port 22: No route to host</code>
        </pre>

        <p className={text}>
          The network interface itself was already down. macOS was tearing down services in an order that made
          my use case impossible. My daemon was getting SIGTERM, but it was too late. The dependencies I needed
          (networking, DNS) were already gone.
        </p>

        <h2>What I Learned</h2>
        <p className={text}>
          After a weekend of experimentation, I gained a deep appreciation for macOS&apos;s shutdown sequence:
        </p>

        <ul className={text}>
          <li><strong>plist files</strong> - The XML configuration format for launchd services</li>
          <li><strong>launchctl</strong> - The command-line tool for managing launchd services (<code>bootstrap</code>, <code>bootout</code>, <code>enable</code>, <code>start</code>)</li>
          <li><strong>System vs User context</strong> - LaunchDaemons run as root but can&apos;t easily access user SSH keys; LaunchAgents run as the user but may not survive logout</li>
          <li><strong>Signal handling</strong> - SIGTERM, SIGKILL, and the timing between them</li>
          <li><strong>Shutdown ordering</strong> - Higher-level services (mDNS, Bonjour) shutdown before lower-level ones (networking), but your daemon might get SIGTERM after both are gone</li>
        </ul>

        <h2>The Unsolved Problem</h2>
        <p className={text}>
          If there were a way to prioritize my daemon so that it executes first in the shutdown order, this would
          probably work. I haven&apos;t found a reliable way to ensure that my script runs before the network stack
          is torn down.
        </p>

        <p className={text}>
          Some ideas I didn&apos;t fully explore:
        </p>

        <ul className={text}>
          <li>A kernel extension that hooks into the shutdown sequence (overkill and requires disabling SIP)</li>
          <li>Monitoring for power button events at a lower level</li>
          <li>Using a sleep/wake hook instead and shutting down the remote on sleep</li>
        </ul>

        <h2>Conclusion</h2>
        <p className={text}>
          This project is dead at this point. But the time wasn&apos;t wasted. I learned more about macOS development
          in one weekend than I had in years of using the platform. Sometimes the journey is the destination.
        </p>

        <p className={text}>
          The code is still on my GitHub if anyone wants to pick up where I left off. Maybe someone smarter than
          me will figure out how to win the race against macOS&apos;s shutdown sequence.
        </p>
        <p className={text}>
          <strong>**This article was principally written by an AI agent, using context from a coding session with small additions, written portions by me (Naeem).</strong>
        </p>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'macOS',
              'LaunchDaemon',
              'LaunchAgent',
              'launchd',
              'SIGTERM',
              'Shell Scripting',
              'SSH',
              'DGX Spark',
              'Software Engineering',
              'Systems Programming'
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
