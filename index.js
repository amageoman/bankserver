// import cors

const cors=require('cors')

// immport datasservice from service folder

const dataservice =require('./service/dataservice')

// immport jsonwebtoken

const jwt=require('jsonwebtoken')


// import express
const express=require('express')
const { json } = require('express')

// create app
const app=express()


// connect frontend after creating app

app.use(cors({origin:'http://localhost:4200/'}))

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

    dataservice.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
   


})

// login

app.post('/login',(req,res)=>{

    dataservice.login(req.body.acno,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
    
 
 
 })

//  deposit

app.post('/deposit',jwtmiddleware,(req,res)=>{

    dataservice.deposit(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)

    })
 
 
 })

 //  withdraw

app.post('/withdraw',jwtmiddleware,(req,res)=>{

     dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)

     })
 
 
 })


//  gettransaction


app.post('/gettransaction',jwtmiddleware,(req,res)=>{

    dataservice.gettransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)

    })
 
 
 })
// setting port

app.listen(3000,()=>{
    console.log('server started at port number 3000');
})