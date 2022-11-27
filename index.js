const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const Order = require('./orders');

mongoose.connect(
	'mongodb+srv://admin:deliafime123@cluster0.hxteroj.mongodb.net/?retryWrites=true&w=majority'
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Successfully connnected to DB');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
// poner en public los css y js
app.set('views', path.join(__dirname, '/views'));
// poner en views los htmls
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/hacer-pedidos', (req, res) => {
	res.render('hacer-pedidos');
});

app.post('/pedidos', async (req, res) => {
	const order = new Order(req.body);
	await order.save();
	res.redirect('/ver-pedidos');
});

app.get('/ver-pedidos', async (req, res) => {
	const orders = await Order.find({});
	res.render('ver-pedidos', { orders });
});

app.listen(process.env.PORT, (req, res) => {
	console.log('Listening!');
});
