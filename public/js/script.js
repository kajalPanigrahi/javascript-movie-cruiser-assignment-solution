let movieArray = [];
let favsArray = [];

function getMovies() {

	return fetch('http://localhost:3000/movies')
	.then((response)=>{
		if(response.status===200) {
			//Extract the JSON data from the response body
			return response.json();
		}
	})
	.then((movies)=> {
		movieArray = movies;
		// Performing DOM manipulation to populate data on index.html
		let movieList = document.getElementById('moviesList');
		let iterator = '<table>';
		movies.forEach(movie => {
			iterator += `<tr> 
				<td>${movie.id}</td>
				<td>${movie.title}</td>
				<td>${movie.posterpath}</td>
				<td><button onclick="addFavourite(${movie.id})"> Add to Favourites </button></td>
			</tr>`
	})
	movieList.innerHTML = iterator + '</table>';
	return movieArray;
})
	.catch((error)=>{
	})
}

function getFavourites() {

	return fetch('http://localhost:3000/favourites')
	.then((response)=>{
		if(response.status===200) {
			//Extract the JSON data from the response body
			return response.json();
		}
	})
	.then((favs)=> {
		favsArray = favs;
		// Performing DOM manipulation to populate data on index.html
		let favsList = document.getElementById('favouritesList');
		let iterator = '<table>';
		favs.forEach(fav => {
			iterator += `<tr> 
				<td>${fav.id}</td>
				<td>${fav.title}</td>
				<td>${fav.posterpath}</td>
			</tr>`
	})
	favsList.innerHTML = iterator + '</table>';
	return favsArray;
})
	.catch((error)=>{
	})
}

function addFavourite(movieID) {    
	//First check whether this movie is present in your favourites array or not
	let isMovieInFav = favsArray.find(movie => movie.id === movieID);

    if(! (isMovieInFav == undefined )){
        throw new Error('Movie is already added to favourites');
    }
    else{
        let foundMovie = movieArray.find(movie => movie.id == movieID);
        return fetch('http://localhost:3000/favourites', {
       method: 'POST',
       headers : {
           'Content-Type' : 'application/json'
        },
        body : JSON.stringify(foundMovie),
   })
   .then((response) =>{
       if(response.ok){
            return Promise.resolve(response.json());
       }
    })
    .then((addedMovie) => {
		favsArray.push(addedMovie)
		//define your method to add this to favouritesList in your HTML
		let favsList = document.getElementById('favouritesList');
		let iterator = '<table>';
		favsArray.forEach(fav => {
			iterator += `<tr> 
				<td>${fav.id}</td>
				<td>${fav.title}</td>
				<td>${fav.posterpath}</td>
			</tr>`
	})
	favsList.innerHTML = iterator + '</table>';
        return Promise.resolve(favsArray);
	})    
	.catch((err) => {
        //RemoveFromFavourite(id);
        return Promise.reject(err);
    });
    }    
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

