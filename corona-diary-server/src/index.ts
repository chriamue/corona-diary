import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import apiV1 from './apiv1';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Corona Diary Server')
})

app.use('/api/v1', apiV1);

app.listen(PORT, () => {
    console.log("server started on port: ", PORT);
})