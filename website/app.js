/* Global Variables */
const APIKey = '6f469cb97a99cca85406df3427d46c91&units=metric';

const APIBaseURL = 'http://api.openweathermap.org/data/2.5/weather?APIKEY='+APIKey+'&zip=';
//http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6f469cb97a99cca85406df3427d46c91\

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+d.getMonth()+'.'+ d.getFullYear();

//event listener
document.getElementById('generate').addEventListener('click', clickAction);
//click function
function clickAction(e){
  const zipCode =  document.getElementById('zip').value;
  const userFeeling =  document.getElementById('feelings').value;
 // console.log(userFeeling);
  getWeather(APIBaseURL,zipCode,APIKey)

  .then(function(data){
    // Add data
    console.log(data);
    postData('/post', {date:newDate, temp: data.main.temp, content:userFeeling} );

  //  postData('/post', {date:d, coord: data.coord, weather: data.weather[0], content:userFeeling} );
  })
  .then(function(){
    updateUI()
    })

}
//get data func
const getWeather = async(APIBaseURL , zipCode )=>{
    const res = await fetch(APIBaseURL+zipCode)
    try{
        const data = await res.json ();
        return data;
    }catch(error){
        console.log("error",error);
    }
}

const postData =async(url='',data={})=>{
    console.log(data);
    const response = await fetch (url ,{
        method : 'POST',
        credentials :'same-origin',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(data),
    });
    try{
        const newData= await response.json();
        console.log(newData);
        return newData
    }catch(error){
        console.log("error",error);
    }
}

// update ui
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log(allData);
      document.getElementById('date').innerHTML =`Date: ${allData.date}` ;
      document.getElementById('temp').innerHTML = `Temp: ${allData.temp}` ;
      document.getElementById('content').innerHTML = `Feel: ${allData.response}` ;

    }catch(error){
      console.log("error", error);
    }
  }
  
