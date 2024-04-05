'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import newSexy from '../../pictures/js-new.png';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function JSNS(): JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    altText,
    text,
    code,
    pre,
    subtext,
    emoji,
  } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  return (
    <div id="jsns" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <div className={imageWrapper}>
          <Image
            alt="Teaching student"
            loader={imageLoader}
            src={newSexy}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>Photo by NESA by Makers on Unsplash</p>
        </div>
        <h1>JavaScript&apos;s New Sexy</h1> {/** &rdquo; &ldquo; */}
        <p className={subtext}>TypeScript: The Developer&apos;s Tool</p>
        <ArticleDateTime imageUrl={'jsnew'} />
        <p className={text}>
          If you&apos;re new to TypeScript, beware, it&apos;s not without its
          critics. Just two years shy of being 10 years old, it&apos;s been
          around long enough for opinions to have been formed down both sides of
          the isle. Some champion it, yet others are still not convinced of the
          weight of its benefits. This article will give a quick overview of
          three areas in which I believe TypeScript helps engineers at all
          levels to do their jobs better. And it answers the question as to why
          the hell anyone would want to add static typing to a dynamically typed
          language.
        </p>
        <p className={text}>
          Those three areas are: to catch more errors through <em>contracts</em>
          , less context switching (front-end to back-end), and documentation.
        </p>
        <p className={text}>Let&apos;s begin…</p>
        <h2>Catch more errors...</h2>
        <p className={text}>
          While writing code in any language, we all should take care to follow
          the contracts in and of the code wether the language that we are
          writing in forces us to or not. Below is an example of a contract not
          being honored that will result in{' '}
          <code className={code}>undefined</code> being returned when we should
          have a <code className={code}>string</code>.
        </p>
        <pre className={pre}>
          <code className={code}>
            {`/**\n * @param {{house: string}} data\n * @returns string\n */\nfunction myFunction(data) {\n    return data.house;\n}\nconsole.log(myFunction({apple: 'apple'})); // undefined`}
          </code>
        </pre>
        <p className={text}>
          The former would log <code className={code}>undefined</code> since the{' '}
          <code className={code}>data</code> object doesn&apos;t contain the{' '}
          <code className={code}>house</code> attribute. Clearly this is
          problematic. The dev decided to use the function, for whatever reason,
          in a way that goes against the documentation. Sure, we are able to use
          JSDocs to define what a type our data should be and the property it
          should contain; however, that won&apos;t alert us when me make errors
          as the former.
        </p>{' '}
        <p className={text}>
          What if <code className={code}>myFunction</code> was tied to your UI
          and there should always be some text or other data returned by it?
          Sure, we should write test and code around{' '}
          <code className={code}>myFunction</code> to ensure that the data we
          expect is supposed to be there and in its absence, to fail gracefully.
          But what about the next person that comes along and wants to use this
          code? I&apos;ve seen people mess up simpler things, myself included.
          Well... that&apos;s when TypeScript steps in to help us to quickly
          spot our blunders. Let&apos;s see how.
        </p>
        <pre className={pre}>
          <code className={code}>
            {`interface Data {\n    house: string;\n}\nfunction myFunction(data: Data): string {\n    return data.house;\n}\nconsole.log(myFunction({apple: 'apple'}));\n/*\n * (property) apple: string \n * Argument of type '{ apple: string; }' is not assignable to\n * parameter of type 'Data'. Object literal may only\n * specify known properties, and 'apple' does not exist in type\n * 'Data'.ts(2345)\n*/`}
          </code>
        </pre>
        <p className={text}>
          In plain old JavaScript we aren&apos;t able to enforce contracts
          (standards of what data should be and how things should be used). But
          in TypeScript, we have what are called interfaces. These things allow
          us to define what and how an object should be. Using an interface and
          assigning it to the type of the <code className={code}>data</code>{' '}
          parameter in <code className={code}>myFunction</code>, guarantees that
          the user of <code className={code}>myFunction</code> will invoke it
          with an object of the <code className={code}>Data</code> type. And
          when the user doesn&apos;t, TypeScript will alert the user to their
          mistake. The multiline comment will be the error displayed.
        </p>
        <p className={text}>
          Let&apos;s be thankful — for three reasons! It has just saved us from
          committing and pushing code to a repo that is inherently broken.
          It&apos;s reminiscent of a spell check for code if you want to take it
          there. It ensures that we are honoring the way the code is intended to
          work or be used. And finally, we have a reusable interface that we can
          employ throughout our code. Thank you TypeScript!
        </p>
        <p className={text}>
          Let&apos;s consider yet another example using{' '}
          <code className={code}>myFunction</code> but this time we will add it
          to a <code className={code}>class</code>.
        </p>
        <pre className={pre}>
          <code className={code}>
            {`class Example {\n    house: string;\n    constructor() {\n       this.house = this.myFunction(4);\n    }\n   \n    function myFunction(data: Data): string {\n        return data.house;\n    }\n}\n/*\n * Argument of type '4' is not assignable to\n * parameter of type 'Data'.ts(2345)\n*/`}
          </code>
        </pre>
        <p className={text}>
          Depending on your editor, you will see a red squiggly under the{' '}
          <code className={code}>4</code> in the method call for{' '}
          <code className={code}>this.myFunction(4)</code>. Again, the multiline
          comment will be the error displayed.
        </p>
        <h2>Front-end, Back-end…the same?</h2>
        <p className={text}>
          By using the <code className={code}>tsconfig.json</code> we can tell
          TypeScript to compile our code to the version/syntax of JavaScript
          that we want. This is an amazing tool. Now if we want to context
          switch with greater ease, we can. For example, take the following:
        </p>
        <pre className={pre}>
          <code className={code}>
            {`import getProperty from '../typescript/testing';\ninterface Data {\n    house: string;\n}\nfunction myFunction(data: Data): string {\n    return data.house;\n}\nconsole.log(myFunction({house: 'blue'}));\nconsole.log(getProperty({house: 'green'}, 'house'));\nexport default myFunction;`}
          </code>
        </pre>
        <p className={text}>
          This code was written for a Node application. Sure, we could&apos;ve
          use Node&apos;s experimental modules flag and used a{' '}
          <code className={code}>.mjs</code> extension on our file, e.g.,{' '}
          <code className={code}>
            node --experimental-modules {'<filename>'}.mjs
          </code>
          . That&apos;s if we are running Node versions 8-12. Or we could use
          the
          <code className={code}>{`{ “type”: “module” }`}</code> in our
          <code className={code}>package.json</code> if we&apos;re using
          versions ≥ 13. But why do that and miss out on all of the other great
          features of TypeScript? I won&apos;t go into them here but there are
          many. All we need to do is to define how we want our code to be
          compiled in our <code className={code}>tsconfig.json</code> and let
          TypeScript take the wheel.
        </p>
        <p className={text}>
          Here&apos;s a sample <code className={code}>tsconfig.json</code>:
        </p>
        <pre className={pre}>
          <code
            className={code}
          >{`{\n    "compilerOptions": {\n        "moduleResolution": "node",\n        "module": "commonjs",\n        "target": "ES5",\n        "outDir": "lib",\n        "rootDir": "/"\n    }\n}`}</code>
        </pre>
        <p className={text}>
          As a result of running the <code className={code}>tsc</code> command
          in our terminal, we will get the following JS:
        </p>
        <pre className={pre}>
          <code className={code}>
            {`"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst testing_1 = require("../typescript/testing");\nfunction myFunction(data) {\n    return data.house;\n}\nconsole.log(myFunction({ house: 'blue' }));\nconsole.log(testing_1.default({ house: 'green' }, 'house'));\nexports.default = myFunction;`}
          </code>
        </pre>
        <p className={text}>
          <em>Auto-magic</em>
        </p>
        <p className={text}>
          Furthermore, by using TypeScript, we can write code with the latest
          language features and not have to concern ourselves with wether or not
          they will cause support issues&sup1;. Even better!
        </p>
        <h2>Documentation</h2>
        <p className={text}>
          Last but definitely not least is the aspect of documentation. To avoid
          the endless cluttering of JSDoc comments, we can simply use type
          declarations, interfaces and such, throughout our code. When used
          correctly, TypeScript will always give us better-documented code that
          should cut down on ramp-up time when onboarding new engineers. I
          can&apos;t count the times that I have wished there were well defined
          contracts in a code base while working on some projects. And the
          larger the project the more important that becomes.
        </p>
        <h2>Conclusion</h2>
        <p className={text}>
          So hey, there are many other good reasons to use TypeScript, but those
          listed above are enough to make me chose it as a necessary tool in any
          JavaScript project. And if that ain&apos;t enough to make you consider
          adopting it…Airbnb uses it.
        </p>
        <p className={text}>
          JavaScript is liberal and fun. It&apos;s even more fun when you can
          quickly ship your code. TypeScript helps us to ship faster. Bottom
          line is, the extra layer of complexity is more than welcomed to create
          a better project, and TypeScript is one way to achieve that.
        </p>
        <p className={text}>
          &sup1;This depends on your{' '}
          <code className={code}>
            <a
              target="_blank"
              href="https://microsoft.github.io/TypeScript-New-Handbook/reference/compiler-options/#target"
            >
              target
            </a>{' '}
          </code>{' '}
          and you still may need something like{' '}
          <a target="_blank" href="https://github.com/zloirock/core-js">
            core-js
          </a>{' '}
          depending on your browser and or runtime — nothing&apos;s perfect.
        </p>
        <p className={emoji}>🤷🏿‍♂️</p>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'JavaScript',
              'Software Development',
              'Computer Science',
              'TypeScript',
              'Software Engineering',
              'Programming',
              'Technology',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
