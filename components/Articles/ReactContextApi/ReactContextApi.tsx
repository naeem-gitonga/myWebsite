'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import seeTheLight from '../../pictures/react.png';
import reactGif from '../../pictures/react_context.gif';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function ReactContextApi(): JSX.Element {
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
    secondGist,
    thirdGist,
    fourthGist,
    grey,
  } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  return (
    <div id="react-context-api" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <div className={imageWrapper}>
          <Image
            alt="React"
            loader={imageLoader}
            src={seeTheLight}
            style={{ objectFit: 'contain', maxWidth: '25%' }}
            fill
          />
          <p className={altText}>React</p>
        </div>
        <h1>React Context-Api and Lazy-loading</h1>
        <ArticleDateTime imageUrl={'reactcontext'} />
        <h2>The What...</h2>
        <p className={text}>
          I am working on a new e-commerce site and I wanted to share some of
          the things that I learned and put to use for this project. First,
          there are plenty of docs and talks about both subjects of this post.
          However, I will demonstrate how I used React&apos;s context-api and
          code-splitting, a.k.a. lazy loading, together to create a modal that I
          will later flesh out to serve a higher purpose. This blog serves to be
          a reminder to myself of what I learned and is as a tutorial on how to
          get the two things working.
        </p>
        <h2>The Why...</h2>
        <p className={text}>
          I want to use the latest and greatest of React and load code on
          demand. I love the out of the box, easy to use tools that this library
          offers. I am fairly new to lazy-loading as it was introduced to me at
          work while going over some Angular 7. I know many{' '}
          <strong>don&apos;t</strong> like Angular 7 or any of the previous six
          Angular flavors, nor AngularJS, but I &apos;ll make it work
          regardless, 😏. That being said, learning about it there made me want
          to try it in React, since I immediately saw it &apos;s benefits.
        </p>
        <p className={text}>
          With that said we will continue with one way to solve this. For the
          reader, I write about the code, first, and then show it, second.
        </p>
        <h2>Getting going:</h2>
        <p className={text}>
          First let&apos;s take a look at my{' '}
          <code className={code}>app.js</code>. I used Material-UI for my
          components to help bootstrap the project. This file is basic and
          renders a <code className={code}>{'<Grid />'}</code> with a{' '}
          <code className={code}>{'<Button />'}</code>. What I want is that when
          this button is clicked, the modal, containing the form, should be
          rendered to the screen.
        </p>
        <p className={text}>
          This is where lazy loading comes in. When lazy loading we want the
          code that we are not using, or that the user does not need when the
          app is first loaded to be loaded when and only when they need it. In
          this case we want to load another component when the button is
          clicked.
        </p>
        <p className={text}>
          At the moment it does none of that but we&apos;ll get there.
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${firstGist}`}>
              <iframe
                className={firstGist}
                src="https://gist.github.com/JNaeemGitonga/734e8db330da961bb7fc4565b2f8ec22.pibb"
              ></iframe>
            </div>
          </div>
        </figure>
        <p className={text}>
          Next, let&apos;s checkout out our{' '}
          <code className={code}>form.js</code>. This code is the code that we
          will want to lazy load when our button is clicked. It is a collection
          of components from our library to make a modal.
        </p>
        <p className={text}>
          We will modify it later so that it will not have a state object but
          rather its state will be taken from{' '}
          <code className={code}>Context</code> which is a great tool to help us
          get information from one component to another. This is used as an
          alternative to Redux or passing down props. In this case, we could
          pass props but that would mean not taking advantage of the new
          <code className={code}>Context-Api</code>.
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${secondGist}`}>
              <iframe
                className={secondGist}
                id="second-gist"
                src="https://gist.github.com/JNaeemGitonga/6125e8a74c94382f043db584b92c8a6f.pibb"
              ></iframe>
            </div>
          </div>
        </figure>
        <p className={text}>
          Now that we have a starting point let&apos;s begin modifying this code
          so that we can use lazy loading. The first thing that we should do is
          update our <code className={code}>{'<Button />'}</code>in our{' '}
          <code className={code}>{'<App />'}</code> so that it will show the
          form when clicked. We&apos;ll do that by importing it lazily — refer
          to snippet below. <code className={code}>line 1</code> has the
          important piece of code that we need to lazy load. It uses
          React&apos;s <code className={code}>lazy()</code> method and the
          dynamic <code className={code}>import()</code> method to accomplish
          this.
        </p>
        <p className={text}>
          We have added on <code className={code}>line 8</code> a{' '}
          <code className={code}>handleClick()</code> method to trigger the
          event to load and open our dialog.
        </p>
        <p className={text}>
          On <code className={code}>line 27</code> we will use a short-circuit
          to help us render the <code className={code}>{'<Form />'}</code>{' '}
          component. There is more on short-circuiting here. We also need to
          wrap our lazy loaded <code className={code}>{'<Form />'}</code> in a{' '}
          <code className={code}>{'<Suspense />'}</code> component and pass{' '}
          <code className={code}>{'<Suspense />'}</code> a{' '}
          <code className={code}>fallback</code> prop.
          <code className={code}>fallback</code> is what will be displayed to
          our user while our <code className={code}>{'<Form />'}</code>{' '}
          component loads.
        </p>
        <p className={text}>
          Now some will notice that we can stop here — I mentioned this earlier
          in the article. If we want to solely lazy load the component and pass
          props of <code className={code}>open</code>, which would be a boolean,
          and <code className={code}>toggleOpen</code>, which would be a
          function, to <code className={code}>{'<Form />'}</code>, we could do
          that and never have to worry with{' '}
          <code className={code}>Context</code>. And you would have achieved the
          same thing.
        </p>
        <p className={text}>Still we will continue…</p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${thirdGist}`}>
              <iframe
                id="third-gist"
                src="https://gist.github.com/JNaeemGitonga/73aba165af5455967b5198fb6ca9d7c3.pibb"
              ></iframe>
            </div>
          </div>
        </figure>

        <p className={text}>
          We also need to modify our{' '}
          <code className={code}>lazy-load-context-form.js</code> file so it is
          automatically set to open <code className={code}>true</code>. This is
          just for testing the functionality of our lazy load and will replaced
          later. That change will look like this:
        </p>
        <figure className={figure}>
          <div className={firstInner}>
            <div className={`${secondInner} ${fourthGist}`}>
              <iframe
                id="fourth-gist"
                src="https://gist.github.com/JNaeemGitonga/70bc827723557a3df0d53b03b9051b73.pibb"
              ></iframe>
            </div>
          </div>
        </figure>
        <p className={text}>
          Now we are ready to lazy load. We can test our component for lazy
          loading the form by looking in our dev tools Network tab. We should
          see that when the app is initially loaded that we will have a
          <code className={code}>2.chunk.js</code> file that has been loaded.
          After clicking our button. We will see two new chunk files added to
          our history.
        </p>
        <div className={imageWrapper}>
          <Image
            alt="React"
            loader={imageLoader}
            src={reactGif}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>React</p>
        </div>
        <h2>Context…</h2>
        <p className={text}>
          Now that we are lazy loading masters, let&apos;s work on controlling
          the open and close portion of our dialog with the addition of{' '}
          <code className={code}>Context</code>. To start with we will need to
          create a context object. I created another file to do this but all we
          really need is to call the{' '}
          <code className={code}>createContext()</code>
          method on our <code className={code}>React</code> instance and store
          it in a variable that we will export so that we can import it where we
          need it. Got it!?
        </p>
        <p className={text}>
          And that&apos;s all folks! I hope you enjoyed this blog. Please leave
          comments/suggestions. Thanks for reading!
        </p>
        <p className={text}>
          More on lazy loading{' '}
          <a
            className={grey}
            target="_blank"
            href="https://react.dev/reference/react/lazy#suspense-for-code-splitting"
          >
            here
          </a>
          .
        </p>
        <p className={text}>
          Project link on github{' '}
          <a
            className={grey}
            target="_blank"
            href="https://github.com/JNaeemGitonga/lazy-load-context"
          >
            here
          </a>
          .
        </p>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'React',
              'context api',
              'front-end development',
              'lazy loading',
              'Software Engineering',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
