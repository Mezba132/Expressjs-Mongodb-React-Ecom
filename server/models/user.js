const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
      name : String,
      email: {
            type: String,
            required: true,
            index: true
      },
      role: {
            type: String,
            default: 'subscriber'
      },
      address : String,
      cart: {
            type: Array,
            default: []
      },
      // wishlist: [{
      //       type: ObjectId,
      //       ref: 'product'
      // }]
},{
      timestamps: true
})

module.exports = mongoose.model('User', userSchema)