const request=require('request');

const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXJuYWI4IiwiYSI6ImNrYnRwYjkxdTBid3kyeG92cTc2ZjZqNjkifQ.hnaxrG8H-woLUrQb2C6YyA&limit=1'
    request({url:url , json:true},(err,res)=>{
        if(err)
        callback('Network is disabled',undefined)
        else if(res.body.message)
        callback('bad tokens in address',undefined)
        else if(res.body.features.length===0)
        callback('location invalid',undefined)
        else
        callback(undefined,{
            latitude:res.body.features[0].center[0],
            longitude:res.body.features[0].center[1],
            location:res.body.features[0].place_name
        })
    })
    }

    module.exports = geoCode;