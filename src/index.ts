import express, { Request, Response } from 'express';

import { Blockchain } from "./blockchain";

const app = express()
const blockchain = new Blockchain();

app.get('/api/blocks', (req: Request, res: Response) => {
    res.json(blockchain.chain);
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})