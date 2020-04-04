import { Base64 } from 'js-base64';
import { Router } from "express";
import { Wallet } from "corona-diary";
import { instance as storage } from './connectionStoragePG';

const router = Router();

function authentificate(pubKey: string, timestamp: string, signature: string) {
    const wallet = new Wallet();
    wallet.import(pubKey);
    const data = pubKey + timestamp;
    return wallet.verify(data, signature);
}

router.get('/authentificate/:pubKey/:timestamp/:signature', (req, res) => {
    const pubKey = Base64.decode(req.params.pubKey);
    const timestamp = Base64.decode(req.params.timestamp);
    const signature = Base64.decode(req.params.signature);
    if (authentificate(pubKey, timestamp, signature)) {
        res.json(pubKey);
    } else {
        res.status(401).send();
    }
});

router.post('/connection/:pubKey/:timestamp/:signature', async (req, res) => {
    const pubKey = Base64.decode(req.params.pubKey);
    const timestamp = Base64.decode(req.params.timestamp);
    const auth_signature = Base64.decode(req.params.signature);
    if (authentificate(pubKey, timestamp, auth_signature)) {
        const { pubkey, data, signature } = req.body;
        console.log('equals ', pubKey, pubkey, pubKey == pubkey);
        await storage.addConnection(pubkey, data, signature);
        res.send();
    } else {
        res.status(401).send();
    }
});

router.get('/connections/:pubKey/:timestamp/:signature', async (req, res) => {
    const pubKey = Base64.decode(req.params.pubKey);
    const timestamp = Base64.decode(req.params.timestamp);
    const auth_signature = Base64.decode(req.params.signature);
    if (authentificate(pubKey, timestamp, auth_signature)) {
        const connections = await storage.getConnections(pubKey);
        console.log(connections);
        res.json(connections);
    } else {
        res.status(401).send();
    }
});

router.get('/info', async (req, res) => {
    const connected = await storage.connected();
    res.send({ 'database_connected': connected });
});


export default router;
