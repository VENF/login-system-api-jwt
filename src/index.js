import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import Routes from './routes/routes'
import path from 'path'
import { connectDB } from './helpers/db'

const server = express();

//settings
server.set('port', process.env.PORT || 4000)
//data base
connectDB();
//middlewares
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
//routes
server.use('/api', Routes)
//static files
//middleware for vuejs mode history
const history = require('connect-history-api-fallback')
server.use(history())
server.use(express.static(path.join(__dirname, 'public')))
//server
server.listen(server.get('port'), ()=> {
    console.log('server listen on port ' + server.get('port'))
})
