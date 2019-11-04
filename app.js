const express = require('express')
const ejs = require("ejs")
const bp = require("body-parser")

const app = express()

app.set("view engine", "ejs")
app.use(bp.json())

const init = require("./init") 

let obj = {
    manager: null,
    bot: null
}


async function start() {

    await init(obj)

}

start()


app.get("/", (req, res) => {

    res.render("chat")

})

app.post('/bot',async (req, res) => {
  
    let out = await obj.manager.process(req.body.msg)

    if (out.intent != "None" && out.score >= 0.7 ) {

        let x = await out.intent.split(".")
        let b = await strMake(x)

        obj.bot.reply("1", b).then(results => {

            res.json({msg: results})

        })

    } else {
        obj.bot.reply("1", req.body.msg).then(results => {

            res.json({msg: results})

        })
    }

})

function strMake(x) {

    let b = ""

    for (let i = 0; i < x.length; i++) {

        b += x[i]
    
    }

    return b

}

app.listen(process.env.PORT || 3000)