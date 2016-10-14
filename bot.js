var Discord = require('discord.js');
var bot = new Discord.Client();
const token = 'MjAyMjQ4MDM1NzA5ODc4Mjcy.CuKvWw.vvyeOvxAgQCfNDRdylU4m_0V_Dg'
var quotes = ["I CAN'T HEAR YOU"];
var quotesLength = quotes.length;
console.log(quotes.length);

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
    console.log(toBeQuotes);
    quotes.push(toBeQuotes);
    var length = quotes.length - 1;
    message.reply("Quote added as " + length);
    console.log(quotes.length);
  }

  if (message.content === '!quote') {
    var randomQuote = Math.floor((Math.random() * quotes.length));
    console.log(randomQuote);
    quoteReply = "" + quotes[randomQuote];
    console.log(quoteReply);
    message.reply(quoteReply);
  }

  /*if (message.content.startsWith('!quote')) {
    var quoteElement = spliceArguments(message.content)[1];
    console.log(quoteElement);
    message.reply(quotes[quoteElement]);
  }*/

});

//For splicing of commands
function spliceArguments(message, after) {
  after = after || 2;
  var rest = message.split(' ');
  var removed = rest.splice(0, after);
  return [removed.join(' '), rest.join(' ')];
}

bot.login(token);
