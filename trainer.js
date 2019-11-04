const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const {NlpManager} = require("node-nlp")

let manager

let docs = db.getState().docs
let ans = db.getState().ans

function documents() {

    for(let i = 0; i < docs.length; i++) {

        manager.addDocument("en", docs[i].doc, docs[i].intent)

    }

}

function answers() {

    for(let i = 0; i < answers.length;i++) {

        manager.addAnswer("en", ans[i].ans, ans[i].intent)

    }

}

async function train(x) {

    manager = new NlpManager({ languages: ['en'] })

    await documents()
    await answers()
    await manager.train()
    x.manager = await manager

    manager = null

}

module.exports = train