const express = require('express');
const app = express();

require('./db/conn');
const User = require('./model/userSchema');
const Course = require('./model/courseSchema');
app.use(express.json());
app.use(require('./router/auth'));
app.use(require('./router/courseAuth'));


app.get('/', (req,res) => {
    res.send(`Hi`);
})

app.get('/register', (req,res) => {
    
    res.send(`Hi`);
})
app.get('/login', (req,res) => {
    res.send(`Hi`);
})

app.listen(5000, () =>{
    console.log(`server is running at`)
})