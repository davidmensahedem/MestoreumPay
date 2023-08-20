const express = require("express");
const app = express();
const cors = require("cors");
const transactionRoutes = require("./routes/transaction");
const port = 3042;

app.use(cors());
app.use(express.json());

app.use("/api/v1",transactionRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});


