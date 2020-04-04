import dotenv from "dotenv";
import fetch from 'node-fetch';
import { Base64 } from 'js-base64';
import { Wallet } from 'corona-diary';

dotenv.config();
const PORT = process.env.PORT || 5000;

test('authentification', async () => {
    const aliceWallet = new Wallet();

    await aliceWallet.generate();

    const alicePubKey = aliceWallet.getPublicKey();
    const timestamp = Date.now().toString();
    const signature = await aliceWallet.sign(`${alicePubKey}${timestamp}`)

    const alicePubKeyB64 = Base64.encode(alicePubKey);
    const timestampB64 = Base64.encode(timestamp);
    const signatureB64 = Base64.encode(signature);


    console.log(alicePubKeyB64, timestampB64, signatureB64)

    await fetch(`http://localhost:${PORT}/api/v1/authentificate/${alicePubKeyB64}/${timestampB64}/${signatureB64}`, { method: 'GET' })
        .then(res => res.json())
        .then(json => console.log(json));
})
