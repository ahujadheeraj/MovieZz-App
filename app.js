var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");
app.use(express.static("public"));

var port = process.env.PORT || 2200;

app.get("/",function(req,res){
    res.render("homepage");
})

app.get("/movie",function(req,res){
    var query = req.query.search;
    //http://www.omdbapi.com/?s=frozen&apikey=thewdb
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url,function(error,response,body){
        var Pdata = JSON.parse(body);
        if(error){
            res.send("404 notfound!!")
        }
        if(!error && response.statusCode == 200){
            res.render("movies",{data:Pdata});
        }
    });
});

app.listen(port,function(req,res){
    console.log("Movie Search Started!!!");
})
