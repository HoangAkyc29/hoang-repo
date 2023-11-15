import mongoose from "mongoose";
const mongoose_delete = require('mongoose-delete');

const productSchema = new mongoose.Schema({
    IDSupplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    IDCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    type: { type: String, required: true, length: 20 },
    nameProduct: { type: String, required: true, length: 50 },
    pictureLinks: [{ type: String }],
    description: { type: String, required: true },
    color: [{ type: String, required: true, length: 20 }],
    size: [{ type: String, required: true, length: 20 }],
    price: { type: Number, required: true },
    quantity: {type: Number, required: true, min: 1, default: 1},
    rating: {type: Number, required: true, min: 0, max: 5, default: 0}
}, { timestamps: true });

productSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Product = mongoose.model('Product', productSchema);
export default Product;
    