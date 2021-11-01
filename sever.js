const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// import cac module khac =)) 
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// Su dung duong dan
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use('/authors', authorRouter) // localhost:3000/authors thi se su dung authorRouter =))
app.use('/books', bookRouter)

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/MyLibrary", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.listen(process.env.PORT || 3000, () => {
    console.log('Sever is listen on port', process.env.PORT || 3000)
})

app.get('/', indexRouter)
