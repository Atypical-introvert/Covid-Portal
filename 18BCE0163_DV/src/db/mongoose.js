const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://covidstation:0802_mehtafamilY@cluster0.w0kq8.mongodb.net/covidstation?retryWrites=true',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB connection Successful!')
}).catch(()=>{
    console.log('DB connection Unsuccessful!')
})