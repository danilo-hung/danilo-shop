import styled from "styled-components";

export const BaseButton = styled.button`
margin: 5px;
min-width: 194px;
width: auto;
height: 50px;
letter-spacing: 0.5px;
line-height: 50px;
padding: 0 35px 0 35px;
font-size: 15px;
background-color: black;
border: 1px solid black;
color: white;
text-transform: uppercase;
font-weight: bolder;
border: none;
cursor: pointer;
display: flex;
justify-content: center;
word-wrap: normal;

&:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

export const GoogleButton = styled(BaseButton)`
background-color: #4285f4;
color: white;
&:hover {
    color: #357ae8;
    background-color: white;
    border: 1px solid #357ae8;
  }
`

export const InvertedButton = styled(BaseButton)`
background-color: white;
color: black;
border: 1px solid black;

&:hover {
  background-color: black;
  color: white;
  border: none;
}
`

export const PinkButton = styled(BaseButton)`
background-color: white;
color: black;
border: 1px solid black;

&:hover {
  background-color: rgb(255, 99, 125);
  color: white;
  border: 1px solid rgb(255, 99, 125);
}
`