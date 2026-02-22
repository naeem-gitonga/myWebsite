import * as path from 'path';
import { Code, Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {
  LambdaIntegration,
  LambdaRestApi,
  AccessLogFormat,
  LogGroupLogDestination,
  MethodLoggingLevel,
} from 'aws-cdk-lib/aws-apigateway';
import {
  StarPrincipal,
  Effect,
  PolicyDocument,
  PolicyStatement,
} from 'aws-cdk-lib/aws-iam';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { policyStatementJng, policyStatementRb, s3Permission, sesSendPermission } from './iam-roles';

export default class BackendService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const functions: { [s: string]: Function } = {};
    const isProd = process.env.NODE_ENV === 'production';
    const functionNames = [`JngPaypal${isProd ? '' : '-staging'}`];

    const rapidbackendBucket = Bucket.fromBucketName(
      this,
      'RapidBackEndBucket',
      'rapidbackend'
    );

    const jngwebsiteBucket = Bucket.fromBucketName(
      this,
      'JngWebsiteBucket',
      'jahanaeemgitongawebsite'
    );

    // * create dead letter queue for lambda
    const deadLetterQueue = new Queue(this, 'dead-letter-queue', {
      retentionPeriod: Duration.days(14),
    });

    // * Define an IAM policy statement for writing to the SQS queue
    const sqsPermission = new PolicyStatement({
      actions: ['sqs:SendMessage', 'sqs:Get*'],
      resources: [deadLetterQueue.queueArn],
    });

    const environment: { [s: string]: {} } = {
      all: {
        ACCESS_KEY_ID: process.env.ACCESS_KEY_ID as string,
        CALENDLY_API_ACCESS_TOKEN: process.env
          .CALENDLY_API_ACCESS_TOKEN as string,
        DEAD_LETTER_QUEUE_URL: deadLetterQueue.queueUrl,
        NODE_ENV: process.env.NODE_ENV as string,
        ORIGIN: process.env.ORIGIN,
        SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY as string,
        SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY as string,
        STAGE: process.env.STAGE as string,
        WHICH_ROUTE: process.env.WHICH_ROUTE as string,
        CALENDLY_API_URL: process.env.CALENDLY_API_URL as string,
        CALENDLY_EVENT_URI: process.env.CALENDLY_EVENT_URI as string,
      },
    };

    functionNames.forEach((name: string) => {
      const nameLowerCased = name.toLowerCase();
      const nameWithoutStage = nameLowerCased.split('-')[0];
      console.log({
        nameLowerCased,
        name,
        nameWithoutStage,
        NODE_ENV: process.env.NODE_ENV,
      });
      const assetPath =
        process.env.ARTIFACT_PATH ??
        path.join(__dirname, '../../apis/.serverless/jngpaypal.zip');
      const lambda = new Function(this, name, {
        functionName: nameLowerCased,
        runtime: Runtime.NODEJS_22_X,
        handler: 'handler.paypal',
        environment: {
          ...(environment[nameWithoutStage] && environment[nameWithoutStage]),
          ...environment.all,
        },
        timeout: Duration.minutes(10),
        code: Code.fromAsset(
          assetPath // * change this filename once you change the service prop in /backend/serverless.yml
        ),
      });

      rapidbackendBucket.grantRead(lambda);
      jngwebsiteBucket.grantRead(lambda);

      lambda.addToRolePolicy(policyStatementRb);
      lambda.addToRolePolicy(policyStatementJng);
      lambda.addToRolePolicy(sqsPermission);
      lambda.addToRolePolicy(s3Permission);
      functions[nameLowerCased] = lambda;
    });

    const removalPolicy = isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY;

    // * create contact lambda (shares the same zip artifact as paypal)
    const contactFunctionName = `NgContact${isProd ? '' : '-staging'}`;
    const contactFunctionNameLowercased = contactFunctionName.toLowerCase();

    const contactLambda = new Function(this, contactFunctionName, {
      functionName: contactFunctionNameLowercased,
      runtime: Runtime.NODEJS_22_X,
      handler: 'handler.contact',
      environment: {
        ORIGIN: process.env.ORIGIN as string,
      },
      timeout: Duration.minutes(1),
      code: Code.fromAsset(
        process.env.ARTIFACT_PATH ??
          path.join(__dirname, '../../apis/.serverless/jngpaypal.zip')
      ),
    });
    contactLambda.addToRolePolicy(sesSendPermission);

    new LogGroup(this, 'ng-contact-log-group', {
      logGroupName: `/aws/lambda/${contactFunctionNameLowercased}`,
      removalPolicy,
    });

    // const deployStage = process.env.DEPLOY_STAGE; //? I May bring this back to conditionally set the condition to use my IP Address
    let referrers = [
      'https://www.staging.naeemgitonga.com/*',
      'https://www.staging.naeemgitonga.com/',
      'https://staging.naeemgitonga.com/*',
      'https://staging.naeemgitonga.com/',
    ];

    if (isProd) {
      referrers = [
        'https://www.naeemgitonga.com/*',
        'https://www.naeemgitonga.com/',
        'https://naeemgitonga.com/',
        'https://naeemgitonga.com/*',
      ];
    }

    let conditions: any = {
      StringEquals: {
        'aws:Referer': referrers,
      },
      // IpAddress: {
      //   'aws:SourceIp': [process.env.IP_ADDRESS], // * add your ip address here. make sure that you have the correct ip address or you will see something like this {"Message":"User: anonymous is not authorized to perform: execute-api:Invoke on resource: arn:aws:execute-api:us-east-1:********6173:1crdeqdfq4/prod/GET/api/lambdaa"}
      //  },
    };

    const apiResourcePolicy = new PolicyDocument({
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          principals: [new StarPrincipal()],
          actions: ['execute-api:Invoke'],
          resources: [`arn:aws:execute-api:*:*:*/prod/*/api/jngpaypal*`],
          conditions,
        }),
        new PolicyStatement({
          effect: Effect.ALLOW,
          principals: [new StarPrincipal()],
          actions: ['execute-api:Invoke'],
          resources: [`arn:aws:execute-api:*:*:*/prod/*/api/ngcontact${isProd ? '' : '-staging'}`],
        }),
      ],
    });

    // * create log group for backend api gateway logs
    const prdLogGroup = new LogGroup(this, 'ng-backend-log-group', {
      removalPolicy,
      logGroupName: `ng-backend-log-group${isProd ? '' : '-staging'}`,
    });

    const api = new LambdaRestApi(
      this,
      `ng-backend-api-gateway${isProd ? '' : '-staging'}`,
      {
        handler: functions[`jngpaypal${isProd ? '' : '-staging'}`],
        proxy: false,
        deployOptions: {
          stageName: '',
          metricsEnabled: true,
          loggingLevel: MethodLoggingLevel.INFO,
          accessLogFormat: AccessLogFormat.jsonWithStandardFields(),
          accessLogDestination: new LogGroupLogDestination(prdLogGroup),
        },
        policy: apiResourcePolicy,
        defaultCorsPreflightOptions: {
          allowCredentials: true,
          allowOrigins: [process.env.ORIGIN as string],
          allowHeaders: ['*'],
          allowMethods: ['POST'],
        },
      }
    );

    const basePath = api.root.addResource('api');
    functionNames.forEach((name: string) => {
      const nameLowerCased = name.toLowerCase();
      const slashApiSlashNameRoutes = basePath.addResource(nameLowerCased); // * this makes routes like: /api/auth, /api/lambdaa, or /api/lambdab
      const slashApiSlashNameSlashProxyPlus =
        slashApiSlashNameRoutes.addResource('{proxy+}'); // * this makes routes like: /api/auth/{proxy+}, etc.;

      // * now add all RESTful verbs  to both routes that we made
      ['POST'].forEach((m: string) => {
        slashApiSlashNameRoutes.addMethod(
          m,
          new LambdaIntegration(functions[nameLowerCased])
        ); // * now add all RESTful verbs

        slashApiSlashNameSlashProxyPlus.addMethod(
          m,
          new LambdaIntegration(functions[nameLowerCased])
        ); // * now add all RESTful verbs
      });
    });

    // * add contact route
    const contactRoutes = basePath.addResource(contactFunctionNameLowercased);
    contactRoutes.addMethod('POST', new LambdaIntegration(contactLambda));
  }
}
