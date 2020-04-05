//import RSA from 'node-rsa';
import { RSA } from 'react-native-rsa-native';

export class Wallet {

    bits: number = 1024;
    privateKey: string = '';
    publicKey: string = '';

    constructor() {
    }

    generate() {
        RSA.generateKeys(this.bits).then(keys => {
            this.privateKey = keys.private;
            this.publicKey = keys.public;
        })
    }

    import(publicKey: string) {
        this.publicKey = publicKey;
    }

    async encrypt(data: any) {
        return RSA.encrypt(data, this.publicKey);
    }

    async decrypt(data: any) {
        return RSA.decrypt(data, this.privateKey);
    }

    async sign(data: any) {
        return RSA.sign(data, this.privateKey);
    }

    async verify(data: any, signature: any) {
        return RSA.verify(data, signature, this.publicKey);
    }

    getPublicKey() {
        return this.publicKey;
    }

    getPrivateKey() {
        return this.privateKey;
    }

}