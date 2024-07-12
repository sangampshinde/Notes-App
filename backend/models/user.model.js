
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
fullName:{type: 'string'},
email:{type: 'string'},
password:{type: 'string'},
createdOn:{type:Date, default: new Date().getTime()},
});


module.exports = mongoose.model('User', userSchema);