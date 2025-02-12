const express = require('express');
const zod = require("zod");

const app = express();

//describing the schema for the zod to check
const schema = zod.array(zod.number());

app.use(express.json());

app.post("/health-checkup",
    (req,
     res) => {
    //do something with kidney here
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys)
    if(!response.success){
        return res.status(411).json({
            msg: "Invalid Input"
        })
    } else {
        return res.send({
            response
        })
    }
})

app.listen(3000);