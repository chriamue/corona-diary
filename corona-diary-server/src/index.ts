import dotenv from "dotenv";
import express from "express";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import bodyParser from "body-parser";

import apiV1 from './apiv1';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

try {
    var doc = yaml.safeLoad(fs.readFileSync('docs/swagger.yaml', 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
} catch (e) {
    console.log(e);
}

app.get('/', (req, res, next) => {
    res.send('Corona Diary Server')
})

app.use('/api/v1', apiV1);

app.listen(PORT, () => {
    console.log("server started on port: ", PORT);
})