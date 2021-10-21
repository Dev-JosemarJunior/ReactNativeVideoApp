import React, {useState, useEffect} from "react";
import { 
    Container, 
    Name,
    ListMovies
} from './styles'
import {ScrollView} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import api, { key } from '../../Services/api';
import SearchItem from '../../components/SearchItem'


export default function Search({name: input}){
    
    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let isActive = true;

        async function getSearchMovie(){
            const response = await api.get('/search/movie',{
                params:{
                    query: route?.params?.name,
                    api_key: key,
                    language: 'pt-BR',
                    page: page,
                }
            })

            if(isActive){
                setMovie(response.data.results);
                setLoading(false);
                // console.log(response.data.results);
            }
        }

        if(isActive){
            getSearchMovie();
        }

        return () => {
            isActive = false;
        }

    }, [])

    function navigateDetailPage(item){
        navigation.navigate('Detail', { id: item.id} );
    }

    function handleSearchMovie(){

        if (input === ''){
            return;
        }
        navigation.navigate('Search', {name: input});
        setInput('');
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };

    if(loading){
        return(
            <Container>
                
            </Container>
        )
    }

    return(
        <Container
            onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              setPage((page += 1));
            }
          }}
          scrollEventThrottle={400}
        >
            <ListMovies
                    data={movie}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => <SearchItem data={item} navigatePage={ () => navigateDetailPage(item) } />}
                />
        </Container>
    )
}
