import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    flex: 1;
    background-color: #191a30;
`;

export const Name = styled.Text`
    color: #FFF;
    font-size: 14px;
    padding-bottom: 20px;
    /* padding-top: 8px; */
`;

export const NameTop = styled.Text`
    color: #FFF;
    font-size: 14px;
    /* padding-top: 8px; */
`;


export const ListMovies = styled.FlatList`
    color: #FFF;
    font-size: 14px;
    /* padding-top: 8px; */
`;

export const BannerItem = styled.Image`
    width: 100%;
    height: 170px;
    border-radius: 8px;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Rate = styled.Text`
    padding-left: 4px;
    color: #FFF;
    font-size: 12px;
`;

export const LoadContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const SearchView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 15px;
`;

export const BigSearchView = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #141a29;
`;

export const NotFound = styled.Text`
    color: #FFF;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    text-align: center;
`;



export const ButtonLoader = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    margin: 0px 30px;
    padding-bottom: 20px;
    background-color: rgba(25, 26, 48, 0.8);
    border-radius: 23px;
    justify-content: center;
    align-items: center;
`