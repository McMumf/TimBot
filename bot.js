var Discord = require('discord.js');
var bot = new Discord.Client();
const token = 'MjAyMjQ4MDM1NzA5ODc4Mjcy.CuKvWw.vvyeOvxAgQCfNDRdylU4m_0V_Dg'
var quotes = ["I CAN'T HEAR YOU"];
var quotesLength = quotes.length;

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

  //Adds a quote to the quotes array
  if(message.content.startsWith('!quote add')) {
    var quotes = spliceArguments(message.content)[1];
    console.log(quotes);
  }

  //Returns a random quote from the quotes array
  if(message.content === '!quote') {
    var randomQuote = Math.floor(Math.random() * quotesLength);
    console.log(randomQuote);
    quoteReply = "" + quotes[randomQuote];
    console.log(quoteReply);
    //message.reply(quoteReply);
  }
});

bot.login(token);
