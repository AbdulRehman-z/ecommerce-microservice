import { Safepay } from "@sfpy/node-sdk";
import { Environment } from "@sfpy/node-sdk/dist/utils";

const safepay = new Safepay({
  environment: Environment.Sandbox,
  apiKey: process.env.SAFEPAY_KEY!,
  v1Secret: process.env.SAFEPAY_V1_SECRET!,
  webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET!,
});

export { safepay };
