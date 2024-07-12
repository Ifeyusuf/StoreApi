const mongoose = require("mongoose")


const productSchema = new mongoose.Schema( {
    name: {
        type: String,
        require: true,
    },

    price: {
        type: Number,
        require: true
    },

    featured: {
        type: Boolean,
        default: false,
    },

    rating: {
        type: Number,
        default: 4.5
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },

    company: {
        type: String,
        enum: {
            values: [ "liddy", "marcos", "ikea", "caressa" ],
            msg: " {VALUE} No name with such company found "
        }
    }
})

module.exports = mongoose.model("Product", productSchema)