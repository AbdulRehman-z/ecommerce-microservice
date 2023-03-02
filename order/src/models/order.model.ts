import mongoose from "mongoose";

interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: Product;
}

interface ProductDoc extends mongoose.Document {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: Product;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: OrderAttrs): ProductDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    toJSON: {
      transform(ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

export const Order = mongoose.model<ProductDoc, ProductModel>(
  "Order",
  orderSchema
);
