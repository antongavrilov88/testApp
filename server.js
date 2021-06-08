const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.use('/', express.static(`${__dirname}/dist/index.html`));
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(process.env.PORT || 3000);
