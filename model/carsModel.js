const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Cars = new Schema({
    ten:{
        type:String,
        require:true
    },
    namSX:{
        type:Number,
        require:true
    },
    hang:{
        type:String,
        require:true
    },
    gia:{
        type:Number ,
        require:true
    },
},{
    timestamps:true
})

module.exports = mongoose.model('car',Cars)