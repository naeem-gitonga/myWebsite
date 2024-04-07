'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import articleStyles from '../Articles.module.scss';
import styles from './ReadWriteSendXml.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import computerGenius from '../../pictures/computer-genius.png';

import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';
import Link from 'next/link';

export default function SamLambdaMongoDB(): JSX.Element {
  const {
    innerWrapper,
    imageWrapper,
    text,
    code,
    figure,
    firstInner,
    secondInner,
    gistSubtext,
    pre,
  } = articleStyles;
  const {
    firstGist,
    thirdGist,
    fourthGist,
    fifthGist,
    sixthGist,
    seventhGist,
  } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;

  // * &rdquo; &ldquo; &apos;
  return (
    <div id="read-write-send-xml" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <ArticleDateTime imageUrl={'xml'} />
        <div className={imageWrapper}>
          <Image
            alt="Jaha Naeem Gitonga sitting at computer"
            loader={imageLoader}
            src={computerGenius}
            style={{ objectFit: 'contain', maxWidth: '100%' }}
            fill
          />
        </div>
        <h1>
          XML, read, send, write: Javascript client to Express/Node.js server
        </h1>
        <p className={text}>
          Do you like <em>not</em> having a reference to build something? As
          well known as these three technologies are, I was hard-pressed to find
          another article demonstrating a model of them working in tandem. In
          fact, I didn&apos;t find one. So, I gave birth to this one!
        </p>
        <p className={text}>
          To clarify eXtensible Markup Language (XML) is similar to HTML but
          with the design to store and transport data. With that being said
          let&apos;s first examine some of the differences that make XML. If you
          would like to skip this part (TL/DR) and want to dive into some
          working code skip down to{' '}
          <Link href="#get-to-code">Now let&apos;s get to some code</Link>{' '}
          section.
        </p>
        <p className={text}>
          Like HTML we will see <em>tags</em> and <em>attributes</em> but unlike
          HTML they are not predetermined but rather determined by the author of
          the XML doc. You may see XML such as the following with no attributes:
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${firstGist}`}>
              <iframe
                className={firstGist}
                src="https://gist.github.com/JNaeemGitonga/16600984f7af637e79c46a2b1217f1df.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>XML without attributes</p>
        </figure>
        <p className={text}>
          That XML is nice and neat. It is easily readable and can easily be
          parsed and added to a database. When that XML hits your xml parser
          you&apos;ll get some JSON that looks like this:
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${firstGist}`}>
              <iframe
                className={firstGist}
                src="https://gist.github.com/JNaeemGitonga/750ec04d91337c27fc7f433fbb0ffad7.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>
            resulting JSON from XML without attributes
          </p>
        </figure>
        <p className={text}>
          Looks good! But what if we have XML that uses attributes to store the
          data and what if we add some other meta tags for good measure? That is
          a bit more challenging. It&apos;s not extensible, meaning that you
          won&apos;t be able to easily change it in the future and that your
          application may have to change with it should the document structure
          change. We&apos;ll now take the same data and store it in XML using
          attributes and see how the JSON differs. Take this for example:
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${thirdGist}`}>
              <iframe
                className={thirdGist}
                src="https://gist.github.com/JNaeemGitonga/130dbeaaafe2be2ce197007ef95e9b2f.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>XML with attributes and other metadata</p>
        </figure>
        <p className={text}>
          Now for the parser that we will be using on our Node/Express back-end,
          <code className={code}>
            <a
              target="_blank"
              href="https://www.npmjs.com/package/express-xml-bodyparser"
            >
              express-xml-bodyparser
            </a>
          </code>
          , I found that it doesn&apos;t particularly like those first three
          lines so I just removed them with some JavaScript. You can see the{' '}
          <a
            target="_blank"
            href="https://github.com/JNaeemGitonga/xml-loading"
          >
            repo
          </a>{' '}
          if you&apos;re interested in seeing how (check{' '}
          <code className={code}>public/app.js</code>). Now, let&apos;s explore
          our new albums JSON:
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${fourthGist}`}>
              <iframe
                className={fourthGist}
                src="https://gist.github.com/JNaeemGitonga/1328fc7f0ac73a6b1232263735bc0baf.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>albums.attribute.xml</p>
        </figure>
        <p className={text}>
          As you can see our parser has made our JSON a little more nested and
          If you can imagine, the more nested your XML tags and the more
          <em>attributes</em> that you have when using the former attribute
          syntax the more nested and complicated your resulting JSON will be
          making it harder to extend. Lastly, attributes are mainly used for
          metadata storage.
        </p>
        <h2 id="get-to-code">Now let&apos;s get to some code</h2>
        <p className={text}>
          I made a minimal front-end using HTML, JavaScript, CSS and the jQuery
          library. We&apos;ll start with my HTML. I have a 46 line HTML doc but
          we&apos;ll look at the lines that are most significant to this topic.
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${fifthGist}`}>
              <iframe
                className={fifthGist}
                src="https://gist.github.com/JNaeemGitonga/3ee101a47f2f857584fb2b06a0343526.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>index.html</p>
        </figure>
        <p className={text}>
          Checkout <code className={code}>line 4</code>. I have an input that
          accepts only <code className={code}>xml</code>. 🤔 Now that we&apos;ve
          seen that let&apos;s look at our <code className={code}>app.js</code>.
          Similar to the HTML file I have only shared a gist of the lines that
          are most important to this article.
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${sixthGist}`}>
              <iframe
                className={sixthGist}
                src="https://gist.github.com/JNaeemGitonga/54140f27a81a379111a3964305b0d961.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>app.js (partial file — front-end)</p>
        </figure>
        <p className={text}>
          A little bit about these two functions{' '}
          <code className={code}>processFile</code> and{' '}
          <code className={code}>sendXML</code>.
          <code className={code}>processFile</code> will be called when a user
          presses the &ldquo;Upload&rdquo; button on our app and will initiate
          the reading and initial parsing of our XML so that it will be ready to
          send to our Express server.
        </p>
        <p className={text}>
          In the case that we have XML similarly structured to
          <code className={code}>album.attribute.xml</code> then we would need
          to remove the first three lines for this XML to work with our XML
          parser in our server. This is what is happening on lines 22 & 23.{' '}
          <strong>NOTICE</strong> that on <code className={code}>line 22</code>{' '}
          we make an assumption that his app will only be used for uploading XML
          for albums. We can make it more dynamic but the purpose of this post
          is to show how to take an XML file in on the front-end, parse it on
          the back-end, and persist the data in a database of our choosing.
        </p>
        <p className={text}>
          With that being said, let&apos;s take a look at our{' '}
          <code className={code}>server.js</code>! It&apos;s a minimal server:
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${seventhGist}`}>
              <iframe
                className={seventhGist}
                src="https://gist.github.com/JNaeemGitonga/99a610b01744b2e5c66ef88182d4eaa2.pibb"
              ></iframe>
            </div>
          </div>
          <p className={gistSubtext}>server.xml.js</p>
        </figure>
        <p className={text}>
          This server uses <code className={code}>sqlite3</code> to persist our
          data and uses the <code className={code}>express-xml-bodyparser</code>{' '}
          so that we can actually work with the data that is passed to it from
          our front-end. If we jump to <code className={code}>lines 47</code> of
          our <code className={code}>server.xml.js</code> we see that we do a
          post and take the body of our parsed xml, loop over it, and create the
          appropriate query and voila! we can add it our database.
        </p>
        <p className={text}>
          In the immortal words of Bugs Bunny “That&apos;s all folks!”
        </p>
        <p className={text}>
          A full repo of this project can be seen{' '}
          <a
            target="_blank"
            href="https://github.com/JNaeemGitonga/xml-loading"
          >
            here
          </a>
          .
        </p>
        <pre className={pre}>
          <code className={code}>
            {`<albums>\n <album>\n  <artist>Prince</artist>\n  <title>Purple Rain</title>\n  <year>1984</year>\n  <awards>\n   <grammy>3</grammy>\n  </awards>\n </album>\n <album>\n  <artist>Rick James</artist>\n  <title>Street Songs</title>\n  <year>1981</year>\n  <awards>\n   <grammy>1</grammy>\n  </awards>\n </album>\n</albums>`}
          </code>
        </pre>
        <p className={text}>
          I hope this is helpful to someone! Let me know what you think!
        </p>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'Xmlhttprequest',
              'XML',
              'JavaScript',
              'Node.js',
              'Software Engineering',
              'REST APIs',
              'Fullstack development',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
