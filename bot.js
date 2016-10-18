var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');

const token = 'MjAyMjQ4MDM1NzA5ODc4Mjcy.CuKvWw.vvyeOvxAgQCfNDRdylU4m_0V_Dg'
//var quotesLength = quotes.length;
//console.log(quotes.length);
var quoteFile = require('./quoteFile.json');

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('message', message => {

  //Replies "pong"
  if(message.content === 'ping') {
    message.reply('pong');
  }

  //Returns the User's avatar
  if(message.content === '!avatar') {
    message.reply(message.author.avatarURL);
  }

  //Returns the result of a virtually flipped coin in either heads or tails
  if(message.content === '!coinflip') {
    var flip = Math.floor(Math.random() * 2);
    console.log(flip);
    if((flip % 2) == 0){
      message.reply("Heads!");
    } else {
      message.reply("Tails!");
    }
  }

  //Adds a quote to the quotes array and does message things
  if(message.content.startsWith('!quote add')) {
    var toBeQuotes = spliceArguments(message.content)[1];

    var length;

    var length = findID();
    console.log(length);

    var newQuote = {
      "id": length,
      "quote": toBeQuotes
    }
    message.reply("Quote added as " + newQuote.id);
    
    addQuotes(newQuote);
  }

  if (message.content === '!quote') {
    var quoteFile = fs.readFileSync('./quoteFile.json');
    var quote = JSON.parse(quoteFile);
    var randomQuote = Math.floor((Math.random() * quote.length));
    console.log(randomQuote);
    quoteReply = quote[randomQuote].quote;
    console.log(quoteReply);
    message.reply(quoteReply);
  }

  /*if (message.content.startsWith('!quote id')) {
    var quoteID = spliceArguments(message.content)[1];
    var quoteFile = fs.readFileSync('./quoteFile.json');
    var quote = JSON.parse(quoteFile);
    var reply = "" + quote[quoteID].quote;
    message.reply(reply);
  }*/

});

//For splicing of commands
function spliceArguments(message, after) {
  after = after || 2;
  var rest = message.split(' ');
  var removed = rest.splice(0, after);
  return [removed.join(' '), rest.join(' ')];
}

//For addings quotes to quoteFile.json
function addQuotes(object) {
  var quoteFile = fs.readFileSync('./quoteFile.json');
  var quote = JSON.parse(quoteFile);
  quote.push(object);
  var quoteJSON = JSON.stringify(quote);
  fs.writeFileSync('./quoteFile.json', quoteJSON);
}

//For finding the highest id in quoteFile.json to find the next id of the newest quote
function findID (length) {
  var jsonLength
  var quoteFile = fs.readFileSync('./quoteFile.json');
  var quote = JSON.parse(quoteFile);
  jsonLength = quote.length + 1;
  //console.log(quote[1].id);
  //console.log(jsonLength);
  return jsonLength;
}

bot.login(token);
