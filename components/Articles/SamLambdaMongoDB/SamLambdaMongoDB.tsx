'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import samGoLambda from '../../pictures/SAM-Golang-MongoDB.png';
import lambdaComment from '../../pictures/go-lambda-comment.png';

import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function SamLambdaMongoDB(): JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    code,
    figure,
    firstInner,
    secondInner,
    firstGist,
    fifthGist,
    gistSubtext,
    sixthGist,
    seventhGist,
    eighthGist,
    ninthGist,
    tenthGist,
    eleventhGist,
    thirteenthGist,
    twelthGist,
    fourteenthGist,
    fifteenthGist,
    sixteenthGist,
    subtext,
    pre,
  } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;

  // * &rdquo; &ldquo; &apos;
  return (
    <div id="sam-lambda-mongodb" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Deploy GoLambda With MongoDB and AWS SAM (Part 3)</h1>
        <p className={subtext}>Micro-service trials and tribulations</p>
        <ArticleDateTime imageUrl={'samgolambda'} />
        <div className={imageWrapper}>
          <Image
            alt="AWS Sam, Golang gopher, and MongoDB logo"
            loader={imageLoader}
            src={samGoLambda}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>SAM-MongoDB-Go[pher]</p>
        </div>

        <p className={text}>
          Do you like <em>not</em> having a reference to build something? As
          well known as these three technologies are, I was hard-pressed to find
          another article demonstrating a model of them working in tandem. In
          fact, I didn&apos;t find one. So, I gave birth to this one!
        </p>
        <p className={text}>
          I wanted to start the New Year with a <em>new</em> language. I also
          wanted to document some of the things that I learned along the way.
          This article is more about explaining what I did to get Go running
          locally and my experience developing locally with SAM, Go, and the
          Mongo driver. I will take you on my journey from setup and then walk
          you through the nine or so methods that make this API. <em>Ahora</em>,
          let&apos;s begin!
        </p>
        <p className={text}>
          This article assumes that you have <em>some</em> experience with
          Lambda functions and SAM, and MongoDB but none using them with Go. If
          you don&apos;t, you must first have Golang, SAM, the AWS CLI, and
          Docker. This was a weekend project for me and my introduction to Go.
          Please enjoy!
        </p>
        <p className={text}>
          After you have everything installed you&apos;re ready to work.
        </p>
        <p className={text}>
          First, you need to <code className={code}>cd</code> to your Go
          directory. I use a Mac, so for me the directory was originally located
          in <code className={code}>$HOME/go</code>. It&apos;s important where
          you put this since all of your Goroutines will need to live here in
          the
          <code className={code}>src/</code> directory — more on that in a
          moment&sup1;. So, since I like to personalize things, I decided to
          move it to my <code className={code}>projects/</code> directory.
        </p>
        <p className={text}>
          &sup1;This has changed since the addition of{' '}
          <a target="_blank" href="https://go.dev/blog/migrating-to-go-modules">
            Modules
          </a>
          .
        </p>
        <p className={text}>
          In order to do that and still have things work, I needed to update my
          <code className={code}>$PATH</code>. Since I use Zsh, I needed to
          update my <code className={code}>.zshrc</code> with the following
          lines:
        </p>

        <pre className={pre}>
          <code className={code}>
            {`export GOPATH=$HOME/porjects/go\nexport PATH="$PATH:$HOME/projects/go/bin"`}
          </code>
        </pre>
        <p className={text}>
          Run the following to make the <code className={code}>dir</code> for
          your Goroutine:
        </p>
        <pre className={pre}>
          <code
            className={code}
          >{`$ mkdir $HOME/projects/go/src/test-go`}</code>
        </pre>
        <p className={text}>
          All of my Go programs will need to live here{' '}
          <code className={code}>$HOME/projects/go/src</code>. This is known as
          the Go workspace. You can read more about Go Workspaces{' '}
          <a target="_blank" href="https://go.dev/doc/code#Workspaces">
            here
          </a>
          .
        </p>
        <p className={text}>
          Then I run the following to create a boiler-plate Hello World Golang
          Lambda using the SAM CLI:
        </p>
        <pre className={pre}>
          <code
            className={code}
          >{`$ cd $HOME/projects/go/src/test-go\n$ sam init — runtime go1.x — name test-go`}</code>
        </pre>
        <p className={text}>
          When you run the above command in your terminal, you get this.
        </p>
        <pre className={pre}>
          <code
            className={code}
          >{`.\n└── test-go\n    ├── Makefile\n    ├── README.md\n    ├── hello-world\n    │   ├── test-go\n    │   ├── hello-world\n    │   ├── main.go\n    │   └── main_test.go\n    └── template.yaml`}</code>
        </pre>
        <p className={text}>Next, we want to run:</p>
        <pre className={pre}>
          <code
            className={code}
          >{`$ make deps\n$ make build\n$ sam local start-api`}</code>
        </pre>
        <p className={text}>
          From a new terminal window, you can run{' '}
          <code className={code}>curl localhost:3000/hello</code> or simply open
          it in your browser.
        </p>
        <p className={text}>
          If all of your <code className={code}>aws-cli</code> credentials are
          in place, the first time you run{' '}
          <code className={code}>$ sam local start-api</code> youll see
          something like this in your console:
        </p>
        <pre className={pre}>
          <code
            className={code}
          >{`Mounting HelloWorldFunction at http://127.0.0.1:3000/hello [GET]\nYou can now browse to the above endpoints to invoke your functions. You do not need to restart/reload SAM CLI while working on your functions, changes will be reflected instantly/automatically. You only need to restart SAM CLI if you update your AWS SAM template\n2019-12-15 13:23:18  * Running on http://127.0.0.1:3000/ (Press CTRL+C to quit)\nInvoking hello-world (go1.x)\n2019-12-15 13:23:35 Found credentials in shared credentials file: ~/.aws/credentials\nFetching lambci/lambda:go1.x Docker container image....................`}</code>
        </pre>
        <p className={text}>
          Afterward, you&apos;ll be able to invoke your lamba either using{' '}
          <code className={code}>curl http://localhost:3000/hello</code> or via
          the browser by visiting the same URL as I mentioned above.
        </p>
        <p className={text}>
          Great! You&apos;re up and running and you&apos;re developing, but
          now&apos;s a good time to talk about a couple of gotchas.
        </p>

        <ul>
          <li className={text}>
            <p>
              Now all of that was assuming that you didn&apos;t already initiate{' '}
              <code className={code}>test-go/</code> as a Git repository. If you
              did and try to run the <code className={code}>$ make deps</code>{' '}
              command you may run into an error similar to the following:
            </p>
          </li>
        </ul>
        <pre className={pre}>
          <code
            className={code}
          >{`$ make deps\ngo get -u ./...\n# cd /Users/jahagitonga/projects/go/src/test-go; git submodule update --init --recursive\nfatal: No url found for submodule path 'test-go' in .gitmodules\npackage aahs-go-back-end/aahs-func/test-go: exit status 128`}</code>
        </pre>
        <ul>
          <li className={text}>
            <p className={text}>
              SAM will not hot-reload Golang lambdas natively, which is
              terrible. In light of that, we need a Node package named{' '}
              <a
                target="_blank"
                href="https://www.npmjs.com/package/supervisor"
              >
                supervisor
              </a>{' '}
              to help us watch for changes. Yup, we need Node, so if you
              don&apos;t have it, go{' '}
              <a target="_blank" href="https://nodejs.org/en/">
                here
              </a>{' '}
              to find out more about it and installing it on your machine.
            </p>
          </li>
        </ul>
        <p className={text}>
          Now let&apos;s update our Makefile. My Makefile looks like this:
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${fifthGist}`}>
              <iframe
                className={fifthGist}
                src="https://gist.github.com/JNaeemGitonga/fc4f36f056ea7748e4497c87c5c0b9cb.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>
            Go Makefile that supports hot-reloading on code changes
          </p>
        </figure>
        <p className={text}>
          The idea for this came from Ucchishta Sivagur. His repo can be viewed{' '}
          <a target="_blank" href="https://github.com/uccmen/serverless-go">
            here
          </a>
          . Thanks uccmen! If you update your Makefile run{' '}
          <code className={code}>$ make && make watch</code>, you&apos;ll be
          ready to develop with hot-reloading enabled for your Golang Lambda.
          Sweet!
        </p>
        <ul>
          <li className={text}>
            <p className={text}>
              When building a lambda, you will see this error locally if you
              forget to declare the method in your{' '}
              <code className={code}>template.yaml</code> file:
            </p>
          </li>
        </ul>

        <pre className={pre}>
          <code
            className={code}
          >{`{\n   "message": "Missing Authentication Token"\n}`}</code>
        </pre>
        <p className={text}>
          So make sure you update your{' '}
          <code className={code}>template.yaml</code> file accordingly and
          don&apos;t be alarmed although the message is highly misleading. Hope
          the AWS crew can get a better error message out there soon!
        </p>
        <h2>Getting MongoDb Up and Running!</h2>
        <p className={text}>
          Since this is a small project, I&apos;m not concerned with replication
          or sharding; I just needed a MongoDB instance in the cloud, so I went
          with mLab, since it is free and they&apos;re a company owned by
          MongoDb. If I need to upgrade and harness the power of replication and
          sharding in the future, I can migrate to Atlas with no problems.
        </p>
        <p className={text}>
          We&apos;ll need a few dependencies to make this work:
        </p>

        <pre className={pre}>
          <code
            className={code}
          >{`"github.com/joho/godotenv"\n\n"go.mongodb.org/mongo-driver/bson/primitive"\n\n"go.mongodb.org/mongo-driver/mongo"\n\n"go.mongodb.org/mongo-driver/mongo/options"\n\n"go.mongodb.org/mongo-driver/mongo/readpref"\n\nbson "go.mongodb.org/mongo-driver/bson"`}</code>
        </pre>

        <h2>Build the Lambda</h2>
        <p className={text}>
          We can add the above to our import statement of our{' '}
          <code className={code}>main.go</code> file. A complete list of all the
          packages that I used can be found{' '}
          <a
            target="_blank"
            href="https://github.com/JNaeemGitonga/first-golang-app/blob/master/aahs-func/aahs-backend/main.go"
          >
            here
          </a>{' '}
          in the repo. Let&apos;s start looking at{' '}
          <code className={code}>func main()</code>:
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${sixthGist}`}>
              <iframe
                className={firstGist}
                src="https://gist.github.com/JNaeemGitonga/1eb5378d12374f12e2a38b346760f49e.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>func main() {'{...}'}</p>
        </figure>

        <p className={text}>
          I like to keep things simple, so the first thing{' '}
          <code className={code}>func main()</code> is going to do is get our
          environment variables, check to see if there is already a Mongo client
          and that <code className={code}>mongoURI</code> isn&apos;t assigned a
          value of an empty string. Once we do that we connect to our MongoDb
          instance, or start the lambda.
        </p>
        <p className={text}>
          One of the first things that I noticed coming from JavaScript is that
          Go needs a little help when dealing with environment variables. You
          can make them and access them at a lower level using your system and
          the <code className={code}>os</code> package that Go gives you. But if
          you&apos;re accustomed to using <code className={code}>.env</code>{' '}
          files for storing these variables rather than on your system
          you&apos;ll need to import{' '}
          <code className={code}>
            <a target="_blank" href="https://github.com/joho/godotenv">
              &ldquo;github.com/joho/godotenv&rdquo;
            </a>
          </code>
          . Even in Node you need the{' '}
          <code className={code}>
            <a target="_blank" href="https://www.npmjs.com/package/dotenv">
              dotenv
            </a>
          </code>{' '}
          package so that the Node process will gather these env vars from your
          system and your <code className={code}>.env</code> file(s). And to
          access them all you need is
          <code className={code}>proces.env.YOUR_VAR_NAME</code>. But we&apos;re
          not dealing with the simplicity of Node! Check out the{' '}
          <code className={code}>getMongoURIEnvVar</code> method:
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${seventhGist}`}>
              <iframe
                className={seventhGist}
                src="https://gist.github.com/JNaeemGitonga/b4e76befb1e369e97f97d5227dbe8e0f.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>func getMongoURIEnvVar() {'{...}'}</p>
        </figure>

        <p className={text}>
          This function just takes a name of type{' '}
          <code className={code}>string</code>. First, we have to load the{' '}
          <code className={code}>.env</code> file then we can use the{' '}
          <code className={code}>os</code> package to retrieve the value
          assigned to that name. Notice how the{' '}
          <code className={code}>Load</code> method only returns an error —
          interesting assumption. If there wasn&apos;t an error it must have
          worked, right?
        </p>
        <p className={text}>
          Well now that we have all of that, let&apos;s take a look at how we
          connect to our mongo instance:
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${eighthGist}`}>
              <iframe
                className={eighthGist}
                src="https://gist.github.com/JNaeemGitonga/0b071d25c99c016e0cd3a805e527539c.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          Here you can see that I&apos;m first checking to see if the client is
          not <code className={code}>nil</code>. If it isn&apos;t the program
          will continue and use the cached instance that is available for
          connection pooling (best practice). If it&apos;s{' '}
          <code className={code}>nil</code>, we create a{' '}
          <code className={code}>connectionError</code> variable since the
          short-hand declaration/assignment <code className={code}>:=</code>{' '}
          will not interfere with us using <code className={code}>client</code>{' '}
          globally on <code className={code}>line 7</code>. We also create a{' '}
          <code className={code}>context</code> in which our function will run
          and connect to the db (we have some basic logging for error handling
          in there too). In high-level terms this context says that if the
          program hasn&apos;t connected in 15 seconds to stop and move on. Go
          has great{' '}
          <a target="_blank" href="https://go.dev/blog/context">
            documentation
          </a>{' '}
          on how Google uses context.
        </p>
        <p className={text}>
          If we pay attention to and pattern our usage of context after their
          usage, we can develop super-efficient APIs as well. I do a decent job
          here but would love for the more seasoned <em>gophers</em> to give me
          some pointers on how things can be optimized here — pun intended! You
          want to pass context around to ensure efficiency in your app and that
          there&apos;s proper release of those resources once things have been
          executed within their context. Context gets deep, so please check out
          the two resources I listed in this paragraph for the <em>lo&apos;</em>{' '}
          on all the things of context.
        </p>
        <p className={text}>
          After we&apos;ve connected, or not, the next step in our Goroutine is
          to start our handler:
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${twelthGist}`}>
              <iframe
                className={twelthGist}
                src="https://gist.github.com/JNaeemGitonga/b2c4c8283ddceb48e1e51e5a8cfd7efd.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          I try to keep it as simple as possible (KISS), right? Notice that I
          create another context. This is the context in which our CRUD
          operations run. I will pass this down to my functions and once they
          have returned this Goroutine will run the{' '}
          <code className={code}>defer</code> call to{' '}
          <code className={code}>cancel()</code> which will cancel the context,
          thus freeing up those resources. Next, I&apos;m going to check that
          the client is <code className={code}>nil</code>. If it is, which it
          shouldn&apos;t be, the program will send an error to the client
          alerting the end-user that a connection couldn&apos;t be established —
          in so many words.
        </p>
        <p className={text}>
          I use a simple <code className={code}>switch</code> statement to
          decide what happens next. I chose to do this because the project is
          small and I am only using one
          <em>catchall</em> route to handle my request. If the project were
          bigger, I probably wouldn&apos;t, but seeing how this is an example of
          using Go, MongoDb and SAM, just know that everything here isn&apos;t
          completely up to the RESTful spec — but we&apos;re really close!
        </p>
        <p className={text}>
          With that being said, let&apos;s look at{' '}
          <code className={code}>func getStories()</code>.
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${ninthGist}`}>
              <iframe
                className={ninthGist}
                src="https://gist.github.com/JNaeemGitonga/d56c659b46287a148e2c413f2f272b88.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          First things first, I ping the client. I do this to make sure things
          are on the <em>up and up</em>. If they aren&apos;t — the program
          throws an error. But let&apos;s say that things are, then we execute a
          find on our collection, assess it for errors and use the{' '}
          <code className={code}>cursor</code>&apos;s{' '}
          <code className={code}>.Next()</code>
          method to loop over the cursor and decode its elements into something
          that our Goroutine can use later on. We then append them to a stories
          list and return our call to{' '}
          <code className={code}>func marshalJSONAndSend()</code> passing it our
          list. The last thing done after that{' '}
          <code className={code}>return</code> executes is the deferred call to{' '}
          <code className={code}>cursor.Close(ctx)</code>.
        </p>
        <p className={text}>
          But what about <code className={code}>func marshalJSONAndSend()</code>
          . Well, let&apos;s take a peek:
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${tenthGist}`}>
              <iframe
                className={tenthGist}
                src="https://gist.github.com/JNaeemGitonga/8ce8aeb7c6b661649eb14bc1b32a48ff.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          This little guy is going to take our list of stories, make it into a
          data type — <code className={code}>[]byte</code> — that can then be
          converted to a string, <code className={code}>line 7</code>, and sent
          to the client via our API Gateway Response.
        </p>
        <p className={text}>That&apos;s that!</p>
        <p className={text}>
          I&apos;ve been using this{' '}
          <code className={code}>func handleError()</code> but haven&apos;t
          shown it. There&apos;s not much to it. Take a look for yourself.
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${eleventhGist}`}>
              <iframe
                className={eleventhGist}
                src="https://gist.github.com/JNaeemGitonga/977b342b7c95d21526a0183ade2a9060.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>
            func handleError(err error) (events.APIGatewayProxyResponse, error){' '}
            {'{...}'}
          </p>
        </figure>

        <p className={text}>
          We&apos;re almost done. We have the ability to read from the db but
          let&apos;s create a document. We do that with our{' '}
          <code className={code}>func postStory()</code>.
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${thirteenthGist}`}>
              <iframe
                className={thirteenthGist}
                src="https://gist.github.com/JNaeemGitonga/7e871a3584cbbbf3d83fec932f538ef4.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          I follow the same pattern that&apos;s used in the other methods, so no
          change there but I did need to do some type conversion so that it
          could properly be added to my db. Once I&apos;ve done that, I used a
          variable, <code className={code}>newDbResult</code>, to create a map
          of the results according to their type. I did this to dry up some code
          that was used to handle the result and send the appropriate response.{' '}
        </p>
        <p className={text}>
          Before we jump to{' '}
          <code className={code}>func handleResultSendResponse()</code>{' '}
          let&apos;s first take a look at the Story{' '}
          <code className={code}>struct</code>.{' '}
          <a target="_blank" href="https://go.dev/tour/moretypes/2">
            Structs
          </a>{' '}
          remind me of interfaces in TypeScript (remember I come from JavaScript
          land). They are used to enumerate the fields of a piece of data. They
          contain names as fields and the value type associated with said
          fields. They also contain metadata that is of critical importance to
          the proper functioning of our API. Check out the Story{' '}
          <code className={code}>struct</code>:
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${fourteenthGist}`}>
              <iframe
                className={fourteenthGist}
                src="https://gist.github.com/JNaeemGitonga/622fe484fe00cb101f52547528f07bef.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          Without that metadata to the right of our field types, our struct
          would not map to our JSON/BSON schema. We also needed to capitalize
          the field names. See what this guy had to say about capitalizing field
          names of structs.
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${fourteenthGist}`}>
              <iframe
                className={fourteenthGist}
                src="https://gist.github.com/JNaeemGitonga/622fe484fe00cb101f52547528f07bef.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <div className={imageWrapper}>
          <Image
            alt="Github comment"
            loader={imageLoader}
            src={lambdaComment}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
          <p className={altText}>
            <a
              target="_blank"
              href="https://github.com/asaskevich/govalidator/issues/187"
            >
              https://github.com/asaskevich/govalidator/issues/187
            </a>
          </p>
        </div>
        <p className={text}>
          Now what about{' '}
          <code className={code}>func handleResultSendResponse()</code>?
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${fifteenthGist}`}>
              <iframe
                className={fifteenthGist}
                src="https://gist.github.com/JNaeemGitonga/9c3f7046fc02220aad9e548cffaab423.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          I commented the code so, there you have it. The important thing here
          is <em>reflection</em>. Golang uses{' '}
          <code className={code}>reflect</code> to allow us to use Go in a more
          dynamic fashion, i.e., examine types at runtime versus compile time.
          Reflection deserves its own post, so much that I found a good one{' '}
          <a
            target="_blank"
            href="https://medium.com/capital-one-tech/learning-to-use-go-reflection-822a0aed74b7"
          >
            here
          </a>
          , in addition to the Go docs{' '}
          <a target="_blank" href="https://pkg.go.dev/reflect">
            here
          </a>{' '}
          and their blog{' '}
          <a target="_blank" href="https://go.dev/blog/laws-of-reflection">
            here
          </a>
          . Once we&apos;ve properly reflected, we&apos;re able to{' '}
          <code className={code}>fmt.Sprintf</code> a{' '}
          <code className={code}>string</code>
          so that we could send it back to our client,{' '}
          <code className={code}>line 18</code> of{' '}
          <code className={code}>func handleResultSendResponse()</code>. Knowing
          reflection allowed me to DRY up some code for reuse in other places.
          You gotta love that!
        </p>
        <p className={text}>
          The last thing we have is the update function. Let&apos;s dive in!
        </p>

        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${sixteenthGist}`}>
              <iframe
                className={sixteenthGist}
                src="https://gist.github.com/JNaeemGitonga/7e871a3584cbbbf3d83fec932f538ef4.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          First, let me say that I had to get used to all of the type conversion
          that is required to make this API run. If someone has a better way or
          optimizations please feel free to drop me a line or two in the
          comments.
        </p>

        <p className={text}>
          First we declare a variable. Take the update that we have and convert
          it to <code className={code}>[]bytes</code>. On line four I love the
          way Go allows us to do some shorthand assignment and the use of those
          variables in our <code className={code}>if/else</code>
          statements. Those are scoped to the <code className={code}>
            if
          </code>{' '}
          block of course, and its respective <code className={code}>else</code>{' '}
          should it have one. In fact, I liked it so much that I was willing to
          go against Go&apos;s linter to use this syntax with an{' '}
          <code className={code}>else</code>
          block that did nothing but <code className={code}>return</code> a
          function call. I ended up refactoring the code.
        </p>
        <p className={text}>
          When we look at our <code className={code}>filter</code> and{' '}
          <code className={code}>upDate</code> vars we see that the Go driver
          uses BSON. This was new to me and the double curlies made me think of
          Angular.{' '}
          <a
            target="_blank"
            href="https://www.mongodb.com/blog/post/mongodb-go-driver-tutorial"
          >
            Here&apos;s
          </a>{' '}
          a great tutorial on using the Go driver.
        </p>
        <p className={text}>
          It was now time to deploy. To deploy follow the instructions in the
          <code className={code}>README.md</code> that SAM provides. It&apos;s
          one of the simplest ways to, declaratively speaking, to get you in the
          cloud next to CDK.
        </p>

        <p className={text}>
          Although I must say, when I did go live, I still had a bug to work
          out. Originally I had placed a few variables in the global scope. One
          of which was being used in{' '}
          <code className={code}>func getStories()</code>; it was the{' '}
          <code className={code}>stories []Story</code> list. Locally this was
          working fine but in the cloud where things were optimized, each time I
          made a get request the lambda would return one more of the same story
          — I only had one in the Db.
        </p>
        <p className={text}>
          It took me about 15 minutes to realize what was the potential problem.
          The best I could come up with was that the context of the lambda was
          outliving the actual request and each time it received a new request
          it appended a new document to the collection. The best course of
          action was to use the <code className={code}>stories</code> collection
          in the scope of <code className={code}>func getStories()</code>. Once
          I did that things were back to normal.
        </p>
        <p className={text}>
          That&apos;s all I have. I hope this benefits someone and shaves off a
          couple of hours of research. Let me know how I can improve, what you
          would have done differently, and what you liked!
        </p>
        <p className={text}>Thanks for reading!</p>

        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'Golang',
              'AWS Lambda',
              'MongoDB',
              'Back-End Development',
              'Software Engineering',
              'Programming',
              'AWS',
              'Cloud Engineering',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
