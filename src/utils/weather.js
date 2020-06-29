const request=require('request')

const getWeather=(address,callback)=>{
const url='https://api.openweathermap.org/data/2.5/weather?q='+address+'&appid=1a88a677f1b296d2e3691f9f25f639c8&units=metric';
request({url:url , json:true},(err,res)=>{
    if(err)
    callback(" unable to connect to internet",undefined)
    else if(res.body.cod==="400")
    callback('Empty Address',undefined)
    else if(res.body.cod!=200)
    callback('Invalid Address',undefined)
    else
    callback(undefined,{
        city:res.body.name,
       temparature:res.body.main.temp,
       desc:res.body.weather[0].description 
    })

})
}
module.exports = getWeather