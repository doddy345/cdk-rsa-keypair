# CdkKeyPair

Provides a custom resource for generating RSA-2048 key pairs at deploy-time, within a cdk stack.

This is useful where you need an public/private key value at deploy time. For example CloudFront [signed urls](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html) require a public key. 

Using this construct ensures no secrets are included in the CloudFormation template; they are all generated at deploy-time.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
