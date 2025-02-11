const express = require("express");

const app = express();

//adding a method to parse json

app.use(express.json());

var users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}]

app.get("/", function(req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++){
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys, numberOfHealthyKidneys, numberOfUnhealthyKidneys
    })
})

//middlewares
app.post("/",function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })

    res.json({
        message: "Kidney added"
    })

})

app.put("/", function(req, res) {
    for(let i =0; i < users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({})

})

//deleting the kidneys
app.delete("/", function(req, res) {
    //checking if atleast one unhealthy kidney is here , else return 411

    if(checkingUnhealthyKidneys()) {
        const newKidneys = [];
        for(let i =0; i < users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        }
        //removing the unhealthy kidney
        users[0].kidneys = newKidneys;
        res.json({msg: "Unhealthy Kidneys Removed"})

    } else {
        res.status(411).json({msg: "Atleast one unhealthy kidney is required"})
    }
})

//function to check atleast there is one unhealthy kidney
function checkingUnhealthyKidneys() {
    let atLeastOneUnhealthyKidney = false;
    for(let i =0; i < users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atLeastOneUnhealthyKidney = true;
        }
    }
    return atLeastOneUnhealthyKidney
}

app.listen(3000);