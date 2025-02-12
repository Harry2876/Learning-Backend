const express = require('express');

const app = express();


app.use(express.json());

app.post("/health-checkup", (req, res) => {
    //do something with kidney here
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;

    res.send("Your Kidney length is " + kidneyLength);
})

//using global catches to handle input error
app.use((err, req, res, next) => {
    res.status(500).send("Uh Oh! Something went wrong");
})

app.listen(3000);