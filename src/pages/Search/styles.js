import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    flex: 1;
    background-color: #191a30;
`;

export const Name = styled.Text`
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