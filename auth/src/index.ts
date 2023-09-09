const express = require("express");

const app = express();
app.use(express.json());

app.get("/api/users/currentUser", (req: any, res:any) => {
    console.log("Welcome ");
    res.send("Hi ");
});

app.listen(5001,()=>{
    console.log("Listening on port 5001fdg");
})