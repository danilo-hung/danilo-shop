import styled from "styled-components";

export const CartDropdownContainer = styled.div`
position: absolute;
transform: translate(10%, -10%);
width: 300px;
height: 340px;
display: flex;
flex-direction: column;
padding: 20px;
border: 1px solid black;
background-color: white;
top: 90px;
right: 40px;
z-index: 5;
`
export const CartItems = styled.div`
height: 240px;
display: flex;
flex-direction: column;
overflow: scroll;

&::-webkit-scrollbar{
  width: 10px;
  background-color: none
}
&::-webkit-scrollbar-thumb {
  background:rgb(255, 99, 125) ;
  border-radius: 25px;
}
`

export const EmptyCart = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
p{
  font-weight: 700;
  font-size: 2rem;
  color:rgb(255, 99, 125, 0.3);
}
`

// .cart-dropdown-container {


//   .empty-message {
//     font-size: 18px;
//     margin: 50px auto;
//   }

//   .cart-items {

//   }



//   button {
//     margin-top: auto;
//   }
// }
