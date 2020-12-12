const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

// Setup empty JS object to act as endpoint for all routes
const projectData = [];

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;

const server = app.listen(port,running);

// Callback function
function running () {
    
    console.log('server running');  
    console.log(`running on localhost: ${port}`);
}

// get route
app.get('/all', getData)
function getData (req, res) {
    res.send(projectData);
    console.log(projectData)
  };
  
//post route 
app.post('/post',postData)
function postData (req,res){
    console.log(req.body);
    newData = {
        date: req.body.date,    
        temp: req.body.temp,
        response: req.body.content
    }
    projectData.push(newData)
    
}



