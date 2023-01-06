import styled from "styled-components";
import { keyframes } from 'styled-components';
import { Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/CrwnLogo.svg'

const animateLogo = keyframes`
0% { transform: translateX(0%)} 
50% {transform: translateX(100%)} 
100% {transform: translateX(0%)}
`

export const NavigationContainer = styled.div`
    margin: auto;
    width: 100%;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: -1px;
    right: 0;
    z-index: 10;
`;

export const Logo = styled(CrwnLogo)`
width: 50px;
height: 50px;
fill: white;
`

export const NavLinksContainer = styled.div`
display: flex;
flex - wrap: nowrap;
justify - content: center;
`

export const NavLink = styled(Link)`
text-decoration: none;
display: inline - block;
padding: 0.5rem 0.5rem 0;
font - size: 1em;
text - decoration: none;
color: black;
text - align: center;
&::after {
    content: '';
    height: 3px;
    display: block;
    margin - top: 1px;
}
&:hover::after{
    content: '';
    width: 50%;
    height: 3px;
    background: black;
    display: block;
    margin - top: 1px;
    animation: ${animateLogo} 0.3s linear infinite;
}
`
export const Logout = styled(NavLink)`
color: rgb(255, 99, 125);
&:hover::after{
    background: rgb(255, 99, 125);
}
`
