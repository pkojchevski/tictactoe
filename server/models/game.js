// Using Node.js `require()`
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    users:{
        type:{playerOne: String, playerTwo: String}
    },
    winner:{type: String},
    ongoing: {type:Boolean, required: true},
    finished: {type:Boolean, required: true},
    noOfUsers:{
        type:Number,
        required:true
    }
});

const Game = mongoose.model('Game' , GameSchema);
module.exports = Game;