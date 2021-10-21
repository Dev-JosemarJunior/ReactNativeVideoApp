import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';


import {    
    Container, 
    SearchContainer, 
    Input, 
    SearchButton,  
    Title,
    BannerButton,
    Banner,
    SliderMovie,
    LoadingView,
    TitleBanner
} from './styles';

import { Feather } from '@expo/vector-icons';

import { getListMovies, randomBanner, getMostRecentMovie } from '../../utils/movie'

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import api, { key } from '../../Services/api';

import { useNavigation } from '@react-navigation/native'


function Home(){
    
    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});
    const [input, setInput] = useState('');

    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() =>{
        let isActive = true;
        const ac = new AbortController();

        async function getMovies(){
            
            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing',{
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                        region: 'BR'
                    }    
                }),
                api.get('/movie/popular',{
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                        region: 'BR'
                    }    
                }),
                api.get('/movie/top_rated',{
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                        region: 'BR'
                    }    
                })
            ])
            
            if(isActive){
                const nowList = getListMovies(10, nowData.data.results);
                setNowMovies(nowList);

                const popularList = getListMovies(7, popularData.data.results);
                setPopularMovies(popularList);

                const topList = getListMovies(7, topData.data.results);
                setTopMovies(topList);

                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);

                // const cartazItem = getMostRecentMovie;
                // setCartazMovie(cartazItem);

                setLoading(false);
            }
        }

        getMovies();

        return () => {
            isActive = false;
            ac.abort();
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

    if(loading){
        return(
            <Container>
                <LoadingView>
                    <ActivityIndicator  size="large" color="#FFF"/>
                </LoadingView>
                
                
                
            </Container>
        )
    }

    return(
        <Container>

            <Header title="React Prime App" />
            <SearchContainer showsVerticalScrollIndicator={false}>
                <Input 
                    placeholder="Busque por um filme"
                    placeholderTextColor="#ddd"
                    value={input}
                    onChangeText={(text) => setInput(text) }
                />
                <SearchButton onPress={handleSearchMovie}>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>
            </SearchContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* BEGIN Em cartaz */}
                <Title>Em cartaz</Title>
                <TitleBanner numberOfLines={1} >{bannerMovie.title}</TitleBanner>
                <BannerButton activeOpacity={0.8} onPress={() => navigateDetailPage(bannerMovie)}>
                    <Banner
                        resizeMethod="resize" 
                        source={{uri: `https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path}` }}
                    />
                </BannerButton>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={ ( {item} ) => <SliderItem data={item} navigatePage={() => navigateDetailPage(item) } /> }
                    keyExtractor={(item) => {
                        return String(item.id)
                    }}
                />
                {/* END Em cartaz */}
                
                {/* BEGIN Populares */}
                <Title>Populares</Title>
                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={ ( {item} ) => <SliderItem data={item} navigatePage={() => navigateDetailPage(item) } /> }
                    keyExtractor={(item) => {
                        return String(item.id)
                    }}
                />
                {/* END Populares */}

                {/* BEGIN Mais Votados */}
                <Title>Mais Votados</Title>
                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={ ( {item} ) => <SliderItem data={item} navigatePage={() => navigateDetailPage(item) } /> }
                    keyExtractor={(item) => {
                        return String(item.id)
                    }}
                />
                {/* END Mais Votados */}
            </ScrollView>


        </Container>
    );
}



export default Home;