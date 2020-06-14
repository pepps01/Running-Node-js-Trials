const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '7f1cefa6614e210a65abdb68e8ef9193';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  console.log(city);
  let url = "http://api.openweathermap.org/data/2.5/forecast?id="+city+"&APPID="+apiKey

  request(url, function (err, response, body) {
      if(err){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
                console.log(weather.main);
        } else {
            let weatherText = "It's" +weather.main.temp+ "degrees in" + weather.name+ "!";
            res.render('index', {weather: weatherText, error: null});
            console.log(weather.name);
      }
    }
  });
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})