import crypto from 'crypto';

const cryptoHash = (...inputs: any[]) => {
    const hash = crypto.createHash('sha256');
    const sortedInput = inputs.sort();
    hash.update(sortedInput.join(' '));
    return hash.digest('hex');
}


export { cryptoHash }