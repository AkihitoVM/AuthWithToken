const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const signup = require('./routes/signup')
const signin = require('./routes/signin')
const logout = require('./routes/logout')
const info = require('./routes/info')
const latency = require('./routes/latency')
const home = require('./routes/home')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use("/",       home)
app.use("/signup", signup)
app.use("/signin", signin)
app.use("/logout", logout)
app.use("/info",   info)
app.use("/latency",latency)


async function start() {
  try {
    await mongoose.connect(process.env.MongoDBUri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    console.log(`MongoDB Connected: ${process.env.MongoDBUri}`);
    app.listen(process.env.PORT, () => {
      console.log(`Server running at ${process.env.PORT} port`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()
