import styled from "styled-components";

export const CatPreivewContainer = styled.div`
margin-top:70px ;
display: flex;
flex-direction: column;
margin-bottom: 30px;
`

export const H2 = styled.h2`
min-width: 320px;
text-align: center;
letter-spacing: 10px;
margin: 30px auto 0;
border-left: 5px solid black;
border-right:5px solid black ;
`
export const H3 = styled.h3`
margin: auto;
text-align: center;
width: 200px;
line-height: 50px;
color: rgb(255, 99, 125);
border: 1px solid rgb(255, 99, 125);
cursor: pointer;
transition: 300ms;

&:hover,
&:active{
  color: white;
  background-color: rgb(255, 99, 125);
}
`

export const Preview = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
`



// .cat-preview-container {


//     h2{

//   }
//   h3{

//     
//   }
//     .title {
//       font-size: 28px;
//       margin-bottom: 25px;
//       cursor: pointer;
//     }
  
//     .preview {

//     }
//   }