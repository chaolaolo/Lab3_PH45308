const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const uri = 'mongodb+srv://chaolaolo:chaolaolo@cluster0.ng1qeww.mongodb.net/AND103'

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
let carsModel = require('../model/carsModel');

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/upload.html');
})


//== Post file 
const multer = require('multer');
const fs = require('fs');
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        let newFileName = fileName;

        cb(null, newFileName);
    }
})

const upload = multer({ storage: _storage });

app.post('/uploadFile', upload.single('myFile'), async (req, res, next) => {
    let file = req.file;
    if (!file) {
        var error = new Error('cannot choose file');
        error.httpStatusCode = 400;
        return next(error);
    }
    let pathFileInServer = file.path;
    console.log(pathFileInServer);
    res.send(file);

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
module.exports = app;