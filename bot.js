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

    var newQuote = {
      "id": length,
      "quote": toBeQuotes
    }
    addQuotes(newQuote);
    message.reply("Quote added as " + newQuote.id);

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

  if (message.content.startsWith('!quote id')) {
    var quoteID = spliceArguments(message.content)[1];
    var quoteFile = fs.readFileSync('./quoteFile.json');
    var quote = JSON.parse(quoteFile);
    if(quoteID > quote.length-1){
      message.reply("ERROR 404: Quote not found")
    } else {
      var reply = "" + quote[quoteID].quote;
      message.reply(reply);
    }
  }

  //Adds an image to the quotes array and does message things
  if(message.content.startsWith('!image add')) {
    var toBeImage = spliceArguments(message.content)[1];

    var length;

    var length = findIdImage();

    var newImage = {
      "id": length,
      "image": toBeImage
    }
    addImage(newImage);
    message.reply("Image added as " + newImage.id);

  }

  if (message.content === '!image') {
    var imageFile = fs.readFileSync('./images.json');
    var image = JSON.parse(imageFile);
    var randomImage = Math.floor((Math.random() * image.length));
    imageReply = image[randomImage].image;
    message.reply(imageReply);
  }

  if (message.content.startsWith('!image id')) {
    var imageID = spliceArguments(message.content)[1];
    var imageFile = fs.readFileSync('./images.json');
    var image = JSON.parse(imageFile);
    if(imageID > image.length-1){
      message.reply("ERROR 404: Image not found")
    } else {
      var reply = "" + image[imageID].image;
      message.reply(reply);
    }
  }

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

function addImage(object) {
  var imageFile = fs.readFileSync('./images.json');
  var image = JSON.parse(imageFile);
  image.push(object);
  var imageJSON = JSON.stringify(image);
  fs.writeFileSync('./images.json', imageJSON);
}

//For finding the highest id in quoteFile.json to find the next id of the newest quote
function findIdQuote (length) {
  var jsonLength;
  var quoteFile = fs.readFileSync('./quoteFile.json');
  var quote = JSON.parse(quoteFile);
  jsonLength = quote.length + 1;
  //console.log(quote[1].id);
  //console.log(jsonLength);
  return jsonLength;
}

//For finding the highest id in quoteFile.json to find the next id of the newest quote
function findIdImage(length) {
  var jsonLength;
  var imageFile = fs.readFileSync('./images.json');
  var image = JSON.parse(imageFile);
  jsonLength = image.length + 1;
  //console.log(quote[1].id);
  //console.log(jsonLength);
  return jsonLength;
}

bot.login(token);
