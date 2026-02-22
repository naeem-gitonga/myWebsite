/** @jest-environment node */
const lambdaInstances: any[] = [];
const policyStatements: any[] = [];

jest.mock('constructs', () => ({
  Construct: class {
    constructor(..._args: any[]) {}
  },
}));

jest.mock('aws-cdk-lib/aws-lambda', () => ({
  Code: { fromAsset: jest.fn((assetPath) => ({ assetPath })) },
  Runtime: { NODEJS_22_X: 'nodejs22.x' },
  Function: jest.fn((scope, id, props) => {
    const instance = { scope, id, props, addToRolePolicy: jest.fn() };
    lambdaInstances.push(instance);
    return instance;
  }),
}));

jest.mock('aws-cdk-lib/aws-apigateway', () => {
  const createResource = () => {
    const resource: any = {
      addMethod: jest.fn(),
      addResource: jest.fn(() => createResource()),
    };
    return resource;
  };

  return {
    LambdaIntegration: jest.fn((handler) => ({ handler })),
    LambdaRestApi: jest.fn(() => ({ root: createResource() })),
    AccessLogFormat: { jsonWithStandardFields: jest.fn(() => 'json') },
    LogGroupLogDestination: jest.fn((group) => ({ group })),
    MethodLoggingLevel: { INFO: 'INFO' },
  };
});

jest.mock('aws-cdk-lib/aws-iam', () => ({
  StarPrincipal: jest.fn(),
  Effect: { ALLOW: 'ALLOW' },
  PolicyDocument: jest.fn((props) => ({ props })),
  PolicyStatement: jest.fn((props) => {
    policyStatements.push(props);
    return props;
  }),
}));

jest.mock('aws-cdk-lib/aws-s3', () => ({
  Bucket: {
    fromBucketName: jest.fn(() => ({ grantRead: jest.fn() })),
  },
}));

jest.mock('aws-cdk-lib/aws-logs', () => ({
  LogGroup: jest.fn((scope, id, props) => ({ scope, id, props })),
}));

jest.mock('aws-cdk-lib/aws-sqs', () => ({
  Queue: jest.fn(() => ({
    queueArn: 'arn:sqs:queue',
    queueUrl: 'https://sqs.example.com/queue',
  })),
}));

jest.mock('aws-cdk-lib', () => ({
  Duration: {
    minutes: jest.fn((value) => ({ minutes: value })),
    days: jest.fn((value) => ({ days: value })),
  },
  RemovalPolicy: { RETAIN: 'retain', DESTROY: 'destroy' },
}));

jest.mock('../iam-roles', () => ({
  policyStatementJng: { jng: true },
  policyStatementRb: { rb: true },
  s3Permission: { s3: true },
  sesSendPermission: { ses: true },
}));

const { Construct } = jest.requireMock('constructs') as {
  Construct: new (...args: any[]) => any;
};

const { Code } = jest.requireMock('aws-cdk-lib/aws-lambda') as {
  Code: { fromAsset: jest.Mock };
};

const { LogGroup } = jest.requireMock('aws-cdk-lib/aws-logs') as {
  LogGroup: jest.Mock;
};

const BackendService = require('../backend-service').default;

describe('BackendService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    lambdaInstances.length = 0;
    policyStatements.length = 0;
    process.env = {
      ...originalEnv,
      ORIGIN: 'https://example.com',
      ACCESS_KEY_ID: 'access',
      SECRET_ACCESS_KEY: 'secret',
      SEND_GRID_API_KEY: 'sendgrid',
      WHICH_ROUTE: 'staging',
      CALENDLY_API_ACCESS_TOKEN: 'token',
      CALENDLY_API_URL: 'https://calendly.example.com',
      CALENDLY_EVENT_URI: 'event-uri',
      STAGE: 'test',
      ARTIFACT_PATH: '/tmp/fake.zip',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('configures staging defaults when not production', () => {
    process.env.NODE_ENV = 'staging';

    const scope = new Construct();
    new BackendService(scope, 'Service');

    expect(Code.fromAsset).toHaveBeenCalledWith('/tmp/fake.zip');
    expect(lambdaInstances[0].props.functionName).toBe('jngpaypal-staging');
    expect(lambdaInstances[1].props.functionName).toBe('ngcontact-staging');
    expect(lambdaInstances[1].props.handler).toBe('handler.contact');
    expect(LogGroup).toHaveBeenCalledWith(
      expect.anything(),
      'ng-backend-log-group',
      expect.objectContaining({
        logGroupName: 'ng-backend-log-group-staging',
        removalPolicy: 'destroy',
      })
    );
    const apiPolicy = policyStatements.find((statement) => statement.conditions);
    expect(apiPolicy.conditions.StringEquals['aws:Referer']).toEqual([
      'https://www.staging.naeemgitonga.com/*',
      'https://www.staging.naeemgitonga.com/',
      'https://staging.naeemgitonga.com/*',
      'https://staging.naeemgitonga.com/',
    ]);
    expect(apiPolicy.resources).toContain(
      'arn:aws:execute-api:*:*:*/prod/POST/api/ngcontact-staging'
    );
  });

  it('configures production defaults', () => {
    process.env.NODE_ENV = 'production';

    const scope = new Construct();
    new BackendService(scope, 'Service');

    expect(lambdaInstances[0].props.functionName).toBe('jngpaypal');
    expect(lambdaInstances[1].props.functionName).toBe('ngcontact');
    expect(LogGroup).toHaveBeenCalledWith(
      expect.anything(),
      'ng-backend-log-group',
      expect.objectContaining({
        logGroupName: 'ng-backend-log-group',
        removalPolicy: 'retain',
      })
    );
    const apiPolicy = policyStatements.find((statement) => statement.conditions);
    expect(apiPolicy.conditions.StringEquals['aws:Referer']).toEqual([
      'https://www.naeemgitonga.com/*',
      'https://www.naeemgitonga.com/',
      'https://naeemgitonga.com/',
      'https://naeemgitonga.com/*',
    ]);
    expect(apiPolicy.resources).toContain(
      'arn:aws:execute-api:*:*:*/prod/POST/api/ngcontact'
    );
  });
});
