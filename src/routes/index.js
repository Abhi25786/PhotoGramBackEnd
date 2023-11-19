const express = require('express')
const  rootRouter = express.Router()

const users = require('./users_route/users.route')

rootRouter.use('/',users)

module.exports = rootRouter