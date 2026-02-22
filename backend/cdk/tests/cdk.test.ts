import { App, Stack } from 'aws-cdk-lib';
import BackendStack from '../lib/backend-stack';
import { Template } from 'aws-cdk-lib/assertions';
import fs from 'fs';
import path from 'path';
// import * as fs from 'fs'

describe('Test for constructs created', (): void => {
  let stack: Stack;
  beforeAll((): void => {
    const app = new App();
    process.env.NODE_ENV = 'staging';
    const artifactPath = path.join(
      __dirname,
      '../../apis/.serverless/jngpaypal.zip'
    );
    fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
    if (!fs.existsSync(artifactPath)) {
      fs.writeFileSync(artifactPath, '');
    }
    process.env.ARTIFACT_PATH = artifactPath;
    stack = new BackendStack(app, 'BackendStackTest', {
      env: { account: '00000000', region: 'us-east-2' },
    });
  });

  it('Stack created an IAM role', (): void => {
    const template = Template.fromStack(stack);
    // fs.writeFileSync('template.json', JSON.stringify(template), 'utf-8')
    template.hasResourceProperties('AWS::IAM::Role', {});
    template.resourceCountIs('AWS::IAM::Role', 3);
  });
});
