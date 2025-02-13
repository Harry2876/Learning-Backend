const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

const ALL_USERS = [
    {
        username: "harsh@gmail.com",
        password: "123",
        name: "Harsh Kumar"
    },
    {
        username: "Uday@gmail.com",
        password: "123456",
        name: "Uday Kumar"
    },
    {
        username: "alok@gmail.com",
        password: "0987",
        name: " Alok Kumar"
    },
];

function userExists(username, password) {

}

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)) {
        return res.status(403).json({
            msg: "User Doesn't Exists"
        });
    }

    var token = jwt.sign({username: username},"shhhh");
    return res.json({
        token,
    });
});

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;

        //return of this users other than this username
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid Token",
        });
    }
})

app.listen(3000);