function Person() {

}

function Movie() {

}

function TVShow() {

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
		event.preventDefault();
		

		searchedMovie = $('#movieInput').val();
		console.log(searchedMovie);
		searchOption = $('#search-options').val();

		switch(searchOption) {
			case 'movie':
				searchURL ='https://api.themoviedb.org/3/search/movie?query='+searchedMovie+'&api_key='+apiKey;

				$.getJSON(searchURL, function(data){
					console.log(data);
					var html = "";
					var x = 0;
					movieArray = data.results;
					$('#now-playing').html("<h2>Search Results</h2>");
					$('#now-playing-wrapper').html("");
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
						var profilePath =movieArray[i].profile_Path;
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
				});	
			break;
			case 'actor':
                searchConfig ='https://api.themoviedb.org/3/search/person?query='+searchedMovie+'&api_key='+apiKey;
                console.log(searchConfig);
                $.getJSON(searchConfig, function(data){
                    console.log(data);
                    var html = "";
                    var x = 0;
                    movieArray = data.results;

                    $('#now-playing').html("<h2>Search Results</h2>");
                    $('#now-playing-wrapper').html("");
                    for(i=0; i<movieArray.length; i++){
                        x++;
                        var name= movieArray[i].name;
                        var knownFor = movieArray[i].known_for[0].original_title;
                        var backdropPath = movieArray[i].known_for[0].backdrop_path;
                        console.log(backdropPath);
                        var genre_ids = movieArray[i].genre_ids;
                        var movieId = movieArray[i].id;
                        var title = movieArray[i].title;
                        var overview = movieArray[i].overview;
                        var popularity = movieArray[i].popularity;
                        var posterPath = movieArray[i].poster_path;
                        var profilePath =movieArray[i].profile_path;
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
                        html += '<img title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+profilePath+'"><p>'+name+'</p><p>Known for: '+knownFor+'</p>';
                        html += '<img src='+basePath+'w300'+backdropPath+'>';
                        html += '</div>';
                        
                        if(i == (movieArray.length-1)){
                            html += '</html>';
                            $(html).appendTo('#now-playing-wrapper');
                        }
                    }
                });
            break;
			case 'TV':
                searchConfig ='https://api.themoviedb.org/3/search/tv?query='+searchedMovie+'&api_key='+apiKey;
                console.log(searchConfig);
                $.getJSON(searchConfig, function(data){
                    console.log(data);
                    var html = "";
                    var x = 0;
                    movieArray = data.results;
                    $('#now-playing').html("<h2>Search Results</h2>");
                    $('#now-playing-wrapper').html("");
                    for(i=0; i<movieArray.length; i++){
                        x++;
                        var name= movieArray[i].name;            
                        var backdropPath = movieArray[i].backdrop_path;
                        var title = movieArray[i].title;
                        var overview = movieArray[i].overview;
                        var popularity = movieArray[i].popularity;
                        var posterPath = movieArray[i].poster_path;
                        var profilePath =movieArray[i].profile_path;
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
                        html += '<img src="'+basePath+'w300'+backdropPath+'"><p>'+name+'</p>';
                        html += '<img src='+basePath+'w300'+posterPath+'>';
                        html += '</div>';
                        
                        if(i == (movieArray.length-1)){
                            html += '</html>';
                            $(html).appendTo('#now-playing-wrapper');
                        }
                    }
                });
                break;
			case 'all':
				console.log(searchedMovie);
				searchURL = 'https://api.themoviedb.org/3/search/multi?query='+searchedMovie+'&api_key='+apiKey;
				console.log(searchURL);
				$.getJSON(searchURL, function(data){
					console.log(data);
					var html = "";
                    var x = 0;
					movieArray = data.results;
                    $('#now-playing').html("<h2>Search Results</h2>");
                    $('#now-playing-wrapper').html("");
                    for(i=0; i<movieArray.length; i++){
                    	var mediaType = movieArray[i].media_type;
                    	switch(mediaType){
                    		case 'movie':
                    			var backdropPath = movieArray[i].backdrop_path;
                    			var name = movieArray[i].title;
                    			var posterPath = movieArray[i].poster_path;
                    		break;
                    		case 'person':
                    			var backdropPath = movieArray[i].profile_path;
                    			var name = movieArray[i].name;
                    			var posterPath = movieArray[i].profile_path;
                    		break;
                    		case 'tv':
                    			var backdropPath = movieArray[i].backdrop_path;
                    			var name = movieArray[i].name;
                    			var posterPath = movieArray[i].poster_path;
                    		break;
                    	}

                    	if(i==0){
                            html += '<div class="movie-row">';
                        }

                        if(x==5){
                            html += '</div>';
                            html += '<div class="movie-row">';
                            x=1;
                        }
                        html += '<div class="now-playing-movie">';
                        html += '<img src="'+basePath+'w300'+backdropPath+'"><p>'+name+'</p>';
                        html += '<img src='+basePath+'w300'+posterPath+'>';
                        html += '</div>';
                        
                        if(i == (movieArray.length-1)){
                            html += '</html>';
                            $(html).appendTo('#now-playing-wrapper');
                        }
                    }
				});
			break;
		}
		
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