import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Base64 } from 'js-base64';
import { RSA } from 'react-native-rsa-native';

export async function loadPubkey(component: React.Component) {
    try {
        const pubkey = await AsyncStorage.getItem('@pubkey')
        component.setState({ pubkey });
    } catch (e) {
        console.log(e);
    }
}

export class Wallet {

    bits: number = 2048;
    privateKey: string = '';
    publicKey: string = '';

    constructor() {
    }

    async generate() {
        return RSA.generateKeys(this.bits).then(keys => {
            this.privateKey = keys.private;
            this.publicKey = keys.public;
            console.log(keys)
        })
    }

    import(publicKey: string) {
        this.publicKey = publicKey;
    }

    async encrypt(data: any) {
        const dataString = JSON.stringify(data);
        const encryptedString = await RSA.encrypt(dataString, this.publicKey);
        return encryptedString;
    }

    async decrypt(data: string) {
        const dataString = data;
        const decodedString = await RSA.decrypt(dataString, this.privateKey);
        return JSON.parse(decodedString);
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