import AsyncStorage, { AsyncStorageStatic } from "@react-native-async-storage/async-storage";


//Get Movies
export async function getMoviesSaved(key){
    const myMovies = await AsyncStorage.getItem(key);

    let moviesSave = JSON.parse(myMovies) || [];

    return moviesSave;
}

//Put Movies
export async function saveMovie(key, newMovie){
    let moviesStored = await getMoviesSaved(key);

    //Verificar se existe algum filme na lista
    const hasMovie = moviesStored.some(item => item.id === newMovie.id);

    if(!hasMovie){
        moviesStored.push(newMovie)

        await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
        // alert("Filme Salvo")
        return ;
    }
    
    alert("Filme já na lista");
}

//Delete Movies
export async function deleteMovie(id){
    let moviesStored = await getMoviesSaved('@primereact');

    let myMovies = moviesStored.filter((item) => {
        return ( item.id !== id)
    })

    await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies));
    // alert(id + ', marcado como ainda não assistido');

    return myMovies;
}

//Check for Movie
export async function hasMovie(movie){
    let moviesStored = await getMoviesSaved('@primereact');

    const hasMovie = moviesStored.find( item => item.id === movie.id);

    if(!hasMovie)
        return false;

    return true;
}