const express = require('express');
const cors = require('cors');
const app = express();
const { Op, sequelize, Client, Task } = require('./models');

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.listen(1337, () => {
    console.log('the server is listening on port 1337')
})
