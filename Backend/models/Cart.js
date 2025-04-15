import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    items: [{ name: String, price: Number, quantity: Number }],
    total: Number,
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;