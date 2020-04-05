import dotenv from "dotenv";
import axios from "axios";
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

    await axios.get(`http://localhost:${PORT}/api/v1/authentificate/${alicePubKeyB64}/${timestampB64}/${signatureB64}`)
        .then(res => console.log(res.data));
})

test('post connection', async () => {
    const aliceWallet = new Wallet();
    const bobWallet = new Wallet();

    await aliceWallet.generate();
    await bobWallet.generate();

    const alicePubKey = aliceWallet.getPublicKey();
    const bobPubKey = bobWallet.getPublicKey();

    const bobWalletAtAlice = new Wallet();
    bobWalletAtAlice.import(bobPubKey);

    const timestamp = Date.now().toString();
    const auth_signature = await aliceWallet.sign(`${alicePubKey}${timestamp}`)

    const alicePubKeyB64 = Base64.encode(alicePubKey);
    const timestampB64 = Base64.encode(timestamp);
    const signatureB64 = Base64.encode(auth_signature);

    const message = 'infected';

    const data = await bobWalletAtAlice.encrypt({
        message,
        pubkey: alicePubKey
    })

    const signature = await aliceWallet.sign(data)

    const body = {
        pubkey: bobPubKey,
        data,
        signature
    }

    await axios.post(`http://localhost:${PORT}/api/v1/connection/${alicePubKeyB64}/${timestampB64}/${signatureB64}`,
        body)
        .then(res => console.log(res.data));
})

test('get connections', async () => {
    const aliceWallet = new Wallet();
    const bobWallet = new Wallet();

    await aliceWallet.generate();
    await bobWallet.generate();

    const alicePubKey = aliceWallet.getPublicKey();
    const bobPubKey = bobWallet.getPublicKey();

    const bobWalletAtAlice = new Wallet();
    bobWalletAtAlice.import(bobPubKey);

    const timestamp = Date.now().toString();

    const aliceAuth_signature = await aliceWallet.sign(`${alicePubKey}${timestamp}`)
    const bobAuth_signature = await bobWallet.sign(`${bobPubKey}${timestamp}`)

    const alicePubKeyB64 = Base64.encode(alicePubKey);
    const bobPubKeyB64 = Base64.encode(bobPubKey);
    const timestampB64 = Base64.encode(timestamp);
    const aliceSignatureB64 = Base64.encode(aliceAuth_signature);
    const bobSignatureB64 = Base64.encode(bobAuth_signature);

    const message = 'infected';

    const data = await bobWalletAtAlice.encrypt({
        message,
        pubkey: alicePubKey
    })

    const signature = await aliceWallet.sign(data)

    const body = {
        pubkey: bobPubKey,
        data,
        signature,
        timestamp
    }

    console.log(alicePubKeyB64)
    console.log(timestampB64)
    console.log(aliceSignatureB64)

    console.log(JSON.stringify(body))

    await axios.post(`http://localhost:${PORT}/api/v1/connection/${alicePubKeyB64}/${timestampB64}/${aliceSignatureB64}`,
        body)
        .then(res => console.log(res.data));

        console.log(bobPubKeyB64,timestampB64,bobSignatureB64)

    await axios.get(`http://localhost:${PORT}/api/v1/connections/${bobPubKeyB64}/${timestampB64}/${bobSignatureB64}`)
        .then(res => console.log(res.data));
})