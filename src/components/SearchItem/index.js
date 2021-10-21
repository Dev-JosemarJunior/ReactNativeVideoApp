import React from "react";
import { 
    Container, 
    BackButton, 
    Name, 
    Title,
    Rate, 
    RateContainer,
    ReleaseDate
} from './styles'
import { Ionicons } from '@expo/vector-icons'
import { BannerItem } from "../../pages/Search/styles";

export default function SearchItem({ data, navigatePage }){
    
    function detailMovie(){
        if(data?.release_date === ''){
            alert('Filme ainda não lançado');
            return;
        }
        
        navigatePage(data);
    }

    function compareDate(){
        var date1 = new Date();
        var date2 = new Date(data.release_date);
        if( date1 < date2 ){
            return(
                <RateContainer>
                    <ReleaseDate>Data de lançamento: {data.release_date}</ReleaseDate>
                </RateContainer>
            )
        }else if(data.release_date === '') {
            return(
                <RateContainer>
                    <ReleaseDate>Sem data de lançamento</ReleaseDate>
                </RateContainer>
            )
        } else {
            return (
                <RateContainer>
                    <Ionicons name="md-star" size={14} color="#E7A74e" />
                    <Rate>{data.vote_average} / 10</Rate>
                </RateContainer>
            )
        }
    }

    return(
        <Container activeOpacity={0.8} onPress={() => detailMovie(data)}>
            { data?.backdrop_path ? (
                <BannerItem 
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/original/${data?.backdrop_path}` }}
                />
            ) : (
                <BannerItem 
                resizeMethod="resize"
                source={ require('../../assets/noimage.png') }
                />
            )}
            <Title numberOfLines={1} >{data.title}</Title>
            {compareDate()}

        </Container>
    )
}
