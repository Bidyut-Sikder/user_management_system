const mongoose = require('mongoose')


const customerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
  
    },

    email: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
}, {
    timestamps: true,
    versionKey: false
})

const CustomerModel = mongoose.model('customers', customerSchema)

module.exports = CustomerModel;















