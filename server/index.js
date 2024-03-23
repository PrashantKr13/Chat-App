const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoute);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to Database.");
}).catch((err)=>console.log(err.message));

const server = app.listen(process.env.PORT, ()=>{
    console.log(`The app has started on port ${process.env.PORT}`);
});