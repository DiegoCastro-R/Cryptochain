import express, { Request, Response } from 'express';

import { Blockchain } from "./blockchain";

//* Create a new express application instance
const app = express()
app.use(express.json())

const blockchain = new Blockchain();

app.get('/api/blocks', (req: Request, res: Response) => {
    res.json(blockchain.chain);
})

app.post('/api/mine', (req: Request, res: Response) => {
    const block = blockchain.addBlock({ data: req.body.data });

    res.redirect('/api/blocks');
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})