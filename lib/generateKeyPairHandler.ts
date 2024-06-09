import { CdkCustomResourceHandler } from 'aws-lambda';
import { generateKeyPairSync } from 'crypto';

export const handler: CdkCustomResourceHandler = async (event: any) => {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    return {
        Data: {
            publicKey,
            privateKey
        }
    };
}
