require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("./db/connection");
const Products = require('./models/productsSchema');
const cookieParser = require('cookie-parser')

const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require('./routes/router');

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

port = 8000;

app.listen(port, ()=>{
    console.log(`Server is running at port number ${port}`);
});

DefaultData();
