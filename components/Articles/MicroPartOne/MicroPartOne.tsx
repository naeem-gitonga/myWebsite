'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import nodeDocker from '../../pictures/docker-node.png';
import stillWorks from '../../pictures/still-works.png';
import terminalView from '../../pictures/terminal-view.png';
import Link from 'next/link';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

// * &rdquo; &ldquo; &apos;
export default function MicroPartOne(): JSX.Element {
  const { innerWrapper, pre, code, imageWrapper, altText, text, anchorColor } =
    styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  return (
    <div id="micro-services-pt-1" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Micro Services Part I: Node, Docker, and Docker Compose</h1>
        <ArticleDateTime imageUrl="mspt1" />
        <div className={imageWrapper}>
          <Image
            alt="Node.js and Docker logo"
            loader={imageLoader}
            src={nodeDocker}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>
        <p className={text}>
          This is Part I of a two part series of how to build and deploy
          Dockerized applications. In this article you will see a breakdown of
          the Dockerfile and how to use Docker Compose on a simple application.
          We will run the app locally and in Part II, we&apos;ll stand it up in
          the cloud using AWS EC2.
        </p>
        <h2>Before we get started:</h2>
        <p className={text}>
          It assumes that you have Docker installed on your machine, if you
          don&apos;t check{' '}
          <a target="_blank" href="https://www.docker.com/get-started/">
            here
          </a>
          . You can follow this tutorial with only Docker installed but for the
          first step you will need Node.js. If you don&apos;t have it get it{' '}
          <a target="_blank" href="https://nodejs.org/en/">
            here
          </a>
          . You also should know a little about{' '}
          <a target="_blank" href="https://www.atlassian.com/git">
            Git
          </a>{' '}
          and{' '}
          <a target="_blank" href="https://github.com/">
            Github
          </a>{' '}
          so that you can clone the{' '}
          <a
            href="https://github.com/JNaeemGitonga/docker-test"
            target="_blank"
          >
            repo
          </a>
          .
        </p>
        <p className={text}>
          I have created a repo of this app on Github. Clone it from{' '}
          <a
            href="https://github.com/JNaeemGitonga/docker-test"
            target="_blank"
          >
            here
          </a>{' '}
          and follow along!
        </p>

        <p className={text}>
          Now that we got that stuff out of the way, let&apos;s get started!
        </p>
        <h2>Start with Node</h2>
        <h3>Let&apos;s make a regular Node.js Express app</h3>
        <p className={text}>My folder structure looks like this:</p>
        <pre className={pre}>
          <code className={code}>
            {`/app\n  docker.compose.yml\n  Dockerfile\n  index.html\n  package.json\n  server.js\n  README.md`}
          </code>
        </pre>
        <h2>The Challenges of Nanoservices</h2>
        <p className={text}>
          If you have cloned the repo, you can simply run the command{' '}
          <code className={code}>npm i && npm start</code> from the root
          directory and then in your browser visit
          <code className={code}>http://localhost:8080 </code>and see the app
          run using Node.
        </p>

        <p className={text}>You should see this in your browser:</p>
        <div className={imageWrapper}>
          <Image
            alt="Browser image of app running locally"
            loader={imageLoader}
            src={stillWorks}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>
        <p className={text}>
          This is a super simple node app — I can&apos;t stress that enough. Not
          much going on here, just a simple express server that serves up an
          HTML file. There is also one <code className={code}>api</code> type
          route <code className={code}>/doc</code>.
        </p>
        <p className={text}>
          Now that we know that the app works, let&apos;s get to the fun stuff
          with Docker.
        </p>
        <h2>Start container with Docker</h2>
        <p className={text}>
          Stop the app using{' '}
          <code className={code}>cmd + c or control + c</code>.
        </p>
        <p className={text}>
          Now we can start the app in a container using Docker by running in our
          terminal, the command{' '}
          <code className={code}>docker run node-test</code>. We will run it
          from the root directory as well. In your terminal you should see
          something like this:
        </p>
        <div className={imageWrapper}>
          <Image
            alt="View of CLI, terminal"
            loader={imageLoader}
            src={terminalView}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>
        {/* pon tres dots aqui */}
        <p className={text}>
          Return to the browser and you should see the same HTML via
          <code className={code}>localhost:8080</code> as you did before.
          Excellent!
        </p>
        <p className={text}>Let&apos;s talk about what is happening.</p>
        <p className={text}>
          First, let&apos;s look at our <code className={code}>Dockerfile</code>
          . This is the file that Docker will use to build our image
          automatically.
        </p>
        <p className={text}>
          Our Dockerfile is really simple but let&apos;s start from the top, as
          does Docker.
        </p>

        <pre className={pre}>
          <code className={code}>
            {`FROM node:11.3.0\nRUN mkdir -p /app\nWORKDIR /app\nCOPY . /app\nRUN npm i\nENTRYPOINT [ "npm" ]\nCMD ["start"]`}
          </code>
        </pre>
        <p className={text}>Let&apos;s look at it line by line:</p>

        <pre className={pre}>
          <code className={code}>{`FROM node:11.3.0`}</code>
        </pre>

        <p className={text}>
          The first line is our base image that we will build upon.{' '}
          <code className={code}>FROM</code> will get that image from the Docker
          registry. It could be any image but we&apos;ll use the official image
          from Node. It has everything that we will need to build on for this
          service.
        </p>

        <pre className={pre}>
          <code className={code}>{`RUN mkdir -p /app`}</code>
        </pre>

        <p className={text}>
          The <code className={code}>RUN</code> command will allow us to run
          Linux commands on this image. In this step, we are telling it to make
          a new folder and if that folder already exist we will
          override/overwrite it and create the folder anyway using the{' '}
          <code className={code}>-p</code> flag. Click{' '}
          <a
            href="https://www.tecmint.com/linux-commands-cheat-sheet/"
            target="_blank"
          >
            here
          </a>{' '}
          for a Linux command cheat sheet — very helpful.
        </p>
        <pre className={pre}>
          <code className={code}>{`WORKDIR /app`}</code>
        </pre>

        <p className={text}>
          We will assign a working directory of{' '}
          <code className={code}>/app</code> using{' '}
          <code className={code}>WORKDIR</code>. Any command that we run after
          this will be ran in the <code className={code}>/app</code> directory.
        </p>
        <pre className={pre}>
          <code className={code}>{`COPY . /app`}</code>
        </pre>
        <p className={text}>
          Next, we <code className={code}>COPY</code> everything
          (file/directories) from the place <code className={code}>.</code>{' '}
          (root) that we first ran the{' '}
          <code className={code}>docker run node-test</code> command. We use
          this command to copy everything to the{' '}
          <code className={code}>/app</code> directory of our image.
        </p>
        <pre className={pre}>
          <code className={code}>{`RUN npm i`}</code>
        </pre>
        <p className={text}>
          <code className={code}>RUN</code> executes the command{' '}
          <code className={code}>npm i</code> to install the necessary
          dependencies.
        </p>

        <pre className={pre}>
          <code className={code}>{`ENTRYPOINT [ "npm" ]`}</code>
        </pre>

        <p className={text}>
          Create an <code className={code}>ENTRYPOINT</code> that will{' '}
          <a href="https://docs.docker.com/reference/dockerfile/#entrypoint">
            &ldquo;allow you to configure a container that will run as an
            executable&rdquo;
          </a>
          . For example, we could run{' '}
          <code className={code}>docker run node-test</code> update and update
          the version of NPM in our container.
        </p>

        <pre className={pre}>
          <code className={code}>{`CMD ["start"]`}</code>
        </pre>
        <p className={text}>
          Lastly, we set <code className={code}>CMD</code> which is what will
          follow the <code className={code}>ENTRYPOINT</code>. So now if we run{' '}
          <code className={code}>docker run node-test</code> the command that
          will be ran inside the container is{' '}
          <code className={code}>npm start</code>.
        </p>
        <p className={text}>
          Magic 🎉 our app is being served on port{' '}
          <code className={code}>8080</code>!
        </p>
        <h2>Start container with Docker Compose</h2>
        <p className={text}>
          As an added, I have created a{' '}
          <code className={code}>docker-compose.yml</code> file. Docker-compose
          is necessary when you have a multi-container app but can work fine
          with single container apps as well. Let&apos;s take a look at a very
          simple <code className={code}>docker-compose.yml</code>.
        </p>
        <pre className={pre}>
          <code className={code}>
            {`version: '3'\nservices:\n  node-test:\n    build:\n      context: .\n    image: node-test\n    container_name: node-test\n    ports:\n      - "8080:8080"`}
          </code>
        </pre>
        <p className={text}>
          The first line of this YAML file is specifying the{' '}
          <code className={code}>version</code> of the file format. At the time
          of this post the current version 3.7 but we only need to specify 3 for
          this post. See more about the versions{' '}
          <a
            target="_blank"
            href="https://docs.docker.com/compose/compose-file/"
          >
            here
          </a>
          .
        </p>
        <p className={text}>
          Next we begin to define our various{' '}
          <code className={code}>services</code>. Our first and only service
          will be <code className={code}>node-test</code>.
        </p>
        <p className={text}>
          Next, we setup our <code className={code}>build</code>. We will give
          it a <code className={code}>context</code> which we have set to be the
          root, indicated by the dot. Context is about telling Docker where to
          find the Dockerfile for this service.
        </p>
        <p className={text}>
          By specifying an <code className={code}>image</code>, we tell Docker
          Compose to name this image <code className={code}>node-test</code>.
        </p>
        <p className={text}>
          The <code className={code}>container_name</code> is to give our
          container a name of our choosing. If we don&apos;t specify it here one
          will be generated for us.
        </p>
        <p className={text}>
          Lastly, we will indicate our port bindings. Here we can make as many
          bindings as we want but for the purpose of this we&apos;ll only use{' '}
          <code className={code}>&ldquo;8080:8080&rdquo;</code>. This is the
          short form of assigning port bindings the long form can be seen{' '}
          <a
            target="_blank"
            href="https://docs.docker.com/compose/compose-file/#ports"
          >
            here
          </a>
          . The first <code className={code}>8080</code> is for the host machine
          (your machine). That represents the port you can visit to see your app
          in the browser. The second port is the port that the app runs on
          inside of the container. Play around with it by changing the numbers
          to get a better understanding of how it works. Just make sure to keep
          you port numbers above <code className={code}>60</code> as suggested
          by the docs.
        </p>
        <p className={text}>
          And that&apos;s about all there is to it! Granted, this is a simple
          application and there are many other options/steps that are available
          to us when using Docker but this is a great starting point.
        </p>
        <h2>Next</h2>
        <p className={text}>
          In my next post, that will be available on{' '}
          <Link href="/articles/microservices-part-2">March 17, 2019</Link>, I
          will be demonstrating how to deploy this app on AWS using EC2.
        </p>
        <p className={text}>
          Please clap, comment, and follow! And contact me for help if you need
          it concerning Docker or any of the technologies in this post or my
          others. I will be happy to consult.
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
