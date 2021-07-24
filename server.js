const express = require('express');
const Bundler = require('parcel-bundler');
const path = require('path');

const app = express();
const PORT = 3000;
const file = 'static/index.html';
const bundlerOptions = { production: process.env.NODE_ENV === 'production' };
const bundler = new Bundler(file, bundlerOptions);

app.use(express.static(path.join(__dirname, '/dist')));
app.use(bundler.middleware());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
