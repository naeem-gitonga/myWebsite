'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import ubuntuEC2 from '../../pictures/ec2-linux.png';
import ec2Dashboard from '../../pictures/ec2-dashboard.png';
import launchInstance from '../../pictures/launch-instance.png';
import t2Micro from '../../pictures/t2-micro.png';
import instanceRunning from '../../pictures/node-test.png';
import nodeTestPem from '../../pictures/node-test.gif';
import securityGroup from '../../pictures/security-group.png';
import connecting from '../../pictures/connect-instructions.gif';
import ubuntuTerminal from '../../pictures/ubuntu-terminal.gif';
import itWorks from '../../pictures/ec2-it-works.gif';
import Link from 'next/link';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

// * &ldquo; &rdquo; &apos;
export default function MicroPartTwo(): JSX.Element {
  const { innerWrapper, pre, code, imageWrapper, altText, text, anchorColor } =
    styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  return (
    <div id="micro-services-pt-2" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Micro Services Part I: Node, Docker, and Docker Compose</h1>
        <ArticleDateTime imageUrl="mspt2" />
        <div className={imageWrapper}>
          <Image
            alt="AWS EC2, Ubuntu logos"
            loader={imageLoader}
            src={ubuntuEC2}
            style={{ objectFit: 'contain', maxWidth: '50%' }}
            fill
          />
        </div>
        <p className={text}>
          Log into your AWS account and go to EC2. You&apos;ll know you&apos;re
          in your EC2 dashboard if you see something like this:
        </p>
        <div className={imageWrapper}>
          <Image
            alt="AWS EC2 dashboard view"
            loader={imageLoader}
            src={ec2Dashboard}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>EC2 Dashboard</p>
        </div>
        <p className={text}>
          We&apos;re going to launch a new EC2 instance, so click that blue
          button labeled &ldquo;Launch Instance&rdquo;. Once there, you will see
          a list of different machine images. Let&apos;s chose the Ubuntu Server
          18.04 LTS. Why, cause I like the Ubuntu distribution and it&apos;s
          eligible for the free tier. 😉
        </p>
        <div className={imageWrapper}>
          <Image
            alt="AWS EC2 launch instance view"
            loader={imageLoader}
            src={launchInstance}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>Launch Instance (chose AMI)</p>
        </div>
        <p className={text}>
          We&apos;re going to leave the default selected for this small project
          but the{' '}
          <a
            target="_blank"
            href="https://aws.amazon.com/blogs/aws/new-ec2-instances-a1-powered-by-arm-based-aws-graviton-processors/"
          >
            64-bit (Arm)
          </a>{' '}
          version of this AMI is supposed to maximize efficiency, therefore
          being optimized for performance and cost. This simple instance
          won&apos;t use many resources at all and I will tear it down after
          building it. 🤷🏿‍♂️
        </p>
        <p className={text}>
          Once we have hit the button labeled &ldquo;Select&rdquo; we will be
          taken to the instance type screen. Here we&apos;ll need to chose what
          type of instance we will have. It&apos;s important that we choose a
          free tier. The &ldquo;t2.micro&rdquo; tier will be the default, so
          let&apos;s stick with it.
        </p>
        <div className={imageWrapper}>
          <Image
            alt="AWS EC2 "
            loader={imageLoader}
            src={t2Micro}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>Instance Type (t2.micro &ldquo;free&rdquo;)</p>
        </div>
        <p className={text}>
          We could stop here, but let&apos;s skip on to &ldquo;Step 6: Configure
          Security Group&rdquo;. I have elected to skip steps: 3, 4, 5 because
          one, they are optional and two, we are creating a very simple project
          and we want to get it up and running quickly. I&apos;m not against
          configuring the instance or adding storage or adding tags; however,
          the defaults are enough to get us going.
        </p>
        <p className={text}>
          What we need to do in Step 6 is to create a security group so that we
          will be able to SSH into our AMI and &ldquo;spin up our
          container&rdquo;. It will come with a default name and description but
          I&apos;m going to change them both to{' '}
          <code className={code}>node-test-demo</code>.
        </p>
        <p className={text}>
          Next I am going to change the &ldquo;Source&rdquo; of the default rule
          to &ldquo;My IP&rdquo;. I will then &ldquo;Add&rdquo; a new HTTP rule.
          Once again, for the source select &ldquo;My IP&rdquo;. It should look
          something like this when you finish.
        </p>
        <div className={imageWrapper}>
          <Image
            alt="AWS EC2 Configure security group"
            loader={imageLoader}
            src={securityGroup}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>Security Group</p>
        </div>
        <p className={text}>
          Once we start to SSH into our AMI, we&apos;ll do that on Port 22. And
          when the container is running on our AMI and we have our Public DNS,
          we&apos;ll be able to visit it as it will be opened on Port 80. We
          could assign that port to whatever we want but by leaving it on 80
          (the default) it would be like visiting{' '}
          <code className={code}>http://localhost</code> versus assigning it to
          another port, let&apos;s say, Port 8080. In that case we would then
          have to visit <code className={code}>http://localhost:8080</code>.
        </p>
        <p className={text}>Cool!</p>
        <p className={text}>
          Now that we have that set up click the button labeled &ldquo;Review
          and Launch&rdquo;.
        </p>
        <p className={text}>
          Once you are at the launch screen click &ldquo;Launch&rdquo; and you
          will be prompted to either choose an existing key pair or to create a
          new one. Create a new one. Name it and download it. I named mine{' '}
          <code className={code}>node-test</code>.
        </p>
        <div className={imageWrapper}>
          <Image
            alt="node-test.pem file GIF"
            loader={imageLoader}
            src={nodeTestPem}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p aria-details="GIF of setup of .pem file" className={altText}>
            node-test.pem
          </p>
        </div>
        <p className={text}>
          Cool! You&apos;ve just launched a new Ubuntu Server on AWS EC2!
        </p>
        <p className={text}>
          Now after you&apos;ve downloaded your{' '}
          <code className={code}>node-test.pem</code> file you should store it
          somewhere safe. I store my <code className={code}>*.pem</code> files
          in the <code className={code}>.ssh</code> directory in my root. You
          should put yours someplace similar.
        </p>
        <h2>Step 2: Connect to Instance</h2>
        <p className={text}>
          Now that we have successfully created an instance we need to grab our
          instance Instance ID so that we can connect to our Linux instance
          using SSH. If you cannot find your Instance ID, go to your EC2
          dashboard, and on the right hand side click where it says
          &ldquo;Instances&rdquo; and it should show up.
        </p>
        <div className={imageWrapper}>
          <Image
            alt="AWS EC2 dashboard instance running"
            loader={imageLoader}
            src={instanceRunning}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p
            aria-details="picture of instance running in dashboard"
            className={altText}
          >
            node-test instance
          </p>
        </div>

        <p className={text}>
          Next, we need to bring up our SSH client so that we can actually work
          on our AWS EC2 instance.
        </p>
        <p className={text}>
          If we right click on the Public DNS we should see a pop-up that has
          instructions on connecting.
        </p>

        <div className={imageWrapper}>
          <Image
            alt="GIF Showing AWS EC2 connecting"
            loader={imageLoader}
            src={connecting}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p aria-details="description of image" className={altText}>
            Connection Instructions
          </p>
        </div>

        <p className={text}>
          That first command is the &ldquo;change mode&rdquo; command and it
          sets the permissions of your private key file so that only you can
          read it. I stored my <code className={code}>node-test.pem</code> in my{' '}
          <code className={code}>.ssh</code> directory so I will correct my path
          accordingly.
        </p>
        <p className={text}>
          Enter the second command and update your path if necessary to make the
          actual connection.
        </p>

        <div className={imageWrapper}>
          <Image
            alt="GIF Showing Ubuntu terminal connecting"
            loader={imageLoader}
            src={ubuntuTerminal}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p aria-details="description of image" className={altText}>
            Connecting
          </p>
        </div>

        <p className={text}>Once you have entered those commands you are in!</p>
        <p className={text}>Great!</p>
        <p className={text}>
          **I also ran an additional command{' '}
          <code className={code}>$ sudo su</code> so that I could run commands
          as the root user.
        </p>
        <h2>Step 3: Stand up our container</h2>

        <p className={text}>
          The last thing that we need to do is to get our container onto this
          instance.
        </p>
        <p className={text}>
          First run the command <code className={code}>$ apt-get update</code>.
          We should have the latest but let&apos;s be on the safe side.
        </p>
        <p className={text}>Next run the following commands:</p>

        <pre className={pre}>
          <code
            className={code}
          >{`$ apt install docker.io\n$ docker pull jahaplace/node-test\n$ docker run -d -p 80:8080 jahaplace/node-test`}</code>
        </pre>

        <p className={text}>
          First, we install Docker. Next, I have already made{' '}
          <code className={code}>node-test</code> a docker repo and it can be
          pulled from the Docker Hub so that&apos;s what we&apos;re doing in the
          second command. If you want to know how to create an image from
          scratch on an EC2 instance it&apos;s very similar to what we did in
          part one Micro Services Part I: Node, Docker, and Docker Compose. The
          difference is that you would need to use the terminal and Vim (or some
          other editor) to create your files. If you would like to see me do
          that, let me know and I will create a video of me demonstrating how
          that&apos;s accomplished.
        </p>

        <p className={text}>
          The last command is telling docker to run our container in a detached
          mode and map the outside port to 80 while the app runs on 8080 inside
          of the container.
        </p>

        <p className={text}>
          After doing that, take your &ldquo;Public DNS&rdquo; (which can be
          found on your instance dashboard), paste it into the browser and
          voila! Your app is now running in the cloud (on someone else&apos;s
          computer)!
        </p>

        <div className={imageWrapper}>
          <Image
            alt="AWS EC2 running Ubuntu terminal"
            loader={imageLoader}
            src={itWorks}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>Running node-test</p>
        </div>

        <p className={text}>
          I hope you found this helpful! Please let me know!
        </p>

        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'Microservices',
              'Docer',
              'Containers',
              'Backend Development',
              'Software Engineering',
              'DevOps',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
