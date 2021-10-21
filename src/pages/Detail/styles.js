import styled from "styled-components/native";


export const Container = styled.SafeAreaView`
    background-color: #141a29;
    flex: 1;
    padding: 4px 0;
`;

export const Header = styled.View`
    z-index: 99;
    position: absolute;
    top: 35px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 0 14px;
`;

export const HeaderButton = styled.TouchableOpacity`
    width: 46px;
    height: 46px;
    background-color: rgba(25, 26, 48, 0.8);
    border-radius: 23px;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.Image`
    width: 100%;
    height: 350px;
    border-bottom-left-radius: 70px;
    border-bottom-right-radius: 70px;
`;

export const ButtonLink = styled.TouchableOpacity`
    width: 64px;
    height: 64px;
    background-color: #E72f49;
    border-radius: 35px;
    position: absolute;
    top: 300px;
    right: 15px;
    justify-content: center;
    align-items: center;
    z-index: 99;
`;

export const Title = styled.Text`
    padding: 8px 14px;
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
    margin-top: 14px
`;

export const LoadingView = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const ContentArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
`;

export const Rate = styled.Text`
    color: #FFF;
    font-size: 14px;
    padding: 4px 0px;
    font-weight: bold;
`;

export const TitleBanner = styled.Text`
    color: #FFF;
    font-size: 18px;
    padding: 4px 14px;
`;

export const BannerButton = styled.TouchableOpacity`
`;

export const ListGenres = styled.FlatList`
    padding-left: 14px;
    margin: 8px 0;
    max-height: 35px;
    min-height: 35px;
`;

export const Description = styled.Text`
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 30px;
    color: #FFF;
    line-height: 20px;
`;