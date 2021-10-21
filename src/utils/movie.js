// Gerar um lista com tamanho personalizado 
// a partir de uma requisição

export function getListMovies(size, movies){
    let popularMovies = [];

    for(let i = 0; i < size; i++){
        popularMovies.push(movies[i])
    }

    return popularMovies;
}

//Gerar um filme aleatório para cada load
export function randomBanner (movies) {
    return Math.floor(Math.random() * movies.length)
}


// export function getMostRecentMovie(movies){
//     let MostRecentMovie= movies[0];
//     let MostRecentDate = new Date(movies[0].release_date);
//     //new Date('2014-25-23').toISOString()

//     for(movie in movies){
//         if (new Date(movie.release_date) > MostRecentDate){
//             MostRecentMovie = movie
//             MostRecentDate = new Date(movie.release_date);
//         }
//     }

//     return MostRecentMovie;
// }

