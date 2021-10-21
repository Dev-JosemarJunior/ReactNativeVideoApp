import React, { useEffect, useState} from 'react';
import { 
    Container,
    ListMovies
} from './styles'
import Header from '../../components/Header';
import { getMoviesSaved, deleteMovie } from '../../utils/storage';
import FavoritedItem  from '../../components/FavoritedItem'
import { useNavigation, useIsFocused }  from '@react-navigation/native';

function Movies(){
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        let isActive = true;

        async function getFavoritedMovies(){
            const result = await getMoviesSaved('@primereact');
            
            if(isActive){
                setMovies(result);        
            }
        }

        if(isActive){
            getFavoritedMovies();
        }
        
        return () => {
            isActive = false;
        }
    }, [isFocused]);

    async function handleDelete(id){
        const result = await deleteMovie(id);
        setMovies(result);
    }

    function navigateDetailsPage(item){
        navigation.navigate('Detail', { id: item.id })
    }
    
    return(
        <Container>
            <Header title="Filmes Assistidos" />

            <ListMovies
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor = { item => String(item.id)}
                renderItem = { ({ item }) => (
                    <FavoritedItem 
                        data={item}
                        deleteMovie={ handleDelete }
                        navigatePage = {() => navigateDetailsPage(item)}
                    />
                ) }
            />
        </Container>
    );
}

export default Movies;