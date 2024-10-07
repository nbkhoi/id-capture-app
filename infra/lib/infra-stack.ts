import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as config from 'config';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const staticWebsiteBucket = new s3.Bucket(this, 'StaticWebsiteBucket', {
      bucketName: `${config.get('staticWebsite.bucketName')}`,
      versioned: true,
      removalPolicy: config.get('removalPolicy'),
      autoDeleteObjects: true,
      websiteIndexDocument: 'index.html',
      //Block all public access: off
      blockPublicAccess: new s3.BlockPublicAccess({ blockPublicAcls: false, blockPublicPolicy: false, ignorePublicAcls: false, restrictPublicBuckets: false }),
    });
    staticWebsiteBucket.grantPublicAccess();
  }
}
