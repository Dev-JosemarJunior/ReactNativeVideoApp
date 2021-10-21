import styled from "styled-components/native";

export const Container = styled.View`
    padding: 14px;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: ${props => props.size}px;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
`;

export const Rate = styled.Text`
    padding-left: 4px;
    color: #FFF;
    font-size: 12px;
`;

export const ActionConteiner = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const DetailButton = styled.TouchableOpacity`
    width: 85%;
    height: 30px;
    background-color: #e72f49;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`;

export const DeleteButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;
