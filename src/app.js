const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const getWeather=require('./utils/weather')
const { unwatchFile } = require('fs')
// define paths for Express Config
const pathh=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//set up handlebars engine and views location  
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('/',(req,res)=>{
    res.render('index',{title:'Weather', name:"Arnab"})
   })
app.use(express.static(pathh)) 
// app.get('',(req,res)=>{   
//     res.send('hello express') 
// })

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help', name:"Arnab",message:'I will help you '})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'about me', name:'Arnab dash'})
})

app.get('/weather',(req,res)=>{
    if(req.query.address===undefined)
    return res.send({
        error:'Enter some adrress'
    })

    geoCode(req.query.address,(err,data)=>{
        if(err)
        res.send({
            error:err
        })
    else{
        getWeather(req.query.address,(error,weatherData)=>{
            if(error)
            res.send({
                error:error
            })
            else{
                res.send({
                    latitude:data.latitude,
                    longitude:data.longitude,
                    place:data.location,
                    weather:weatherData.desc,
                    temp:weatherData.temparature 
                })
            }
        })
    }
    
    })
    
})

app.get('/products',(req,res)=>{
    if(req.query.search===undefined)
    return res.send('<h1>Search by product name</h1>')
     console.log(req.query.name)
     console.log(req.query)
        res.send({
            products:['cars']
        })  
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{title:'404',message:'Help Article Not Found',name:'Arnab'})
})

app.get('*',(req,res)=>{
    res.render('404',{title:'404',message:'Page Not Found',name:'Arnab'})
})

app.listen(3000,()=>{
    console.log("server is up on port 3000")
})
