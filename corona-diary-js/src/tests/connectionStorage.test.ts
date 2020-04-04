import { ConnectionStorageMemory } from '../storage/connectionStorageMemory';
import { Wallet } from '../wallet';

test('storage', async () => {
    const storage = new ConnectionStorageMemory();

    const aliceWallet = new Wallet();
    const bobWallet = new Wallet();
    const carolWallet = new Wallet();

    await aliceWallet.generate();
    await bobWallet.generate();
    await carolWallet.generate();

    const alicePubKey = aliceWallet.getPublicKey();
    const bobPubKey = bobWallet.getPublicKey();
    const carolPubKey = carolWallet.getPublicKey();

    const bobWalletAtAlice = new Wallet();
    bobWalletAtAlice.import(bobPubKey);

    const carolWalletAtAlice = new Wallet();
    carolWalletAtAlice.import(carolPubKey);

    const message = 'infected';

    storage.addConnection(
        bobPubKey, await bobWalletAtAlice.encrypt({
            message,
            pubKey: alicePubKey
        }), await aliceWallet.sign(message)
    )

    storage.addConnection(
        carolPubKey, await carolWalletAtAlice.encrypt({
            message,
            pubKey: alicePubKey
        }), await aliceWallet.sign(message)
    )

    expect(storage.connections.length).toBe(2);
    expect((await storage.getConnections(bobPubKey)).length).toBe(1);

    const bobConnection = (await storage.getConnections(bobPubKey))[0];
    const bobData = JSON.parse(await bobWallet.decrypt(bobConnection.data))
    const bobPubKeyAlice = bobData.pubKey;
    expect(bobPubKeyAlice).toEqual(alicePubKey);
    expect(bobData.message).toEqual(message);

    const aliceWalletAtBob = new Wallet();
    aliceWalletAtBob.import(alicePubKey);
    
    expect(aliceWalletAtBob.verify(message, bobData.signature));
})