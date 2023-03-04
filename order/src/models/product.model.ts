import mongoose from "mongoose";

interface ProductAttrs {
  price: number;
  title: string;
}

export interface ProductDoc extends mongoose.Document {
  price: number;
  title: string;
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
  return new Product(attrs);
};

export const Product = mongoose.model<ProductDoc, ProductModal>(
  "Product",
  productSchema
);
