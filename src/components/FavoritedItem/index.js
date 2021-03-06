import React from "react";
import { 
    Container, 
    Title, 
    Rate, 
    RateContainer,
    ActionConteiner,
    DeleteButton,
    DetailButton
} from './styles'
import { Ionicons, Feather } from '@expo/vector-icons';


export default function FavoritedItem( { data, deleteMovie, navigatePage } ){
    return(
        <Container>
            <Title size={22}>{data.title}</Title>

            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A74e" />
                <Rate>{data.vote_average} / 10</Rate>
            </RateContainer>

            <ActionConteiner>
                <DetailButton onPress={ () => navigatePage(data)}>
                    <Title size={14}>Ver detalhes</Title>
                </DetailButton>

                <DeleteButton onPress={ () => deleteMovie(data.id) }>
                  <Feather name='trash' size={24} color='#FFF' />  
                </DeleteButton>
            </ActionConteiner>
        </Container>
    )
}