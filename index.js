// immport datasservice from service folder

const dataservice =require('./service/dataservice')

// immport jsonwebtoken

const jwt=require('jsonwebtoken')


// import express
const express=require('express')
const { json } = require('express')

// create app
const app=express()


// to convert json data 

app.use(express.json())

//create request

// GET

// app.get('/',(req,res)=>{
//     res.send('GET Method checking ')
// })
// app.post('/',(req,res)=>{
//     res.send('post Method checking')
// })
// app.put('/',(req,res)=>{
//     res.send('put Method checking')
// })
// app.patch('/',(req,res)=>{
//     res.send('patch Method checking')
// })
// app.delete('/',(req,res)=>{
//     res.send('delete Method checking')
// })




// middleware for verify the token



const jwtmiddleware=(req,res,next)=>{
    console.log('router specific middleware');
    try {
        const token=req.headers['accesstoken'];
        const data=jwt.verify(token,"secretkey123");
        console.log(data);
        next();
    }
    catch {
       res.status(422).json( { 
            statusCode:422,
        status :false,
        message:"please login "
    })
    }
}



// request

// register

app.post('/register',(req,res)=>{

   const result= dataservice.register(req.body.acno,req.body.uname,req.body.psw)
   res.status(result.statusCode).json(result)


})

// login

app.post('/login',(req,res)=>{

    const result= dataservice.login(req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)
 
 
 })

//  deposit

app.post('/deposit',jwtmiddleware,(req,res)=>{

    const result= dataservice.deposit(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statusCode).json(result)
 
 
 })

 //  withdraw

app.post('/withdraw',jwtmiddleware,(req,res)=>{

    const result= dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statusCode).json(result)
 
 
 })


//  gettransaction


app.post('/gettransaction',jwtmiddleware,(req,res)=>{

    const result= dataservice.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)
 
 
 })
// setting port

app.listen(3000,()=>{
    console.log('server started at port number 3000');
})