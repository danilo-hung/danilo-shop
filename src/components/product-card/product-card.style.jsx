import styled from "styled-components";

export const ProductCardContainer = styled.div`
width: 400px;
border: 1px solid rgb(134, 134, 134);
background: rgba(245, 245, 245, 0.6);
margin: 40px;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`
export const CartBtn = styled.div`
padding: auto;
margin:auto;
position: absolute;
transform: translate(0, 100px);
`
export const Footer = styled.div`
width: calc(100% - 30px);
display: flex;
justify-content: space-between;
font-size: 1.3rem;
font-weight: 600;
margin: 10px 0;
`
export const ImgContainer = styled.div`
margin: 10px 10px;
width: calc(100% - 10px);
height: 350px;
overflow: hidden;
img{
    width: calc(100% + 50px);
    position: relative;
    transform: translate(0, -10%);
}
`
// .product-card-container{
//     .cart-btn{
//         .button-container.inverted{
//             background-color: rgba(255, 255, 255, 0.5);
//             color: rgba(0, 0, 0, 0.5);
//             border: 1px solid rgba(0, 0, 0, 0.5);  
//             &:hover {
//               background-color: rgba(0, 0, 0, 0.8);
//               color: white;
//               border: none;
//             }
//         }
        
//     }
//     .footer{

//     }
//     .img-container{

//         img{

//         }
//     }
// }

// @keyframes animate {

// }