const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Backend is working`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
