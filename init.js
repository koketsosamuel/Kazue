const RiveScript = require("rivescript")
var bot = new RiveScript()
var trainer = require("./trainer")
 
 
function loading_done() {
 
  bot.sortReplies()
 
}
 
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error)
}

async function init(obj) {

    await bot.loadDirectory("brain").then(loading_done).catch(loading_error);
    await trainer(obj)
    obj.bot = await bot
    console.log("init complete...")
    bot = null

}

module.exports = init