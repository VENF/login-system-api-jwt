import mongoose from 'mongoose'
module.exports = {
    connectDB: () => {
        mongoose.connect('mongodb://localhost/login', {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
        })
            .then(db => console.log('DB is connected'))
            .catch(err => console.log(err))
    }
}