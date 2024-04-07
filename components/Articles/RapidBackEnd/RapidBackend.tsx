'use client';
import Image from 'next/image';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from '../Articles.module.scss';
import sharedStyles from '../../SharedCss/SharedCss.module.scss';
import Tags from '@/components/Tags/Tags';

import seeTheLight from '../../pictures/see-the-light.jpg';
import serviceArchitecture from '../../pictures/architecture-breakdown.png';
import rapidBackEndLogo from '../../pictures/rapidbackend.png';
import Link from 'next/link';
import { imageLoader } from '@/utils/imageLoader';
import ReturnArrow from '@/components/ReturnArrow/ReturnArrow';
import { ArticleDateTime } from '@/components/ArticleDateTime/ArticleDateTime';

export default function RapidBackend(): JSX.Element {
  const { innerWrapper, imageWrapper, altText, text, anchorColor } = styles;
  const { tenPadding, width75, minus10LeftMargin } = sharedStyles;
  return (
    <div id="rapid-backend" className={`${tenPadding}`}>
      <PageHeader headerName="article" hideLinks={false} />
      <div className={`${width75} ${innerWrapper}`}>
        <div className={imageWrapper}>
          <Image
            alt="See the light"
            loader={imageLoader}
            src={seeTheLight}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>See the light</p>
        </div>
        <h1>
          Exploring Functions as Microservices: A Powerful Approach to
          Cloud-Based Applications
        </h1>
        <ArticleDateTime imageUrl="exprapidbackend" />
        <p className={text}>
          In the realm of cloud computing, the concepts of Functions as a
          Service (FaaS) and microservices have gained significant attention.
          While they may appear similar, they actually represent distinct
          concepts. In this article, we will delve into the world of Functions
          as a Service (FaaS) and microservices, understanding their differences
          and exploring the fascinating concept of Functions as Microservices
          (FaMS). We will also introduce Rapid Back-End, a customizable solution
          that leverages FaMS for building effective and efficient cloud-based
          applications.
        </p>
        <h2>Microservices vs. FaaS</h2>
        <p className={text}>
          As defined by cloudfalare.com, microservices are modular components
          that form the building blocks of applications. On the other hand, FaaS
          comprises collections of functions that have a combined purpose and
          are highly segmented. These functions perform the same tasks as the
          original microservice but but are broken into smaller parts. FaaS
          offers engineers the ability to delegate some infrastructure work to a
          cloud provider, reducing their workload.
        </p>
        <p className={text}>
          To visualize the relationship between microservices and FaaS,
          let&apos;s refer to a diagram borrowed from cloudflare.com:
        </p>
        <div className={imageWrapper}>
          <Image
            alt="Architectural diagram"
            loader={imageLoader}
            src={serviceArchitecture}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>
            Diagram taken from{' '}
            <a
              className={anchorColor}
              target="_blank"
              href="https://www.cloudflare.com/learning/serverless/glossary/function-as-a-service-faas/"
            >
              cloudflare.com
            </a>
          </p>
        </div>
        <p className={text}>
          As depicted, FaaS is derived from microservices, showcasing the
          breakdown of functions at a granular level.
        </p>
        <h2>Functions as Microservices (FaMS)</h2>
        <p className={text}>
          The adoption of FaaS can lead to a proliferation of functions
          (nanoservices), especially when transitioning from a
          microservices-based architecture. This scenario gave rise to the
          concept of Functions as Microservices (FaMS). FaMS allows developers
          to harness the benefits of cloud functions while retaining the modular
          nature of microservices. It is often referred to as serverless
          microservices, emphasizing the removal of excessive lambdas that
          comprise many cloud-based applications.
        </p>
        <h2>The Challenges of Nanoservices</h2>
        <p className={text}>
          Cloud-based applications built with a &ldquo;nanoservice&rdquo;
          architecture, consisting of numerous small services, can present
          challenges. Debugging and deploying such applications become complex
          and time-consuming. Moreover, onboarding new engineers to such a
          system becomes a cumbersome task, as they need to grasp the extensive
          surface area. Code maintenance becomes intricate, requiring separate
          deployment processes and adding to the overall overhead.
        </p>
        <div className={imageWrapper}>
          <Image
            alt="Rapid Back-End logo"
            loader={imageLoader}
            src={rapidBackEndLogo}
            style={{ objectFit: 'contain', maxWidth: '75%' }}
            fill
          />
          <p className={altText}>
            <Link href="/item?item_id=2">Rapid Back-End</Link>
          </p>
        </div>
        <h2>Advantages of FaMS and Rapid Back-End</h2>
        <p className={text}>
          By adopting FaMS and leveraging Rapid Back-End, developers can
          overcome the challenges associated with nanoservices. Rapid Back-End
          significantly reduces the surface area, simplifying the building and
          maintenance of functions. With a focus on object-oriented design
          patterns, code becomes highly modular and easier to manage. Rapid
          Back-End, a tested and extensible solution, offers seamless local
          development and swift cloud deployment within minutes provided the
          user has an existing AWS account. It provides flexibility by
          supporting MongoDB and being customizable if SQL databases preferred.
          Security is prioritized, with built-in authentication using JWTs and
          secure cookie-based (HTTP secure) sessions. The API Gateway is
          configured to only accept traffic from designated IP addresses,
          adhering to best practices and ensuring a hassle-free API deployment
          experience.
        </p>
        <h2>Unlocking the Power of Rapid Back-End</h2>
        <p className={text}>
          Designed for those seeking a quick start with a functional back-end,
          Rapid Back-End empowers developers for rapid prototyping or building
          monorepos of functions as microservices. Consolidating dependencies
          and services in one place provides significant advantages. It offers a
          robust and efficient solution, allowing developers to effortlessly
          provision and destroy cloud resources.
        </p>
        {/* pon tres dots aqui */}
        <p className={text}>
          In the ever-evolving landscape of cloud-based applications, embracing
          the power of Functions as Microservices can revolutionize the
          development process. Rapid Back-End enables developers to combine the
          benefits of FaaS and microservices, creating scalable and modular
          applications. Rapid Back-End, with its customizable features and
          seamless deployment capabilities, offers a compelling solution for
          those seeking a quick and efficient way to build APIs. Whether for
          rapid prototyping or large-scale projects, Rapid Back-End simplifies
          the development journey.
        </p>
        <div className={minus10LeftMargin}>
          <Tags
            tags={[
              'Serverless Architecture',
              'AWS Lambda',
              'AWS CDK',
              'Backend Development',
              'Software Engineering',
            ]}
          />
        </div>
      </div>
      <ReturnArrow />
    </div>
  );
}
