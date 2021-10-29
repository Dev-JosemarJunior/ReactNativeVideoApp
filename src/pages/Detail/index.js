// Imports begins
import React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert  } from 'react-native';
import {    Container, 
            Header, 
            HeaderButton, 
            Title,
            Banner,
            LoadingView,
            ButtonLink,
            ContentArea,
            Rate,
            ListGenres,
            Description
        } from "./styles"
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import api, { key } from '../../Services/api';
import Stars from 'react-native-stars';
import Genres from "../../components/Genres";
import { ScrollView, Modal } from 'react-native'
import ModalLink from "../../components/ModalLink";
import { getMoviesSaved, saveMovie, deleteMovie, hasMovie } from "../../utils/storage";

// End of imports

function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();
    
    const [movie, setMovie] = useState({});
    const [openLink, setOpenLink] = useState(false)
    const [loading, setLoading] = useState(true);
    const [favoritedMovie, setFavoritedMovie] = useState(false);
    
    useEffect(() => {
        let isActivity = true;
        
        async function getMovie(){
            const response = await api.get(`/movie/${route.params?.id}`, {
                params: {
                    api_key: key,
                    language: 'pt-BR'
                }
            })
            .catch((err) => {
                console.log(err)
            })

            if(isActivity){
                setMovie(response.data);
                const isFavorited = await hasMovie(response.data);
                setFavoritedMovie(isFavorited);
            }

        }
        
        if(isActivity){
            getMovie();
            setLoading(false);
        }

        return () => {
            isActivity = false;
        }
        

    }, [isFocused])

    if(loading){
        return(
            <Container>
                <LoadingView>
                    <ActivityIndicator  size="large" color="#FFF"/>
                </LoadingView>
            </Container>
        )
    }

    async function handleFavoriteMovie(movie){

        if(favoritedMovie){
            await deleteMovie(movie.id);
            setFavoritedMovie(false);
            Alert.alert(
                movie.title,
                "Marcado como ainda não assistido",
            );
        } else {
            await saveMovie('@primereact', movie);
            Alert.alert(
                movie.title,
                "Marcado como assistido",
            );
            setFavoritedMovie(true);
        }
    }

    return(
        <Container>
            <Header>
                <HeaderButton activeOpacity={0.7} onPress={ () => navigation.goBack()}>
                    <Feather
                        name="arrow-left"
                        size={28}
                        color="#FFF"
                    />
                </HeaderButton>
                <HeaderButton activeOpacity={0.7} onPress={() => {handleFavoriteMovie(movie)}}>
                    {favoritedMovie ? (
                        <Ionicons
                        name="checkmark-done-outline"
                        // name="videocam-outline"
                        size={28}
                        color="#FFF"
                    />
                    ) : (
                        <Ionicons
                        // name="checkmark-done-outline"
                        name="videocam-outline"
                        size={28}
                        color="#FFF"
                    />
                    )}
                    
                    
                </HeaderButton>
            </Header>
            
            { movie?.backdrop_path ? (
                <Banner 
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` }}
                />
            ) : (
                <Banner 
                resizeMethod="resize"
                source={ require('../../assets/noimage.png') }
                />
            )}

            {/* <Banner 
                resizeMethod="resize"
                source={{uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }}
            /> */}
 
            <ButtonLink onPress={ () => setOpenLink(true) }>
                <Feather name='link' size={28} color="#FFF"/>
            </ButtonLink>

            <Title numberOfLines={2}>{movie.title}</Title>

            <ContentArea>
                <Stars 
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={ <Ionicons name="md-star" size={24} color="#E7A74e" /> }
                    emptyStar={ <Ionicons name="md-star-outline" size={24} color="#E7A74e" />}
                    halfStar={ <Ionicons name="md-star-half" size={24} color="#E7A74e" /> }
                    disabled={true}
                />
                <Rate>{movie.vote_average} / 10</Rate>
            </ContentArea>

            <ListGenres 
                data={movie?.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={ (item) =>  String(item.id) }
                renderItem={ ({ item }) => <Genres data={item} /> }
            />

            <ScrollView showsVerticalScrollIndicator={false} >
                <Title>Descrição</Title>
                {movie?.overview ? (
                    <Description>{movie?.overview}</Description>
                ) : (
                    <Description>Sem descrição</Description>
                )}
                
            </ScrollView>

            <Modal animationType='slide' transparent={true}  visible={openLink}>
                <ModalLink 
                    link={movie?.homepage}
                    title={movie?.title}
                    closeModal={() => setOpenLink(false)}
                />
            </Modal>
            
        </Container>
    )
}

export default Detail;