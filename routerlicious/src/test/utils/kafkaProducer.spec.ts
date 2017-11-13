import * as assert from "assert";
import { kafkaProducer } from "../../utils";

class TestProducer extends kafkaProducer.Producer {
    public sentSizes: number[] = [];

    public close(): Promise<void> {
        return Promise.resolve();
    }

    protected sendCore(key: string, messages: kafkaProducer.IPendingMessage[]) {
        this.sentSizes.push(messages.length);
    }

    protected canSend(): boolean {
        return true;
    }
}

describe("Routerlicious", () => {
    describe("Utils", () => {
        const key = "document";
        let producer: TestProducer;

        beforeEach(() => {
            producer = new TestProducer();
        });

        describe("Producer", () => {
            describe(".send()", async () => {
                it("Should batch incoming messages", async () => {
                    const sendCount = 100;
                    for (let i = 0; i < sendCount; i++) {
                        producer.send("Hello", key);
                    }

                    return new Promise((resolve, reject) => {
                        setImmediate(() => {
                            assert.equal(producer.sentSizes.length, 1);
                            assert.equal(producer.sentSizes[0], sendCount);
                            resolve();
                        });
                    });
                });
            });

            describe(".close()", () => {
                it("Should close the producer", async () => {
                    await producer.close();
                });
            });
        });
    });
});
