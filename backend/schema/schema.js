const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        require:true,
        default:'https://imgv3.fotor.com/images/videoImage/wonderland-girl-generated-by-Fotor-ai-art-generator_2023-05-15-104543_ibow.jpg'
    },
    followers:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }

})

const List = mongoose.model('List',listSchema);
module.exports = List;