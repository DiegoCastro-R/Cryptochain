import express, { Request, Response } from 'express';

import { Blockchain } from "./blockchain";
import PubSub from './pubsub';

//* Create a new express application instance
const app = express()
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain })

setTimeout(() => pubsub.broadcastChain(), 1000)

app.use(express.json());


app.get('/api/blocks', (_req: Request, res: Response) => {
    res.json(blockchain.chain);
})

app.post('/api/mine', (req: Request, res: Response) => {
    blockchain.addBlock({ data: req.body.data });
    pubsub.broadcastChain();
    res.redirect('/api/blocks');
})

const DEFAULT_PORT = 3000
let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})