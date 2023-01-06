import styled from "styled-components";

export const ImgBox = styled.div`
border: 1px solid rgb(255, 99, 125);
padding: 5px 5px 3px;
`

export const CheckoutCardContainer = styled.div`
display: flex;
margin: 10px 10px 0;
width: 100%;
@media screen and (min-width: 768px){
    justify-content: center;
}
`
export const ProductContainer = styled.div`
width: 40%;
@media screen and (min-width: 768px){
    width: 20%;
}
`

export const Img = styled.img`
width: 100%;
`
export const DescriptionContainer = styled.div`
width: 60%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
@media screen and (min-width: 768px){
    width: 30%;
}
    p,span{
        font-weight: 500;
    }
    p,span,i{
        @media screen and (min-width: 768px){
            font-size: 20px;
        }
    }
`
export const QtyControl = styled.i`
cursor: pointer;
margin: 0 10px;
&:hover,
&:active {
    color: rgb(255, 99, 125);
}
`

//     .button-container {
//         font-size: 10px;
//         height: 30px;
//         line-height: 30px;
//         padding: 0 10px;
//         min-width: unset;
//         overflow: hidden;
//     }
//     &:nth-child(2n) {
//         .button-container {
//             &.pink-style {
//                 background-color: white;
//                 color: black;
//                 border: 1px solid black;

//                 &:hover {
//                     background-color: black;
//                     color: white;
//                     border: none;
//                 }
//             }
//         }
//     }
// }
