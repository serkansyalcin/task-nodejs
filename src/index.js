import express from "express";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public'))


const PORT =  5000;
app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
