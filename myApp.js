require('dotenv').config()

var express = require('express');
var app = express();


app.get("/:word/echo", (req, res) => {
  let word = req.params.word
  
  let jsonObj = {echo: word,echo: word};
  res.send(jsonObj);
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.use(( req, res, next) => {

  let string = `${req.method} ${req.path} - ${req.ip}`
  console.log(string)
  
   next();

});

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

var message= 'Hello json';
app.get("/json", (req, res) => {
  if ( process.env['MESSAGE_STYLE'] === "uppercase") {
      res.json({ "message": message.toUpperCase()  });
  }
  else {
    res.json({ "message": message });
  }    
});




































 module.exports = app;
