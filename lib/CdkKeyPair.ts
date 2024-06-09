import { CustomResource } from "aws-cdk-lib";
import { AnyPrincipal, ManagedPolicy, Role } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Provider } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import path = require("path");

/**
 * Custom resource to generate a RSA-2048 Key Pair
 */
export class PaperscapeKeyPair extends Construct {
    public publicKeyValue: string;
    public privateKeyValue: string;

    public constructor(scope: Construct, id: string) {
        const customResourceRole = new Role(scope, 'CustomResourceRole', {
            assumedBy: new AnyPrincipal(),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
            ],
        });

        const generateKeyPairLambda = new NodejsFunction(scope, 'GenerateKeyPairLambda', {
            functionName: `${id}-generate-key-pair`,
            runtime: Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: path.join(__dirname, 'generateKeyPairHandler.ts'),
            logGroup: new LogGroup(scope, 'GenerateKeyPairLambdaLogs', {
                retention: RetentionDays.ONE_DAY,
            }),
        });

        const provider = new Provider(scope, 'GenerateKeyPairProvider', {
            onEventHandler: generateKeyPairLambda,
            role: customResourceRole,
            
        });

        const getPublicKeyResource = new CustomResource(scope, 'GenerateKeyPairResource', {
            serviceToken: provider.serviceToken,
            properties: {}
        });
               
        super(scope, id);

        this.publicKeyValue = getPublicKeyResource.getAttString('publicKey');
        this.privateKeyValue = getPublicKeyResource.getAttString('privateKey');
    }
}