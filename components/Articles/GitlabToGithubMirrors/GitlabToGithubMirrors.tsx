'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import girlInMirror from '../../pictures/gitlab-mirror.png';
import githubDemoOne from '../../pictures/github-demo-1.png';
import gitlabDemoOne from '../../pictures/gitlab-demo-1.png';
import inputHostKeysManually from '../../pictures/host-keys-manually.png';
import inputHostkeysManually2 from '../../pictures/host-keys-manually-2.png';
import mirrorSetupAlmostDone from '../../pictures/mirror-setup-almost-done.png';
import updatedUsername from '../../pictures/update-username.png';
import addDeployKey1 from '../../pictures/add-deploy-key-1.png';
import addDeployKey2 from '../../pictures/add-deploy-key-2.png';
import clickReplay from '../../pictures/click-replay.png';

import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import Link from 'next/link';

export default function GitlabToGithubMirrors(): JSX.Element {
  const { innerWrapper, imageWrapper, altText, text, code, pre } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  // * &rdquo; &ldquo; &apos;
  return (
    <div id="servers" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Gitlab to Github Mirrors (PUSH)</h1>
        <ArticleDateTime imageUrl={'gitlabmirror'} />
        <div className={imageWrapper}>
          <Image
            alt="Woman in mirror"
            loader={imageLoader}
            src={girlInMirror}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>Woman in mirror by ChatGPT</p>
        </div>
        <h2>What are mirrors?</h2>
        <p className={text}>
          In the simplest terms, mirrors are a way to get a copy of a repository onto another source control platform.
          There are two types of mirroring strategies: <strong>PUSH</strong> and <strong>PULL</strong>. This article will 
          focus on the <strong>PUSH</strong> strategy on <Link className="link" href="/interstitial?url=https://gitlab.com/naeemgitonga&where=My Gitlab">
            Gitlab
          </Link>. 
        </p>

        <p className={text}>
          The <strong>PUSH</strong> strategy means that when I push to my Gitlab repo the changes will eventually 
          be mirrored (copied) to the corresponding Github repo. 
        </p>

        <h2>Why am I writing this?</h2>
        <p className={text}>
          I&apos;m writing because of two reasons. One, it&apos;s important to document 
          certain processes. You don&apos;t have to do this process too often, so enough 
          time passes in between time from one to the next that&apos;s enough to forget
          and cost you a couple of hours fumbling through it. 
        </p>
        <p className={text}>
          This doc is similar in quality to the tech docs that I&apos;ve written on past 
          jobs. They always came in handy as I moved from one engineering team to another 
          while performing DevOps and MLOps duties.
        </p>
       
        <h2>Why do you need a mirror?</h2>
        <p className={text}>
          I can only answer this question for myself. Gitlab is free, extensible, and easy to use. 
          Many other tools are capable of doing the job, but for this web app,
           I simply prefer Gitlab.
        </p>
        <p className={text}>
          Another reason is that many of my other repos are in Github and I&apos;m using Gitlab only for 
          the CICD in this one repos. So when I direct people to my  <Link className="link" href="/interstitial?url=https://www.github.com/naeem-gitonga&where=My Github">
            Github
          </Link>{' '}
          this repo will be represented along with all the others, even though it is actively contributed to on the Gitlab platform.
        </p>
        <h2>The Setup</h2>
         <p className={text}>
          First, I&apos;m going to assume that you already have a Gitlab repository and a Github repository
          that you will be mirroring to.
        </p>
        <p className={text}>
          Go to the destination repo on Github. Copy the SSH remote URL. See the image below.
        </p>
        
        <div className={imageWrapper}>
          <Image
            alt="Github Settings"
            loader={imageLoader}
            src={githubDemoOne}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>

        <p className={text}>The URL that you copy will look like this&#58;</p>
        <pre className={pre}>
          <code className={code}>
            {`git@github.com:naeem-gitonga/myWebsite.git`}
          </code>
        </pre>
        <p className={text}>
          We need to turn it into this&#58;
        </p>
        <pre className={pre}>
          <code className={code}>
            {`ssh://git@github.com/naeem-gitonga/myWebsite.git`}
          </code>
        </pre>
        <p className={text}>
          We&apos;ll use the former in the next step.
        </p>

        <p className={text}>
          Next, in Gitlab, go to Settings &rarr; Mirroring repositories
        </p>
        <div className={imageWrapper}>
          <Image
            alt="Gitlab Settings"
            loader={imageLoader}
            src={gitlabDemoOne}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>
        <p className={text}>
          Next, update the repo SSH remote URL with the modified URL that we have above.
        </p>
        <p className={text}>
          Then, make sure that you correct the Authentication Method. We need to use SSH Public Key.
          Choose that in the dropdown.
        </p>

        <p className={text}>
          I prefer to input the host keys manually. This may or may not be the case for you. 
          Press the Input host keys manually button.
          The following textarea will appear. 
        </p>
        <div className={imageWrapper}>
          <Image
            alt="Dropdown input host keys manually"
            loader={imageLoader}
            src={inputHostKeysManually}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>
        <p className={text}>
          Next, run the following command from your terminal:
        </p>
        <pre className={pre}>
          <code className={code}>
            {`$ ssh-keyscan -H -t ed25519 github.com`}
          </code>
        </pre>
        <p className={text}>
          Then, copy the output and paste it in the SSH host keys textarea. 
        </p>
        <pre className={pre}>
          <code className={code}>
            {`# github.com:22 SSH-2.0-1a4a900
|1|i2U6VfH1q6kablr157m40Smrqh4=|5CHFYVuoM6qYNrM5bcmQfUe5/cQ= ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl`}
          </code>
        </pre>

        <p className={text}>
          It should look like the following. 
        </p>
        
         <div className={imageWrapper}>
          <Image
            alt="Dropdown input host keys manually with input"
            loader={imageLoader}
            src={inputHostkeysManually2}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>

        <p className={text}>
          For me, I don&apos;t  enter a username, nor do I 
          check Keep divergent refs or Mirror only protected branches. The second option 
          may be good to check if you have many feature branches and only want to capture
          changes that hit the important or protected branches. 
        </p>

         <div className={imageWrapper}>
          <Image
            alt="Username updated"
            loader={imageLoader}
            src={updatedUsername}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>

        <p className={text}>
          Again, this is a small project. I have two working branches so I am fine
          with neither of the two options checked. 
        </p>
        <p className={text}>
          Now, click Mirror Repository. 
        </p>
        <p className={text}>
          After you&apos;ve clicked Mirror Repository, the box will collapse and you will be 
          left with the following: 
        </p>

        <div className={imageWrapper}>
          <Image
            alt="Dropdown input host keys manually with input"
            loader={imageLoader}
            src={mirrorSetupAlmostDone}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>

        <p className={text}>
          Now, the blue bar at the top is telling you that you have
          successfully created what you need on the Gitlab side.
        </p>
        <p className={text}>
          Next, you&apos;ll need to click the copy button and head back over to Github.
          What you&apos;ve just done was copy the Public Key for the SSH key pair that you
          created. Gitlab is managing the keys so you will not see the private key.
        </p>

        <h2>Almost done...</h2>
        <p className={text}>
          Now that the public key is on your clipboard, head back over to Github.
          In you&apos;re repo, go to Settings.
        </p>
        <p className={text}>
          Then, click on Deploy keys and Add deploy key.
        </p>
        <div className={imageWrapper}>
          <Image
            alt="Github deploy key settings"
            loader={imageLoader}
            src={addDeployKey1}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>

        <p className={text}>
          Once you&apos;ve done that, you&apos;ll be able to give your new
          public key a title and add the key as depicted below. Make sure to check the box 
          that says Allow write access. This will allow Gitlab to write to your Github repo.
          Click Add key to add the key and head back over to Gitlab.
        </p>

        <div className={imageWrapper}>
          <Image
            alt="Github add deploy key"
            loader={imageLoader}
            src={addDeployKey2}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>

        <p className={text}>
          Finally, you&apos;ve added the key, all you need to do now is click the replay button
          shown below. This will start your mirror process.
        </p>

        <div className={imageWrapper}>
          <Image
            alt="Start mirroring"
            loader={imageLoader}
            src={clickReplay}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>

        <p className={text}>
          It may take a few minutes to make the initial push but you will see a blue banner 
          telling you that the remote repository is being updated. 
        </p>
        <h2>You did it!</h2>
        <p className={text}>
          When it finally does succeed you will see, back on the Github side, that your
          key has been used. And you should see your code now on Github.
          And that&apos;s it!
        </p>
        <h2>Errors?</h2>
        <p className={text}>
          If you have errors they certaintly have something to do with the SSH remote URL 
          or how you have configured the authentication.  
        </p>

        <p className={text}>
          Thanks for reading!
        </p>

        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'DevOps',
              'MLOps',
              'Documentation',
              'Gitlab',
              'Github',
              'SSH Keys',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
