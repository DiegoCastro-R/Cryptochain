import { Blockchain } from './blockchain'
import PubNub from 'pubnub'
import { v4 as uuid } from 'uuid'

const credentials = {
    uuid: uuid(),
    publishKey: "pub-c-cf0ceff9-2978-4af6-b958-87f28bb03f58",
    subscribeKey: "sub-c-6163d128-bb74-11ec-b4b3-d29fac035801",
    secretKey: "sec-c-NWViMWRmNTYtYjY0MS00NTJhLThiZmMtNTJmZTdiOWEzY2U4",
}

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
}

class PubSub {
    pubnub: PubNub
    blockchain: Blockchain
    constructor({ blockchain }: { blockchain: Blockchain }) {
        this.blockchain = blockchain;
        this.pubnub = new PubNub(credentials)
        this.subscribeToChannels()
        this.pubnub.addListener(this.listener())


    }
    subscribeToChannels() {
        this.pubnub.subscribe({
            channels: Object.values(CHANNELS)
        });
    }

    listener() {
        return {
            message: (messageObject: { channel: any; message: any }) => {
                const { channel, message } = messageObject;

                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
                const parsedMessage = JSON.parse(message);
                if (channel === CHANNELS.BLOCKCHAIN) {
                    this.blockchain.replaceChain(parsedMessage)
                }
            }
        }
    }

    publish({ channel, message }: { channel: string, message: any }) {
        this.pubnub.publish({ channel, message })
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
}


export default PubSub


