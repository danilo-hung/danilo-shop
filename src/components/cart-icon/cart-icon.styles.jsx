import styled from "styled-components";
import {ReactComponent as ShopIcon} from "../../assets/shopping-bag.svg";


export const CartIconContainer = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
`

export const ShoppingIcon = styled(ShopIcon)`
width: 30px;
height: 30px;
margin-bottom:10px ;
`

export const ItemCount = styled.span`
position: absolute;
font-size: 13px;
font-weight: bold;
bottom: 12px;
`
