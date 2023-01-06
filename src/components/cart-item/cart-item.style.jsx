import styled from "styled-components";

export const CartItemContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
height: 94px;
margin-bottom: 15px;
`
export const ImgContainer = styled.div`
margin-right: 10px;
margin-bottom: 10px;
width: 77px;
height: 94px;
padding: 5px;
border: 0.5px solid rgb(255, 99, 125);
overflow: hidden;
img {
    width: 100%
}
`
export const ItemDetails = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 130px;
`
export const NameContainer = styled.div`
width: 100%;
overflow: scroll;
display: flex;
justify-content: flex-start;

&::-webkit-scrollbar {
    width: 1px;
    background-color: none
}

&::-webkit-scrollbar-thumb {
    background: none
}

span{
    white-space: nowrap;
    font-size: 20px;
    font-weight: 600;
}
`