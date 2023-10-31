const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const setUpDatabase = require('./src/setupDatabase')


// Routes
const clientRoutes = require('./src/clients/routes')
const productsRoutes = require('./src/products/routes')
const usersRoutes = require('./src/users/routes')
const loginRoutes = require('./src/login/routes')
const billRoutes = require('./src/bills/routes')


const app = express()
const port = process.env.PORT || 8080


app.use(cors());
app.use(express.json())
app.use('/assets', express.static('assets'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/upload', (req, res)=>{
    res.send('File Uploaded Successfully!')
})

app.get('/', (req, res)=>{
    res.send('Home Route')
})

// Create Table Route
app.get('/setup-database', setUpDatabase)

// Use Routes
app.use('/api/v1/clients', clientRoutes)
app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/login', loginRoutes)
app.use('/api/v1/bills', billRoutes)


app.listen(port, ()=>{
    console.log(`Server Running on http://localhost:${port}`)
})