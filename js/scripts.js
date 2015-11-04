function Person(baseURL, name, poster, info, knownMovies, id) {
 	this.baseURL = baseURL;
 	this.name = name;
 	this.poster = poster;
 	this.info = info;
 	this.knownMovies = knownMovies;
 	this.id = id;

 	var modalImages = "";
 	for (var i = 0; i < knownMovies.length; i++) {
 		modalImages += '<img src="'+knownMovies[i].backdrop_path+'"><p>'+knownMovies[i].title+'</p>';
 	};
 	
 	this.getDiv = function() {
 		var html = '<div class="now-playing-movie" data-toggle="modal" data-target="#person-modal-'+id+'">';
				html += '<img src="'+baseURL+'w300'+poster+'"><p>'+name+'</p>';
       	html += '</div>'
 		return html;
 	}

 	this.getModal = function() {
 		var modal = '<div class="modal fade" id="person-modal-'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
	 			modal += '<div class="modal-dialog" role="document">';
					modal += '<div class="modal-content">';
				    	modal += '<div class="modal-header">';
					    	modal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					        modal += '<h4 class="modal-title" id="myModalLabel">'+name+'</h4>';
					    modal += '</div>';
						modal += '<div class="modal-body">';
					    	modal += '<img src="'+baseURL+'w300'+poster+'"><p>'+info+'</p>';
					    	modal += modalImages;
					    modal += '</div>';
						modal += '<div class="modal-footer">';
					    	modal += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
						modal += '</div>';
			    	modal += '</div>';
				modal += '</div>';
			modal += '</div>'
 		return modal;
 	}
}

function Movie(title, baseURL, poster, overview, id) {
 	this.baseURL = baseURL;
 	this.title = title;
 	this.poster = poster;
 	this.overview = overview;
 	this.id = id;
 	
 	this.getDiv = function() {
 		var html = '<div class="now-playing-movie" data-toggle="modal" data-target="#movie-modal-'+id+'">';
				html += '<img alt="'+title+'" src="'+baseURL+'w300'+poster+'">';
       	html += '</div>'
 		return html;
 	}

 	this.getModal = function() { 
 		var modal = '<div class="modal fade" id="movie-modal-'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
	 			modal += '<div class="modal-dialog" role="document">';
					modal += '<div class="modal-content">';
				    	modal += '<div class="modal-header">';
					    	modal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					        modal += '<h4 class="modal-title" id="myModalLabel">'+title+'</h4>';
					    modal += '</div>';
						modal += '<div class="modal-body">';
					    	modal += '<img src="'+baseURL+'w300'+poster+'"><p>'+overview+'</p>';
					    modal += '</div>';
						modal += '<div class="modal-footer">';
					    	modal += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
						modal += '</div>';
			    	modal += '</div>';
				modal += '</div>';
			modal += '</div>'
 		return modal;
 	}
}

function TVShow(baseURL, poster, name, overview, id) {
 	this.baseURL = baseURL;
 	this.name = name;
 	this.poster = poster;
 	this.overview = overview;
 	
 	this.getDiv = function() {
 		var html = '<div class="now-playing-movie" data-toggle="modal" data-target="#tv-modal-'+id+'">';
				html += '<img title="'+overview+'" alt="'+name+'" src="'+baseURL+'w300'+poster+'"><p>'+name+'</p>';
       	html += '</div>'
 		return html;
 	}

 	this.getModal = function() {
 		var modal = '<div class="modal fade" id="tv-modal-'+id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
	 			modal += '<div class="modal-dialog" role="document">';
					modal += '<div class="modal-content">';
				    	modal += '<div class="modal-header">';
					    	modal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					        modal += '<h4 class="modal-title" id="myModalLabel">'+name+'</h4>';
					    modal += '</div>';
						modal += '<div class="modal-body">';
					    	modal += '<img src="'+img+'w300'+poster+'"><p>'+info+'</p>';
					    modal += '</div>';
						modal += '<div class="modal-footer">';
					    	modal += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
						modal += '</div>';
			    	modal += '</div>';
				modal += '</div>';
			modal += '</div>'
 		return modal;
 	}
}


var apiKey = "c95668aaeef845acc0e59e71d260f85c";
var basePath = '';
var sizeOptions = '';
var logo_sizes = '';	
var poster_sizes = '';
var profile_sizes = '';
var siteConfig = 'https://api.themoviedb.org/3/configuration?api_key='+apiKey;
var searchURL = 'https://api.themoviedb.org/3/search/'
var basePath = searchURL;

$(document).ready(function(){
	var searchedMovie ="";
	var searchConfig="";
	var searchOption="";
	$('#movie-search-form').submit(function(){
		// Prevent default submit action
		event.preventDefault();

		// Get the search catagory and info the user is searching
		searchedMovie = $('#movieInput').val();
		searchOption = $('#search-options').val();
		// url configuration for the movie db api
		searchConfig = 'https://api.themoviedb.org/3/search/'+searchOption+'?query='+searchedMovie+'&api_key='+apiKey;

		// get info from database
		$.getJSON(searchConfig, function(data) {
			// initialize variables
			var html = "";
			var x = 0;
			var resultsArray = data.results;

			// clear displayed images and data
			$('#now-playing').html("<h2>Search Results</h2>");
            $('#now-playing-wrapper').html("");

            // loop through objects returned from database
            for (var i = 0; i < resultsArray.length; i++) {
            	// incriment how many objects are on each row
            	x++;

            	// initialize variables for each object
            	var thisDiv = 'not set';
            	var input;
            	var modal;

            	// if the object has a media_type then set that to be what we search through in the switch statement
            	searchOption = resultsArray[i].media_type ? resultsArray[i].media_type : searchOption;

            	// based on the different cases given display the appropriate html 
            	switch(searchOption) {
            		case 'movie':
            		console.log(resultsArray[i]);
            			input = new Movie(resultsArray[i].title, basePath, resultsArray[i].poster_path, resultsArray[i].overview, resultsArray[i].id);       			
            			thisDiv = input.getDiv();
            			modal = input.getModal();
            		break;
            		case 'person':
            		console.log(resultsArray[i]);
            			input = new Person(basePath, resultsArray[i].name, resultsArray[i].profile_path, resultsArray[i].info, resultsArray[i].known_for, resultsArray[i].id);
            			thisDiv = input.getDiv();
            			modal = input.getModal();
            		break;
            		case 'tv':
            		console.log(resultsArray[i]);
            			input = new TVShow(basePath, resultsArray[i].poster_path, resultsArray[i].name, resultsArray[i].overview, resultsArray[i].id);
            			thisDiv = input.getDiv();
            			modal = input.getModal();
            		break;
            	}

            	// create the first movie row
            	if(i==0){
					html += '<div class="movie-row">';
				}

				// create a new row after every 4th object 
				if(x==5){
					html += '</div>';
					html += '<div class="movie-row">';
					x=1;
				}

				// put the object information in the html
				html += thisDiv;
				
				$('#movie-modals').append(modal);
				// at the end of the object array close all the tags
				if(i == (movieArray.length-1)){
					html += '</html>';
					$(html).appendTo('#now-playing-wrapper');
				}
            };

		});

	});
});

$.getJSON(siteConfig, function(data){
	// console.log(data);
	basePath = data.images.base_url;
	sizeOptions = data.images.poster_sizes;
	//0: "w300" 1: "w780" 2: "w1280" 3: "original"
	posterSize = 'w300';
	logo_sizes = logo_sizes['original'];
	profileSizes = profile_sizes['original'];
});
var nowPlaying = 'http://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey;
$.getJSON(nowPlaying, function(data){
	// console.log(data);
	var html = "";
	var x = 0;
	movieArray = data.results;
	// movieArray = objectArray;
	// for(i=0; i<data.results.length; i++){
	for(i=0; i<movieArray.length; i++){
		x++;
		var isAdult = movieArray[i].adult;
		var backdrop_path = movieArray[i].backdrop_path;
		var genre_ids = movieArray[i].genre_ids;
		var movieId = movieArray[i].id;
		var title = movieArray[i].title;
		var overview = movieArray[i].overview;
		var popularity = movieArray[i].popularity;
		var posterPath = movieArray[i].poster_path;
		var releaseDate = movieArray[i].release_date;
		var voteAverage = movieArray[i].vote_average;
		var voteCount = movieArray[i].vote_count;	
		if(i==0){
			html += '<div class="movie-row">';
		}
		if(x==5){
			html += '</div>';
			html += '<div class="movie-row">';
			x=1;
		}
		html += '<div class="now-playing-movie">';
		html += '<img title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+posterPath+'">';
		html += '</div>';
		
		if(i == (movieArray.length-1)){
			html += '</html>';
			$(html).appendTo('#now-playing-wrapper');
		}
	}
}); // End get json - popular movies