import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ProductAttrs {
  title: string;
  price: number;
  userId: string;
}

interface ProductDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
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
  return new Product(attrs);
};

export const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product as products };
