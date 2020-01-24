const routes = require('express-promise-router')();
import { signUp, dashboard, signin } from '../controllers/authController'
import verify from '../controllers/verify'

//Sign Up
routes.post('/signup', signUp)

//Sign In
routes.post('/signin', signin)

//dashboard
routes.get('/dashboard', verify, dashboard)


module.exports = routes;