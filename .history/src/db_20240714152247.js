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
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect success')

        let cars = await carsModel.find();

        console.log(cars);

        res.send(cars);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

})

//== Add 
app.post('/add_car', async (req, res) => {
    try {
        await mongoose.connect(uri);
        const data = req.body;
        const newCar = new carsModel(data);
        const result = await newCar.save();
        res.json(result);

    } catch (err) {
        res.status(500).send(err);
    }
})



// //DELETE ONE 
app.delete('/delete_car/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await carsModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send('Car not found');
        }

        res.json({ message: 'Car deleted successfully', deletedCar });
    } catch (error) {
        res.status(500).send(error);
    }
})



//=====Update  
app.put('/update_car/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const options = { new: true };

        const updateCar = await carsModel.findByIdAndUpdate(id, updateData, options);

        if (!updateCar) {
            return res.status(404).send('Car not found');
        }

        res.json(updateCar);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
module.exports = app;