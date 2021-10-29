import React, {useState, useEffect} from "react";
import { 
    Container, 
    Name,
    ListMovies,
    LoadContainer,
    ButtonLoader,
    SearchView,
    BigSearchView,
    NotFound,
    NameTop
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

            setDataMovie(response.data.total_pages);
            if(isActive){
                if (response.data.total_pages >= page){
                    const newMovies = response.data.results;
                    setMovie(newMovies);
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
            setMovie([]);
        }

    }, [page])

    function navigateDetailPage(item){
        navigation.navigate('Detail', { id: item.id} );
    }

    const loadLoader = () =>{

            if (page == 1){
                return (
                    <LoadContainer>
                            <ButtonLoader activeOpacity={0.7} onPress={ () => loadLess()}>
                                <Feather
                                    name=""
                                    size={28}
                                    color="#FFF"
                            />
                            </ButtonLoader>
                            <Name>{page} / {totalPagesResults}</Name>
                            {totalPagesResults > 1 ? (
                                <ButtonLoader activeOpacity={0.7} onPress={ () => loadMore()}>
                                <Feather
                                    name="arrow-right"
                                    size={28}
                                    color="#FFF"
                                />
                                </ButtonLoader>
                            ) : (
                                <ButtonLoader activeOpacity={0.7} onPress={ () => loadMore()}>
                                <Feather
                                    name=""
                                    size={28}
                                    color="#FFF"
                                />
                                </ButtonLoader>
                            )}
                            
                    </LoadContainer>
                )
            } else if (page < totalPagesResults ){
                return (
                    <LoadContainer>
                            <ButtonLoader activeOpacity={0.7} onPress={ () => loadLess()}>
                                <Feather
                                    name="arrow-left"
                                    size={28}
                                    color="#FFF"
                            />
                            </ButtonLoader>
                            <Name>{page} / {totalPagesResults}</Name>
                            <ButtonLoader activeOpacity={0.7} onPress={ () => loadMore()}>
                                <Feather
                                    name="arrow-right"
                                    size={28}
                                    color="#FFF"
                                />
                            </ButtonLoader>
                    </LoadContainer>
                )
            } else {
                return (
                    <LoadContainer>
                            <ButtonLoader activeOpacity={0.7} onPress={ () => loadLess()}>
                                <Feather
                                    name="arrow-left"
                                    size={28}
                                    color="#FFF"
                            />
                            </ButtonLoader>
                            <Name>{page} / {totalPagesResults}</Name>
                            <ButtonLoader activeOpacity={0.7} onPress={ () => loadMore()}>
                                <Feather
                                    name=""
                                    size={28}
                                    color="#FFF"
                                />
                            </ButtonLoader>
                    </LoadContainer>
                )
            }
        
    }
    
    function loadMore(){
        if (totalPagesResults > page){
            setPage((page + 1));
        }
    }

    function loadLess(){
        if (page > 1){
            setPage((page - 1));
        }
    }

    function noSearchResults(){
        if(dataMovie === 0){
            return(
                <BigSearchView>
                    <ButtonLoader activeOpacity={0.7}>
                                <Feather
                                    name="frown"
                                    size={80}
                                    color="#FFF"
                                />
                    </ButtonLoader>
                    <NotFound>Não foram encontrados resultados para "{route?.params?.name}"</NotFound>
                </BigSearchView>
            )
        } else {
            return(
                <BigSearchView>
                    <ActivityIndicator  size="large" color="#FFF"/>
                </BigSearchView>
            )
        }

        
    }
    
    if(loading){
        return(
            noSearchResults()
        )
    }

    return(
        <Container>
            <SearchView>
                <NameTop>Exibindo resultados para "{route?.params?.name}"</NameTop>
            </SearchView>
            <ListMovies
                    data={movie}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => <SearchItem data={item} navigatePage={ () => navigateDetailPage(item) } />}
                    initialNumToRender={1}
                    ListFooterComponent={loadLoader()}
            />
        </Container>
        
    )   
}
