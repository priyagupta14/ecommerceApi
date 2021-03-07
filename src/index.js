const express = require('express');
const env = require('dotenv');
const { healthRouter, inventoryRoute } = require('./routes');

const app = express();
env.config();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/health', healthRouter);
app.use('/inventory', inventoryRoute);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
