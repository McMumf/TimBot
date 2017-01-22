var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');

//Uncomment before pushing to repository
const token = 'MjAyMjQ4MDM1NzA5ODc4Mjcy.CuKvWw.vvyeOvxAgQCfNDRdylU4m_0V_Dg'

//Comment out before pushing to repository
//const token = 'MjY0MTY1ODU3MTk2NzY5Mjgy.C0cnUA.kc8VXfLItsVGSm-Hzl1pfb790zI'

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('serverNewMember', (server, user) => {
  bot.sendMessage(user, "Weclome to " + server.name);
});

bot.on('message', message => {

  //Replies "pong"
  if(message.content === 'ping') {
    message.reply('pong');
  }

  //Displays commands
  if(message.content === "!help") {
    var commands = ["ping: returns pong", "!quote add [quote]: Adds a new quote", "!quote id [id]: Returns a specific quote",
                  "!quote: returns a random quote", "!image add [link]: adds an image (must be a link to an url)",
                  "!image id [id]: returns a specific image", "!image: returns a random image",
                  "!tally add [Subject]: Adds a new subject to tally",
                  "!tally plus [name]: increases the tally of that person", "!tally: returns a list of all the tallies", "!8ball: Magic 8 Ball",
                  "!lmgtfy: Let Me Google that for You", "!comone: replies with the gif thing"];
    message.reply(commands);
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

  if(message.content === '!comeon') {
    message.reply("https://68.media.tumblr.com/4568933a7abbc063c68d4f6a6e2c9ca6/tumblr_inline_ojmgz7FAnj1u40pgt_500.gif");
  }

  //Adds a quote to the quotes array and does message things
  if(message.content.startsWith('!quote add')) {
    var toBeQuotes = spliceArguments(message.content)[1];

    var length;

    var length = findIdQuote();

    var newQuote = {
      "id": length,
      "quote": toBeQuotes
    }
    addQuote(newQuote);
    message.reply("Quote added as " + newQuote.id);
  }

  if (message.content.startsWith('!quote id')) {
    var quoteID = spliceArguments(message.content)[1];
    var quoteFile = fs.readFileSync('./quoteFile.json');
    var quote = JSON.parse(quoteFile);
    var checker;
    console.log(quoteID);
    for(var i = 0; i < (quote.length); i++) {
      if(quote[i].id == quoteID) {
        //console.log("HERE: " + quote[i].id);
        checker = quote[i].id;
      }
    }
    if(quoteID > quote.length){
      message.reply("ERROR 404: Quote not found")
    } else if (checker == null) {
      message.reply("ERROR 404: Check yo use of commands fool!");
    } else {
      var reply = "";
      for(var i = 0; i < quote.length; i++) {
        if(quote[i].id == quoteID) {
          reply = "" + quote[i].quote;
        }
      }
      message.reply(reply);
    }
  }  else if (message.content === '!quote') {
    var quoteFile = fs.readFileSync('./quoteFile.json');
    var quote = JSON.parse(quoteFile);
    var randomID = Math.floor((Math.random() * quote.length));
    console.log(randomID);
    quoteReply = quote[randomID].quote;
    console.log(quoteReply);
    message.reply(quoteReply);
  }

  if (message.content === '!quoteList') {
    var quoteFile = fs.readFileSync('./quoteFile.json');
    var quote = JSON.parse(quoteFile);
    var list = "";
    var quoteList = "";
    for(var i = 0; i < quote.length; i++) {
      list = "Quote # " + (i + 1) + ": " + quote[i].quote + ',\n\n';
      quoteList += list;
    }
    //console.log(quoteList)
    message.author.send(quoteList, {split: true});

  }

  //Adds an image to the image array and does message things
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
    var checker;
    for(var i = 0; i < (image.length); i++) {
      if(image[i].id == imageID) {
        //console.log("HERE: " + quote[i].id);
        checker = image[i].id;
      }
    }

    if(imageID > image.length){
      message.reply("ERROR 404: Image not found")
    } else if (checker == null) {
      message.reply("ERROR 404: Check yo use of commands fool!");
    } else {
      var reply = "";
      for(var i = 0; i < image.length; i++) {
        if(image[i].id == imageID) {
          reply = "" + image[i].image;
        }
      }
      message.reply(reply);
    }
  }

  /*if (message.content === '!imageList') {
    var imageFile = fs.readFileSync('./images.json');
    var image = JSON.parse(imageFile);
    var list = "";
    var imageList = "";
    for(var i = 0; i < image.length; i++) {
      list = "Image # " + (i + 1) + ": " + image[i].image + ',\n\n';
      imageList += list;
    }
    //console.log(quoteList)
    message.author.send(imageList, {split: true},);

  }*/

  //Adds a tally to the tally array and does message things
  if(message.content.startsWith('!tally add')) {
    var toBeTally = spliceArguments(message.content)[1];

    var newTally = {
      "id": toBeTally,
      "tally": 0
    }
    addTally(newTally);
    message.reply("Tally added as " + newTally.id);

  }

  //Replies with a total tally
  if(message.content.startsWith('!tally plus')) {
    var newTally = spliceArguments(message.content)[1];
    var tallyFile = fs.readFileSync('./tally.json');
    var tally = JSON.parse(tallyFile);
    //console.log(tally);
    for(var i = 0; i < tally.length; i++) {
      if(tally[i].id == newTally) {
        tally[i].tally += 1;
        message.reply(tally[i].id + " is now at " + tally[i].tally);
      }
    }
    var tallyJSON = JSON.stringify(tally);
    fs.writeFileSync('./tally.json', tallyJSON);
  }

  if (message.content === '!tally') {
    var tallyFile = fs.readFileSync('./tally.json');
    var tally = JSON.parse(tallyFile);
    var totalTally = "";
    for(var i = 0; i < tally.length; i++) {
      totalTally += tally[i].id + ": " + tally[i].tally + ",\n";
    }
    console.log(totalTally);
    message.reply(totalTally);
  }

  if (message.content === "!8ball") {
    	var sayings = ["It is certain",
										"It is decidedly so",
										"Without a doubt",
										"Yes, definitely",
										"You may rely on it",
										"As I see it, yes",
										"Most likely",
										"Outlook good",
										"Yes",
										"Signs point to yes",
										"Reply hazy try again",
										"Ask again later",
										"Better not tell you now",
										"Cannot predict now",
										"Concentrate and ask again",
										"Don't count on it",
										"My reply is no",
										"My sources say no",
										"Outlook not so good",
										"Very doubtful"];

			var result = Math.floor((Math.random() * sayings.length) + 0);
			message.reply(sayings[result]);
    }

    if(message.content.startsWith('!lmgtfy')) {
      var arr = message.content.split(' ');
      arr.shift();
      var content = arr.join('+');
      //var query = spliceArguments(message.content)[i];
      message.reply("http://lmgtfy.com/?q=" + content);
    }

    /*if(message.content === '!init') {
      message.reply(server.name);
    }*/

});

//For splicing of commands
function spliceArguments(message, after) {
  after = after || 2;
  var rest = message.split(' ');
  var removed = rest.splice(0, after);
  return [removed.join(' '), rest.join(' ')];
}

function spliceArguments2(message, after) {
  after = after || 2;
  var rest = message.split(' ');
  var removed = rest.splice(0, after);
  return [removed.join(' '), rest.join(' ')];
}

//For addings quotes to quoteFile.json
function addQuote(object) {
  var quoteFile = fs.readFileSync('./quoteFile.json');
  var quote = JSON.parse(quoteFile);
  quote.push(object);
  var quoteJSON = JSON.stringify(quote);
  fs.writeFileSync('./quoteFile.json', quoteJSON);
}

//For adding an new image link
function addImage(object) {
  var imageFile = fs.readFileSync('./images.json');
  var image = JSON.parse(imageFile);
  image.push(object);
  var imageJSON = JSON.stringify(image);
  fs.writeFileSync('./images.json', imageJSON);
}

//For adding a new person to be tallied
function addTally(object) {
  var tallyFile = fs.readFileSync('./tally.json');
  var tally = JSON.parse(tallyFile);
  tally.push(object);
  var tallyJSON = JSON.stringify(tally);
  fs.writeFileSync('./tally.json', tallyJSON);
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
