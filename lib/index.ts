// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface CdkKeyPairProps {
  // Define construct properties here
}

export class CdkKeyPair extends Construct {

  constructor(scope: Construct, id: string, props: CdkKeyPairProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkKeyPairQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
