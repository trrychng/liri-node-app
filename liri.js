


require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require('node-spotify-api');
var fs = require("fs");
var resultsFeed = 0;




var nodeArgs = process.argv
var liriCommand = process.argv[2];
var liriSubject = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    liriSubject = liriSubject + "+" + nodeArgs[i];
  }
  else {
    liriSubject += nodeArgs[i];
  }
}


if (liriCommand === "my-tweets") {
	myTwitterFeed();
} 

function myTwitterFeed(){
	client = new twitter(keys.twitter);
	console.log(keys.twitter)
	client.get('statuses/user_timeline', { screen_name: 'trrychng', count: 20 }, function(error, tweets, response) {
      fs.appendFile("log.txt", "\r\nCommand to run: "+process.argv.slice(2)+"\r\n"
      +"----------------------------"+"\r\n"
      +"Beginning Twitter feed..."+"\r\n", function(){});
      for (i=0;i<tweets.length;i++){
      resultsFeed++
      fs.appendFile("log.txt", "----------------------------"+"\r\n"
      +resultsFeed+"."+"\r\n"
      +"Text: "+tweets[i].text+"\r\n"
      +"Published: "+tweets[i].created_at+"\r\n", function(){});
      console.log("----------------------------");
      console.log(resultsFeed+".");
      console.log("Text: "+tweets[i].text);
      console.log("Published: "+tweets[i].created_at);
    };
    if (error) {
    	console.log(error)
    	fs.appendFile("log.txt", "Error occured. See below: "+"\r\n"+error)
    }
  });
 }


if (liriCommand === "spotify-this-song") {
	spotifyThisSong();
}

function spotifyThisSong() {
	client = new spotify(keys.spotify);
	console.log(keys.spotify)
	fs.appendFile("log.txt", "\r\nCommand to run: "+process.argv.slice(2)+"\r\n"
	+"---------------------------------------------"+"\r\n"
  +"Beginning Spotify search..."+"\r\n", function(){})
	if (liriSubject === "") {
  	client.search({ type: 'track', query: "The Sign Ace of Base" }, function(err, data) {
  
  	if (err) {
    	return console.log("Error occurred: "+err);
    	fs.appendFile("log.txt", "Error occurred. See below: "+"\r\n"+err+"\r\n", function(){});
  	}
  	for (var i=0; i < data.tracks.items.length; i++) {
  		resultsFeed++;
  		console.log("---------------------------------------------")
  		console.log(resultsFeed+".");
 		console.log("Artist: "+data.tracks.items[i].artists[0].name);
		console.log("Song Name: "+data.tracks.items[i].name);
		fs.appendFile("log.txt", "---------------------------------------------"+"\r\n"
		+resultsFeed+"."+"\r\n"
		+"Artist: "+data.tracks.items[i].artists[0].name+"\r\n"
		+"Song Name: "+data.tracks.items[i].name+"\r\n", function(){});
		if (data.tracks.items[i].preview_url == null) {
		console.log("Link: "+data.tracks.items[i].external_urls.spotify);
		fs.appendFile("log.txt", "Link: "+data.tracks.items[i].external_urls.spotify+"\r\n", function(){})
		} else {
		console.log("Preview Link: "+data.tracks.items[i].preview_url);
		fs.appendFile("log.txt", "Preview Link: "+data.tracks.items[i].preview_url+"\r\n", function(){})
		}
		console.log("Album: "+data.tracks.items[i].album.name);
		console.log("---------------------------------------------")
		fs.appendFile("log.txt", "Album: "+data.tracks.items[i].album.name+"\r\n"
		+"---------------------------------------------"+"\r\n", function(){})
		};
  	});
  } else {

		client.search({ type: 'track', query: liriSubject }, function(err, data) {
  
  	if (err) {
    	return console.log("Error occurred: "+err);
    	fs.appendFile("log.txt", "Error occurred. See below: "+"\r\n"+err+"\r\n", function(){});
  	}
  	for (var i=0; i < data.tracks.items.length; i++) {
  		resultsFeed++;
  		console.log("---------------------------------------------")
  		console.log(resultsFeed+".");
 		console.log("Artist: "+data.tracks.items[i].artists[0].name);
		console.log("Song Name: "+data.tracks.items[i].name);
		fs.appendFile("log.txt", "---------------------------------------------"+"\r\n"
		+resultsFeed+"."+"\r\n"
		+"Artist: "+data.tracks.items[i].artists[0].name+"\r\n"
		+"Song Name: "+data.tracks.items[i].name+"\r\n", function(){});
		if (data.tracks.items[i].preview_url == null) {
		console.log("Link: "+data.tracks.items[i].external_urls.spotify);
		fs.appendFile("log.txt", "Link: "+data.tracks.items[i].external_urls.spotify+"\r\n", function(){})
		} else {
		console.log("Preview Link: "+data.tracks.items[i].preview_url);
		fs.appendFile("log.txt", "Preview Link: "+data.tracks.items[i].preview_url+"\r\n", function(){})
		}
		console.log("Album: "+data.tracks.items[i].album.name);
		console.log("---------------------------------------------")
		fs.appendFile("log.txt", "Album: "+data.tracks.items[i].album.name+"\r\n"
		+"---------------------------------------------"+"\r\n", function(){})
		};
  	});
  };
}



if (liriCommand === "movie-this") {
movieSearch();
}

function movieSearch() {
	fs.appendFile("log.txt", "\r\nCommand to run: "+process.argv.slice(2)+"\r\n", function(){})
	if (liriSubject === "") {
	request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {
  if (!error && response.statusCode === 200) {
  	console.log("--------------------------------")
  	console.log("Title: "+JSON.parse(body).Title)
  	console.log("Released: "+JSON.parse(body).Released)
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value)
    console.log("Produced in "+JSON.parse(body).Country)
    console.log("Language: "+JSON.parse(body).Language)
    console.log("Plot: "+JSON.parse(body).Plot)
    console.log("--------------------------------")
    fs.appendFile("log.txt", "---------------------------------------------"+"\r\n"
	  +"Beginning movie search..."+"\r\n"
	  +"---------------------------------------------"+"\r\n"
    +"Title: "+JSON.parse(body).Title+"\r\n"
		+"Released: "+JSON.parse(body).Released+"\r\n"
		+"IMDB Rating: " + JSON.parse(body).imdbRating+"\r\n"
		+"Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value+"\r\n"
		+"Produced in "+JSON.parse(body).Country+"\r\n"
		+"Language: "+JSON.parse(body).Language+"\r\n"
		+"Plot: "+JSON.parse(body).Plot+"\r\n"
		+"---------------------------------------------"+"\r\n", function(){})
  	} else {
  		console.log("See Error: "+error);
  		fs.appendFile("log.txt", "Error occurred. See below: "+"\r\n"+error+"\r\n", function(){});
  		}
		})
	} else {
		request("http://www.omdbapi.com/?t="+liriSubject+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if (!error && response.statusCode === 200) {
  		console.log("--------------------------------")
	  	console.log("Title: "+JSON.parse(body).Title)
	  	console.log("Released: "+JSON.parse(body).Released)
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value)
	    console.log("Produced in "+JSON.parse(body).Country)
	    console.log("Language: "+JSON.parse(body).Language)
	    console.log("Plot: "+JSON.parse(body).Plot)
	    console.log("--------------------------------")
	    fs.appendFile("log.txt", "---------------------------------------------"+"\r\n"
	    +"Beginning movie search..."+"\r\n"
	    +"---------------------------------------------"+"\r\n"
	    +"Title: "+JSON.parse(body).Title+"\r\n"
		+"Released: "+JSON.parse(body).Released+"\r\n"
		+"IMDB Rating: " + JSON.parse(body).imdbRating+"\r\n"
		+"Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value+"\r\n"
		+"Produced in "+JSON.parse(body).Country+"\r\n"
		+"Language: "+JSON.parse(body).Language+"\r\n"
		+"Plot: "+JSON.parse(body).Plot+"\r\n"
		+"---------------------------------------------"+"\r\n", function(){})
  		} else {
			console.log("See Error: "+error);
			fs.appendFile("log.txt", "Error occurred. See below: "+"\r\n"+error+"\r\n", function(){});
			}
		});
	}
}


if (liriCommand === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {
		var dataArr = data.split(",")
		liriCommand = dataArr[0];
		liriSubject = dataArr[1];
		if (liriCommand === "my-tweets"){
			myTwitterFeed();
		}
		if (liriCommand === "spotify-this-song"){
			spotifyThisSong();
		}
		if (liriCommand === "movie-this"){
			movieSearch();
		}
	});
}