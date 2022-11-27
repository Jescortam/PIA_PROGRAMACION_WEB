const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	productName: String,
	quantity: Number,
	unitCost: Number,
	clientName: String,
	clientAddress: String,
});

module.exports = mongoose.model('Order', orderSchema);
