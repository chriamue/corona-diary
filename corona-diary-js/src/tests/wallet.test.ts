import { Wallet } from '../wallet';

test('sing', async () => {

    const aliceWallet = new Wallet();
    const bobWallet = new Wallet();

    await aliceWallet.generate();
    await bobWallet.generate();

    expect(aliceWallet.getPrivateKey() == bobWallet.getPrivateKey()).toBeFalsy();

    const alicePubKey = aliceWallet.getPublicKey();

    const aliceMessage = 'Hello Bob!';
    const aliceSignedMessage = await aliceWallet.sign(aliceMessage);

    const aliceWalletAtBob = new Wallet();
    aliceWalletAtBob.import(alicePubKey);
    expect(aliceWalletAtBob.verify(aliceMessage, aliceSignedMessage)).toBeTruthy()

})

test('encrypt', async() =>{
    const aliceWallet = new Wallet();
    const bobWallet = new Wallet();

    aliceWallet.generate();
    bobWallet.generate();

    expect(aliceWallet.getPrivateKey() == bobWallet.getPrivateKey()).toBeFalsy();

    const alicePubKey = aliceWallet.getPublicKey();

    const aliceWalletAtBob = new Wallet();
    aliceWalletAtBob.import(alicePubKey);

    const bobMessage = 'Hello Alice!';
    const aliceEncryptedMessage = await aliceWalletAtBob.encrypt(bobMessage);
    const aliceMessage = await aliceWallet.decrypt(aliceEncryptedMessage)
    expect(aliceMessage).toEqual(bobMessage);
})