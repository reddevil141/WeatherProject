const express=require('express');
const app=express();
const https=require('https');
var bodyParser=require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
  res.sendFile(__dirname +"/index.html");
})
app.post("/",function(req,res){
  const querry=req.body.cityName;
  const apiKey="5c7e96e211c77d2c9a432ebe3245a93e";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&appid=" + apiKey + "&units=metric"

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      console.log(temp);
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<p>Weather is likely to be "+weatherDescription+"<p>");
      res.write("<h1>Temperature in " + querry + " is " + temp + "  Degree Celsius</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  })
})


app.listen(process.env.PORT || 3000,function(){
  console.log("Server started at port 3000");
})
