const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    PatientId : {
        type: String,
        required:true,
        trim:true
    },
    ReportedOn : {
        type: Date,
        required : true,
        trim: true,
    },
    Age : {
        type: Number,
        required : true,
    },
    Gender : {
        type:String,
        required: true
    },
    State: {
        type:String,
        required: true
    },
    Status: {
        type:String,
        required: true
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user