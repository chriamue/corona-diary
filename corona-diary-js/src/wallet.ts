import RSA from 'node-rsa';

export class Wallet {

    bits: number = 1024;
    key = new RSA();

    constructor() {
    }

    generate() {
        this.key.generateKeyPair(this.bits)
    }

    import(keyData: string) {
        this.key = new RSA(keyData);
    }

    async encrypt(data: any) {
        return this.key.encrypt(data, 'base64');
    }

    async decrypt(data: any) {
        return this.key.decrypt(data, 'utf8');
    }

    async sign(data: any) {
        return this.key.sign(data, 'base64');
    }

    async verify(data: any, signature: any) {
        return this.key.verify(data, signature);
    }

    getPublicKey() {
        return this.key.exportKey('pkcs1-public-pem');
    }

    getPrivateKey() {
        return this.key.exportKey('pkcs1-pem');
    }

}
