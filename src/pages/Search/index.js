import React, {useState, useEffect} from "react";
import { 
    Container, 
    Name,
    ListMovies,
    LoadContainer,
    ButtonLoader
} from './styles'
import { ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import api, { key } from '../../Services/api';
import SearchItem from '../../components/SearchItem'


export default function Search({name: input}){
    
    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState([]);
    const [dataMovie, setDataMovie] = useState([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPagesResults, setTotalPageResults] = useState(0);

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
                if (response.data.total_pages >= page){
                    const newMovies = response.data.results;
                    setMovie([...dataMovie, ...newMovies]);
                    setLoading(false);
                } 
                setTotalPageResults(response.data.total_pages);
            }
        }

        if(isActive){
            getSearchMovie();
            
        }

        return () => {
            isActive = false;
            
        }

    }, [page])

    function navigateDetailPage(item){
        navigation.navigate('Detail', { id: item.id} );
    }

    const loadLoader = () =>{

            return(
                <LoadContainer>
                    {totalPagesResults > page ? (
                        <LoadContainer>
                            <ActivityIndicator  size="large" color="#FFF"/>
                        </LoadContainer>
                    ): null}
                    
                </LoadContainer>
            )
        
    }
    
    function loadMore(){
        if (totalPagesResults > page){
            setDataMovie(movie);
            setPage((page + 1));
        }
        // alert('Passando por aqui');
    }

    
    if(loading){
        return(
            <Container>
                
            </Container>
        )
    }
    return(
        <Container>
            <ListMovies
                    data={movie}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => <SearchItem data={item} navigatePage={ () => navigateDetailPage(item) } />}
                    onEndReachedThreshold={0.3}
                    onEndReached={() => loadMore() }
                    initialNumToRender={1}
                    ListFooterComponent={loadLoader()}
            />
        </Container>
        
    )   
}
