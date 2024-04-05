'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '@/components/SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import dontPanic from '../../pictures/dont-panic.png';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function DefaultParameters(): JSX.Element {
  const { innerWrapper, imageWrapper, altText, text, code, pre } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;

  return (
    <div id="dont-panic" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <h1>Are JavaScript&apos;s default parameters slowing me down?</h1>
        <ArticleDateTime imageUrl={'dontpanic'} />
        <div className={imageWrapper}>
          <Image
            alt="Dont panic"
            loader={imageLoader}
            src={dontPanic}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>Photo by Markus Spiske on Unsplash</p>
        </div>
        <p className={text}>
          For every software engineer, when writing code, there should be a
          balance of efficiency, style, and implementation of features. But what
          happens when the latter takes the precedent over efficiency? Well, the
          short answer is you have code that looks good but perhaps doesn&apos;t
          work all that well. Granted when I write code the first thing on my
          mind is to make it work. Once I&apos;ve crossed that bridge, I look to
          enhance performance. Let&apos;s take a look at one JavaScript feature
          and see an example of how it could make your code less performant.
        </p>
        <h2>Default Parameters</h2>
        <p className={text}>
          Default parameters were introduced in ECMAScript2015, what we
          affectionately call &ldquo;ES6&rdquo;. Now, JavaScript being the
          liberal (dynamic) language that it is, in that sense default
          parameters are a God send. There are new language features every year
          and if engineers are careless in their implementation, or
          inconsiderate of the features they use, they may inadvertently
          introduce unnecessary latency and/or bugs into their code.
        </p>
        <p className={text}>
          Here is an example of a default parameter in action.
        </p>
        <pre className={pre}>
          <code className={code}>
            {`function withDefault(s = 'you passed me nothing') {\n\tconsole.log(s);\n}\nwithDefault() // "you passed me nothing"`}
          </code>
        </pre>
        <p className={text}>
          In this simple function we take a value which is a{' '}
          <code className={code}>string</code> and log it. This example is over
          simplified but it does illustrate quite well how default parameters
          work. Now for that example, a default is fine if we don&apos;t want to
          perform any &ldquo;business&rdquo; logic. But what if we only have one
          parameter and we want to manipulate that parameter? What if when that
          parameter is absent, do we want to continue to execute the logic or
          should we stop early and return a value? Let&apos;s stop and do some
          benchmarking of the former with just a little more business logic than
          before.
        </p>
        <pre className={pre}>
          <code className={code}>
            {`function withDefault(s = '') {\n\treturn s.toString().replace(/a/gi, 'b''.toUpperCase();\n}\nconsole.time('withDefault');\nwithDefault();\nconsole.timeEnd('withDefault');`}
          </code>
        </pre>
        <p className={text}>
          The first time that code runs you may see something like the following
          in the console: <code className={code}>withDefault: 0.218ms</code>.
          Subsequent runs of the same code may be &ldquo;slightly&rdquo; faster
          (or not!). <code className={code}>0.577ms</code> was my worst time and{' '}
          <code className={code}>0.181ms</code> was my best time when running
          this code in Node v12.6.0.
        </p>

        <p className={text}>
          I take exception to this, to this style of coding. I ask myself, what
          if when this function is called s is equal to undefined? Should we
          even attempt to run the rest of the code? I answer to myself, no. If s
          is equal to undefined we should return a value immediately (because
          we&apos;re doing so eventually). When s is undefined, in this case, we
          should just stop all action by returning an empty string
          (&apos;&apos;).I mean that&apos;s where we&apos;re headed anyway.
          Let&apos;s take a look at another example where we terminate early.
        </p>
        <pre className={pre}>
          <code className={code}>
            {`function withoutDefault(s) {\n    if (s === undefined) {\n        return '';\n    }\n    return s.toString().replace(/a/gi, 'b').toUpperCase();\n}\nconsole.time('withoutDefault');\nwithoutDefault();\nconsole.timeEnd('withoutDefault');`}
          </code>
        </pre>
        <p className={text}>
          When I run this code it consistently runs between{' '}
          <code className={code}>0.023ms</code> and{' '}
          <code className={code}>0.029ms</code>. Comparing the worst times of
          both functions, <code className={code}>0.522/0.029</code>,
          <code className={code}>withoutDefault</code> runs{' '}
          <code className={code}>18Xs</code> faster. Wow! Comparing our best
          times,
          <code className={code}>0.181/0.023</code>, the more verbose code ran{' '}
          <code className={code}>8Xs</code> faster ({' '}
          <code className={code}>7.86...</code> rounded up). The more verbose
          code wins.
        </p>

        <p className={text}>
          Aside from the fact that it&apos;s faster, this code is more explicit.
          What I mean by that is that we are handling our exception and
          explicitly returning the value we want. There isn&apos;t anything
          implied as in the case of <code className={code}>withDefault</code>.
          Another benefit of going with withoutDefault is that we&apos;re not
          running code unnecessarily. In
          <code className={code}>withDefault</code> we are still performing, to
          some extent, every operation just to return an empty string — time
          waster! Now imagine that you have an application of 10K, 20K, 120K
          lines of code. If your pattern is to always resort to a default param
          and omit early termination, you could seriously be missing out on the
          performance benefits of more explicit and early terminating code.
        </p>
        <h2>In Summary:</h2>
        <p className={text}>
          If you are one of those developers that will always advocate for the
          &ldquo;elegant&rdquo; solution, remember that the elegance you strive
          for may not be worth the cost you pay in slower code. 🙃
        </p>
        <p className={text}>Enjoy your Holiday!</p>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'JavaScript',
              'Software Development',
              'Programming',
              'Technology',
              'Software Engineering',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
