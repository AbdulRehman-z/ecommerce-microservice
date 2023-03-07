import { OrderStatus } from "@abdulrehmanz/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ProductAttrs {
  id: string;
  price: number;
  title: string;
  version: number;
}

export interface ProductDoc extends mongoose.Document {
  price: number;
  title: string;
  version: number;
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

productSchema.set("versionKey", "version");
productSchema.plugin(updateIfCurrentPlugin);

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
