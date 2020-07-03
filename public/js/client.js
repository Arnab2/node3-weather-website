

console.log('Client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
  response.json().then((data)=>{
    console.log(data)
  })
})


const weatherForm=document.querySelector('form')
const saerchElement=document.querySelector('input')
const messageOne=document.querySelector('#message-1')

const messageTwo=document.querySelector('#message-2')
const image=document.querySelector("#image")

weatherForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const location=saerchElement.value
  messageOne.textContent='loading...'
  messageTwo.textContent=''

//('http://localhost:3000/weather?address='+location')

  fetch('/weather?address='+location).then((response)=>{
  response.json().then((data)=>{
    if(data.error)
   messageOne.textContent=data.error
  else
  {const icon=data.icon
   const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
   messageOne.textContent="The Temparature in "+location+" is "+data.temp+" digree "
   messageTwo.textContent="Weather is "+data.weather 
   image.src=imgUrl
   image.style.width="100px"
}
    })
})
})