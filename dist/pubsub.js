"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const CHANNELS = {
    TEST: "TEST"
};
class PubSub {
    publisher;
    subscriber;
    constructor() {
        this.publisher = redis_1.default.createClient();
        this.subscriber = redis_1.default.createClient();
        this.subscriber.subscriber(CHANNELS.TEST);
        this.subscriber.on('message', (channel, message) => {
            this.handleMessage(channel, message);
        });
    }
    handleMessage(channel, message) {
        console.log(`Message received. Channel: ${channel}, Message: ${message}`);
    }
}
const testPubSub = new PubSub();
setTimeout(() => {
    testPubSub.publisher.publish(CHANNELS.TEST, "Hello World");
}, 1000);
