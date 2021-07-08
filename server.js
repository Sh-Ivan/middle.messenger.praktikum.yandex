const express = require('express');
const Bundler = require('parcel-bundler');

const app = express();

app.use(express.static(__dirname + '/dist'));

const file = 'static/index.html';
const bundlerOptions = { production: process.env.NODE_ENV === 'production' };

const bundler = new Bundler(file, bundlerOptions);

app.use(bundler.middleware());

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/dist/index.html');
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
