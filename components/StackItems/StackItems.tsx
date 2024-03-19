import { ProjectName } from '../Project/projects';
import styles from './StackItems.module.scss';
import Tooltip from '../Tooltip/Tooltip';

const {
  awssam,
  docker,
  express,
  redux,
  dynamodb,
  logo,
  mongo,
  kubernetes,
  go,
  lambda,
  cdk,
  node,
  react,
  postgres,
  terraform,
  javascript,
  typescript,
  angular,
  nextjs,
  serverless,
  projectStackItem,
  jest,
  apigateway,
  jwt,
} = styles;

type StackItemProps = {
  text: string;
  className: string;
};

function StackItem(props: StackItemProps): JSX.Element {
  const { text, className } = props;
  return (
    <Tooltip text={text}>
      <div className={`${className} ${projectStackItem} ${logo}`} />
    </Tooltip>
  );
}

type ProjectMapType = {
  [key in ProjectName]: JSX.Element[];
};

const defaultStack = [
  <StackItem text="MongoDB" className={mongo} key="mongo" />,
  <StackItem text="Express" className={express} key="express" />,
  <StackItem text="Redux" className={redux} key="redux" />,
  <StackItem text="React" className={react} key="react" />,
  <StackItem text="Node" className={node} key="node" />,
];

export const projectStackMap: ProjectMapType = {
  rapidbackend: [
    <StackItem text="MongoDB" className={mongo} key="mongo" />,
    <StackItem text="Serverless" className={serverless} key="serverless" />,
    <StackItem text="JWT" className={jwt} key="jwt" />,
    <StackItem text="Lambda" className={lambda} key="lambda" />,
    <StackItem text="TypeScript" className={typescript} key="typescript" />,
    <StackItem text="CDK" className={cdk} key="cdk" />,
    <StackItem text="Jest" className={jest} key="jest" />,
    <StackItem text="API Gateway" className={apigateway} key="apigateway" />,
  ],
  polls: defaultStack,
  horoscope: defaultStack,
  learningo: defaultStack,
  gab: [
    <StackItem text="Node" className={node} key="node" />,
    <StackItem text="Redux" className={redux} key="redux" />,
    <StackItem text="React" className={react} key="react" />,
  ],
  connex: [
    <StackItem text="MongoDB" className={mongo} key="mongo" />,
    <StackItem text="Serverless" className={serverless} key="serverless" />,
    <StackItem text="Redux" className={redux} key="redux" />,
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="Node" className={node} key="node" />,
    <StackItem text="Lambda" className={lambda} key="lambda" />,
  ],
  ninety: [
    <StackItem text="MongoDB" className={mongo} key="mongo" />,
    <StackItem text="Serverless" className={serverless} key="serverless" />,
    <StackItem text="Angular" className={angular} key="angular" />,
    <StackItem text="Node" className={node} key="node" />,
    <StackItem text="Docker" className={docker} key="docker" />,
    <StackItem text="TypeScript" className={typescript} key="typescript" />,
    <StackItem text="Lambda" className={lambda} key="lambda" />,
  ],
  gtng: [
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="Node" className={node} key="node" />,
  ],
  aah: [
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="Go" className={go} key="go" />,
    <StackItem text="AWS Sam" className={awssam} key="awssam" />,
    <StackItem text="MongoDB" className={mongo} key="mongo" />,
    <StackItem text="Lambda" className={lambda} key="lambda" />,
  ],
  pluralsight: [
    <StackItem text="Kubernetes" className={kubernetes} key="kubernetes" />,
    <StackItem text="TypeScript" className={typescript} key="typescript" />,
    <StackItem text="CDK" className={cdk} key="cdk" />,
    <StackItem text="Terraform" className={terraform} key="terraform" />,
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="Node" className={node} key="node" />,
    <StackItem text="Docker" className={docker} key="docker" />,
    <StackItem text="Postgres" className={postgres} key="postgres" />,
    <StackItem text="Serverless" className={serverless} key="serverless" />,
    <StackItem text="Lambda" className={lambda} key="lambda" />,
  ],
  honeywell: [
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="Node" className={node} key="node" />,
    <StackItem text="Docker" className={docker} key="docker" />,
    <StackItem text="Redux" className={redux} key="redux" />,
    <StackItem text="TypeScript" className={typescript} key="typescript" />,
  ],
  vc: [
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="Node" className={node} key="node" />,
    <StackItem text="Kubernetes" className={kubernetes} key="kubernetes" />,
    <StackItem text="Docker" className={docker} key="docker" />,
    <StackItem text="TypeScript" className={typescript} key="typescript" />,
    <StackItem text="Lambda" className={lambda} key="lambda" />,
  ],
  acloudguru: [
    <StackItem text="TypeScript" className={typescript} key="typescript" />,
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="Node" className={node} key="node" />,
    <StackItem text="Docker" className={docker} key="docker" />,
    <StackItem text="NextJs" className={nextjs} key="nextjs" />,
    <StackItem text="Lambda" className={lambda} key="lambda" />,
    <StackItem text="Serverless" className={serverless} key="serverless" />,
    <StackItem text="DynamoDB" className={dynamodb} key="dynamodb" />,
  ],
  cricket: [
    <StackItem text="Kubernetes" className={kubernetes} key="kubernetes" />,
    <StackItem text="TypeScript" className={typescript} key="typescript" />,
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="Node" className={node} key="node" />,
    <StackItem text="Docker" className={docker} key="docker" />,
    <StackItem text="Javascript" className={javascript} key="javascript" />,
  ],
  arithmetik: [
    <StackItem text="Javascript" className={javascript} key="javascript" />,
  ],
  jngwebsite: [
    <StackItem text="NextJs" className={nextjs} key="nextjs" />,
    <StackItem text="TypeScript" className={typescript} key="typescript" />,
    <StackItem text="React" className={react} key="react" />,
    <StackItem text="CDK" className={cdk} key="cdk" />,
    <StackItem text="API Gateway" className={apigateway} key="apigateway" />,
    <StackItem text="Lambda" className={lambda} key="lambda" />,
    <StackItem text="Serverless" className={serverless} key="serverless" />,
    <StackItem text="Jest" className={jest} key="jest" />,
  ],
};
