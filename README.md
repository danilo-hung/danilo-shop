# 將CSS/SCSS檔案轉變成為jsx檔案
ReactJS中的CSS/SCSS Class name會影響到所有被命名為該class的html element <br>
例如 : <br>
在directory.component.jsx中命名某一個element className:"container" <br>
在directory.styles.scss中設定container的style <br>
在checkout.component.jsx中命名某一個element className:"container " <br>
在checkout.styles.scss中設定container的style <br>
**結果** : <br>
directory.styles.scss以及checkout.styles.scss中的container style會同時影響到directory.component.jsx以及checkout.component.jsx中element className:"container"的樣式<br>
**這樣有很大的機會造成style的混亂情形發生**<br>
因此，當專案完成到一個程度時，建議將SCSS檔案轉變為jsx的style component檔案

## style component的優勢
在component中 透過 import 指定的style component，可以限制該指定的style component只會在指定的component中造成style的影響 <br>
ex : 在directory.component.jsx import directory.styles.jsx, directory.styles.jsx中的styling 只會影響   directory.component.jsx 中的element

## 設定style component環境
1. 在專案中 `npm add style-components`
2. 將x.styles.css改名為x.styles.jsx
3. 在x.styles.jsx中 `import styled from "styled-components";`

## 變換SCSS為style component jsx基本型
SCSS : 
```css
.cart-item-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 94px;
    margin-bottom: 15px; 
```
style component jsx
```js
import styled from "styled-components";

export const CartItemContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
height: 94px;
margin-bottom: 15px;
`
```
## 在component中比較 SCSS 以及 style component 方法
原本利用className設定SCSS style
```js
import './cart-item.style.scss'

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, qty } = cartItem
    return (

         <div className='cart-item-container'>
           ...
        </div>

            )
}
```
改為style component後，視為component的方式import 
```js
import {CartItemContainer} from './cart-item.style.jsx';
const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, qty } = cartItem
    return (

        <CartItemContainer>
            ...
        </CartItemContainer>

            )
}
```
## 變換SCSS為style component jsx特殊型
## Nested Class
---
**Before**<br>
Component :
```js
import './button.style.scss'
...return(
    <button className="button-container google-sign-in" {...otherProps}>
        Google Sign In
    </button>
)
```
SCSS : 
```scss
.button-container {
    &.google-sign-in {
        background-color: #4285f4;
        color: white;
    }
}
```
**After**<br>
Component :
```js
import {GoogleButton} from './button.style.jsx'
...return(
    <GoogleButton {...otherProps} >
        {children}
    </GoogleButton>
)

```
Styled Component
```js
export const BaseButton = styled.button`
font-size: 15px;
`
export const GoogleButton = styled(BaseButton)`
background-color: #4285f4;
color: white;
`
```

## React Component Element
---
**Before** <br>
Component :
```js
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import './cart-icon.styles.scss';

...return(
    <ShoppingIcon className='shopping-icon'/>
)
```
SCSS : 
```SCSS
  .shopping-icon {

    width: 30px;
    height: 30px;
    margin-bottom:10px ;
  }
```
**After**
Component : 
```js
import {ShoppingIcon, ItemCount} from './cart-icon.styles.jsx';

...return(
    <ShoppingIcon/>
)
```
Styled Component
```js
import styled from "styled-components";
import {ReactComponent as ShopIcon} from "../../assets/shopping-bag.svg";

export const ShoppingIcon = styled(ShopIcon)`
width: 30px;
height: 30px;
margin-bottom:10px ;
`
```

## @media
---
**Before** <br>
Component :
```js
import './checkout-item-card.style.scss'

...return(
    <div className="description-container">
        ...
    </div>
)
```
SCSS : 
```SCSS
.description-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
@media screen and (min-width: 768px) {
    .description-container {
        width: 30%;
    }
}
```
**After**
Component : 
```js
import { DescriptionContainer} from './checkout-item-card.style.jsx'

...return(
    <DescriptionContainer>
        ...
    </DescriptionContainer>
)
```
Styled Component
```js
import styled from "styled-components";
import {ReactComponent as ShopIcon} from "../../assets/shopping-bag.svg";

export const DescriptionContainer = styled.div`
width: 60%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
@media screen and (min-width: 768px){
    width: 30%;
}
`
```

## hover 影響其他element style
---
**Before** <br>
Component :
```js
import './directory-item.style.scss'

...return(
    <div className="directory-item-container" >
    ...
        <div onClick={navToCatPage} className='content-box'>
            ...
        </div>
    </div>
)
```
SCSS : 
```SCSS
.directory-item-container{
    border: 1px solid black;
    transition: 500ms;
    &:hover {
        transform: scale(1.05);
        border: none;
        .content-box {
            background: rgba(0, 0, 0, 0.863);
            cursor: pointer;
            transition: 100ms;
        }
    }
}
```
**After**
Component : 
```js
import { DirectoryItemContainer, ContentBox } from './directory-item.style.jsx'

...return(
    <DirectoryItemContainer >
        ...
        <ContentBox onClick={navToCatPage}>
            ...
        </ContentBox>
    </DirectoryItemContainer>
)
```
Styled Component
```js
import styled from "styled-components";

export const ContentBox = styled.div`
transform: translate(-50%, -50%);
outline: 1px solid whitesmoke;
outline-offset: 3px;
`
export const DirectoryItemContainer = styled.div`
border: 1px solid black;
transition: 500ms;

&:hover{
    transform: scale(1.05);
    border: none;
        ${ContentBox}{
            background: rgba(0, 0, 0, 0.863);
            cursor: pointer;
            transition: 100ms;
        }
}
`
```
## Animate 效果
---
**Before** <br>

SCSS : 
```SCSS
.directory-item-line::before{
    animation: animate 1s linear infinite;
}
@keyframes animate {
    0% {transform: translate(-50%, -50%) rotate(0deg);}
    100% {transform: translate(-50%, -50%) rotate(360deg);}
}
```
**After**
Styled Component
```js
import styled from "styled-components";
import { keyframes } from "styled-components";

const animate = keyframes`
0% { transform: translate(-50%, -50%) rotate(0deg);}
100% {transform: translate(-50%, -50%) rotate(360deg);}
`
export const DirectoryItemLine = styled.div`
&::before{
animation: ${animate} 1s linear infinite;
}
`
```