import { OrderStatus } from "@abdulrehmanz/common";
import mongoose from "mongoose";

interface ProductAttrs {
  id: string;
  price: number;
  title: string;
}

export interface ProductDoc extends mongoose.Document {
  price: number;
  title: string;
  isReserved(): Promise<boolean>;
}

interface ProductModal extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    title: {
      type: String,
      required: true,
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

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product({
    _id: attrs.id,
    price: attrs.price,
    title: attrs.title,
  });
};

productSchema.methods.isReserved = async function () {
  const existingOrder = await Product.findOne({
    product: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

export const Product = mongoose.model<ProductDoc, ProductModal>(
  "Product",
  productSchema
);
