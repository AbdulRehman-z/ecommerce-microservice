import { OrderStatus } from "@abdulrehmanz/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import mongoose from "mongoose";

interface OrderAttr {
  version: number;
  id: string;
  userId: string;
  price: number;
  status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attr: OrderAttr): OrderDoc;
  findByIdAndPrevVersion(event: {
    id: string;
    version: number;
  }): Promise<OrderDoc> | null;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attr: OrderAttr) => {
  return new Order({
    _id: attr.id,
    userId: attr.userId,
    price: attr.price,
    status: attr.status,
  });
};

orderSchema.statics.findByIdAndPrevVersion = async (event) => {
  try {
    return await Order.findOne({
      _id: event.id,
      version: event.version - 1,
    });
  } catch (error) {
    throw error;
  }
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
