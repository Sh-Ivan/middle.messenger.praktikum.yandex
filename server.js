const express = require('express');

const app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/static/index.html');
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
