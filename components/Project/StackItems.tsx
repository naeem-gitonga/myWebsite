import { ProjectName } from './projects';
import styles from './Project.module.css';
import Tooltip from '../Tooltip/Tooltip';

const {
  awssam,
  docker,
  express,
  redux,
  dynamodb,
  logo,
  mongo,
  name,
  kubernetes,
  go,
  lambda,
  cdk,
  node,
  react,
  text,
  postgres,
  terraform,
  javascript,
  typescript,
  angular,
  nextjs,
  serverless,
  projectStackItem,
} = styles;

export function ReduxStackItem(): JSX.Element {
  return (
    <Tooltip text="Redux">
      <div className={`${projectStackItem} ${redux} ${logo}`} />
    </Tooltip>
  );
}

export function ServerlessStackItem(): JSX.Element {
  return (
    <Tooltip text="Serverless">
      <div className={`${projectStackItem} ${serverless} ${logo}`} />
    </Tooltip>
  );
}

export function NodeStackItem(): JSX.Element {
  return (
    <Tooltip text="Node.js">
      <div className={`${node} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function ReactStackItem(): JSX.Element {
  return (
    <Tooltip text="React.js">
      <div className={`${react} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function ExpressStackItem(): JSX.Element {
  return (
    <Tooltip text="Express.js">
      <div className={`${express} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function MongoStackItem(): JSX.Element {
  return (
    <Tooltip text="MongoDB">
      <div className={`${mongo} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function JsStackItem(): JSX.Element {
  return (
    <Tooltip text="JavaScript">
      <div className={`${javascript} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function Angular(): JSX.Element {
  return (
    <Tooltip text="AngularJS">
      <div className={`${angular} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function Docker(): JSX.Element {
  return (
    <Tooltip text="Docker">
      <div className={`${docker} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function GolangStackItem(): JSX.Element {
  return (
    <Tooltip text="Go">
      <div className={`${go} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function AWSSam(): JSX.Element {
  return (
    <Tooltip text="AWS SAM">
      <div className={`${awssam} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function Kubernetes(): JSX.Element {
  return (
    <Tooltip text="Kubernetes">
      <div className={`${kubernetes} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function CDK(): JSX.Element {
  return (
    <Tooltip text="AWS CDK">
      <div className={`${cdk} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function Terraform(): JSX.Element {
  return (
    <Tooltip text="Terraform">
      <div className={`${terraform} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function AWSLambda(): JSX.Element {
  return (
    <Tooltip text="Lambda">
      <div className={`${lambda} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function TypeScript(): JSX.Element {
  return (
    <Tooltip text="TypeScript">
      <div className={`${typescript} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function NextJs(): JSX.Element {
  return (
    <Tooltip text="Next.js">
      <div className={`${nextjs} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function PostgreSQL(): JSX.Element {
  return (
    <Tooltip text="Postgres">
      <div className={`${postgres} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export function DynamoDB(): JSX.Element {
  return (
    <Tooltip text="DynamoDB">
      <div className={`${dynamodb} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

export type ProjectMapType = {
  [key in ProjectName]: JSX.Element[];
};

export const defaultStack = [
  <MongoStackItem key="mongodb" />,
  <ExpressStackItem key="express" />,
  <ReduxStackItem key="redux" />,
  <ReactStackItem key="react" />,
  <NodeStackItem key="node" />,
];

export const projectStackMap: ProjectMapType = {
  polls: defaultStack,
  horoscope: defaultStack,
  learningo: defaultStack,
  gab: [
    <NodeStackItem key="node" />,
    <ReduxStackItem key="redux" />,
    <ReactStackItem key="react" />,
  ],
  connex: [
    <MongoStackItem key="mongodb" />,
    <ServerlessStackItem key="serverless" />,
    <ReduxStackItem key="redux" />,
    <ReactStackItem key="react" />,
    <NodeStackItem key="node" />,
  ],
  ninety: [
    <MongoStackItem key="mongodb" />,
    <ServerlessStackItem key="serverless" />,
    <Angular key="angular" />,
    <NodeStackItem key="node" />,
    <Docker key="docker" />,
    <TypeScript key="typescript" />,
  ],
  gtng: [<ReactStackItem key="serverless" />, <NodeStackItem key="node" />],
  aah: [
    <ReactStackItem key="react" />,
    <GolangStackItem key="go" />,
    <AWSSam key="lambda" />,
    <MongoStackItem key="mongodb" />,
  ],
  pluralsight: [
    <Kubernetes key="kubernetes" />,
    <TypeScript key="typescript" />,
    <CDK key="cdk" />,
    <Terraform key="terraform" />,
    <ReactStackItem key="react" />,
    <NodeStackItem key="node" />,
    <Docker key="docker" />,
    <PostgreSQL key="postgres" />,
    <ServerlessStackItem key="serverless" />,
  ],
  honeywell: [
    <ReactStackItem key="react" />,
    <NodeStackItem key="node" />,
    <Docker key="docker" />,
    <ReduxStackItem key="redux" />,
    <TypeScript key="typescript" />,
  ],
  vc: [
    <ReactStackItem key="react" />,
    <NodeStackItem key="node" />,
    <Kubernetes key="kubernetes" />,
    <Docker key="docker" />,
    <TypeScript key="typescript" />,
  ],
  acloudguru: [
    <TypeScript key="typescript" />,
    <ReactStackItem key="react" />,
    <NodeStackItem key="node" />,
    <Docker key="docker" />,
    <NextJs key="nextjs" />,
    <AWSLambda key="lambda" />,
    <ServerlessStackItem key="serverless" />,
    <DynamoDB key="dynamodb" />,
  ],
  cricket: [
    <Kubernetes key="kubernetes" />,
    <TypeScript key="typescript" />,
    <ReactStackItem key="react" />,
    <NodeStackItem key="node" />,
    <Docker key="docker" />,
    <JsStackItem key="javascript" />,
  ],
  arithmetik: [<JsStackItem key="javascript" />],
  jngwebsite: [
    <NextJs key="nextjs" />,
    <TypeScript key="typescript" />,
    <ReactStackItem key="react" />,
  ],
};
