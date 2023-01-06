import styled from "styled-components";
import { keyframes } from "styled-components";

const animate = keyframes`
0% { transform: translate(-50%, -50%) rotate(0deg);}
100% {transform: translate(-50%, -50%) rotate(360deg);}
`

export const DirectoryItemBodyBox = styled.div`
    position: relative;
    padding: 10px;
    flex-basis: 33.3%;
    min-width: 350px;
    height: 330px;
    display: flex;
    align-items: center;
    &:nth-child(4){
        flex-grow: 2;
        max-width: 50%;
        @media screen and (max-width: 1069px) {
            flex-grow: 1;
            max-width: 350px;
            flex-basis: auto;
        }
    }
    &:nth-child(5){
        flex-grow: 2;
        max-width: 50%;
        @media screen and (max-width: 1069px){
            flex-grow: 1;
            min-width: 350px;
            max-width: 700px;
        }
        @media screen and (max-width: 719px){
            flex-grow: 1;
            min-width: 350px;
            max-width: 350px;
            width: 350px;
        }
    }
    @media screen and (max-width: 935px) {
        flex-basis: auto;
        min-width: 350px;
    }
`

export const ContentBox = styled.div`
position: absolute;
width: 60%;
height: 40%;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
outline: 1px solid whitesmoke;
outline-offset: 3px;
background: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
transition: 500ms;
`
export const Title = styled.h2`
color: whitesmoke;
width: 100%;
text-align: center;
margin: 0;
`
export const SubTitle = styled.h2`
color: whitesmoke;
display: none;
`
export const BackgroundImg = styled.div`
background-position: left;
position: relative;
width: calc(100% - 10px);
height: calc(100% - 10px);
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
overflow: hidden;
`
export const Img = styled.img`
position: absolute;
top: 50%;
left: 50%;
z-index: 1;
width: 150%;
transform: translate(-50%, -50%);
`
export const DirectoryItemLine = styled.div`
`
export const DirectoryItemContainer = styled.div`
width: 100%;
height: 100%;
border: 1px solid black;
transition: 500ms;
&:nth-child(4),
&:nth-child(5){
    flex-grow: 2;
    max-width: 50 %;
}
&:hover{
    transform: scale(1.05);
    border: none;
    ${ContentBox}{
        background: rgba(0, 0, 0, 0.863);
        outline: none;
        cursor: pointer;
        transition: 100ms;
        &:active{
            &:active{
                background: rgb(255, 99, 125);
            }
        }
    }
    ${DirectoryItemLine}{
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: auto;
        &::before{
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1000px;
            height: 120px;
            transform: translate(-50%, -50%);
            background: linear-gradient(transparent 0%, black 30%, black 60%, transparent 100%);
            animation: ${animate} 1s linear infinite;
            z-index: auto;
        }
        &::after{
            content: "";
            position: absolute;
            inset: 3px;
            background: white;
            z-index: auto;
        }
    }
    ${Title}{
        display: none;
    }
    ${SubTitle}{
        display: block;
    }
}
`

