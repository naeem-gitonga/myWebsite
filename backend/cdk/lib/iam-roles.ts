import {
  PolicyStatement,
} from 'aws-cdk-lib/aws-iam';

export const policyStatementJng = new PolicyStatement({
    sid: 'S3GetObjectJng',
    actions: ['s3:GetObject', 's3:PutObject', 's3:ListBucket'],
    resources: [
        'arn:aws:s3:::jahanaeemgitongawebsite',
        'arn:aws:s3:::jahanaeemgitongawebsite/*',
    ],
});

export const policyStatementRb = new PolicyStatement({
    sid: 'S3GetObject',
    actions: ['s3:GetObject', 's3:PutObject', 's3:ListBucket'],
    resources: ['arn:aws:s3:::rapidbackend', 'arn:aws:s3:::rapidbackend/*'],
});

export const s3Permission = new PolicyStatement({
    actions: ['s3:PutObject'],
    resources: ['arn:aws:s3:::gtng/*orders/*'],
});
