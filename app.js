//jshint esversion:6
const express=require('express');
var bodyparser = require('body-parser')

let items=["Play Valorant"];
let workItems=[];

const app=express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
    let today=new Date();
    let option = {
        weekday:"long",day:"2-digit",month:"long"
    }
    let day=today.toLocaleDateString("en-US",option);
    res.render('list', {ListTitle: day, newListItems:items});

});
app.post("/",function(req,res){
 
    let item= req.body.newItem;
    if(req.body.list==="work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
    items.push(item);
    res.redirect("/")
    }
});
app.get("/work",function(req,res){
    res.render('list', {ListTitle: "Work List", newListItems:workItems});
})
app.post("/work",function(req,res){
 let item =req.body.newItem;
 workItems.push(item);
 res.redirect("/work");
})

app.listen(process.env.PORT||3000,function(){
    console.log("server is up and working");
});
