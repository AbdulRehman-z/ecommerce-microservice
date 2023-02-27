import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS _client before connecting");
    }
    return this._client;
  }

  connect(clientId: string, clusterId: string, url: string): Promise<void> {
    this._client = nats.connect(clientId, clusterId, {
      url: url,
    });
    return new Promise((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this._client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
