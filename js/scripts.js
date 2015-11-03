

var apiKey = 'c95668aaeef845acc0e59e71d260f85c';
var basePath = '';
var sizeOptions = '';
var logo_sizes = '';	
var poster_sizes = '';
var profile_sizes = '';


$(document).ready(function() {
	$('#movie-search-form').submit(function() {
		event.preventDefault();
		var thisSearch = $('#movieInput').val();
		var searchMovie = 'https://api.themoviedb.org/3/search/movie?query='+ thisSearch +'&api_key='+apiKey;
		$.getJSON(searchMovie, function(searchData) {
			console.log(searchData);
			var html = "";
			var x = 0;
			var searchMovieArray = searchData.results;

			for(i=0; i<searchMovieArray.length; i++){
				x++;
				var isAdult = searchMovieArray[i].adult;
				var backdrop_path = searchMovieArray[i].backdrop_path;
				var genre_ids = searchMovieArray[i].genre_ids;
				var movieId = searchMovieArray[i].id;
				var title = searchMovieArray[i].title;
				var overview = searchMovieArray[i].overview;
				var popularity = searchMovieArray[i].popularity;
				var posterPath = searchMovieArray[i].poster_path;
				var releaseDate = searchMovieArray[i].release_date;
				var voteAverage = searchMovieArray[i].vote_average;
				var voteCount = searchMovieArray[i].vote_count;	

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
				$('#now-playing-wrapper').html(html);
				if(i == (searchMovieArray.length-1)){
					html += '</html>';
					// $(html).appendTo('#now-playing-wrapper');
				}
			}
			console.log(html);
		});	
	})
	
});


var siteConfig = 'https://api.themoviedb.org/3/configuration?api_key='+apiKey;

$.getJSON(siteConfig, function(data){
	console.log(data);
	basePath = data.images.base_url;
	sizeOptions = data.images.poster_sizes;
	//0: "w300" 1: "w780" 2: "w1280" 3: "original"
	posterSize = 'w300';
	logo_sizes = logo_sizes['original'];
	profileSizes = profile_sizes['original'];
});

var nowPlaying = 'http://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey;

$.getJSON(nowPlaying, function(data){
	console.log(data);
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




