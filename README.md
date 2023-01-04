# 新增 Shop Page 並配置功能

## 新增 shop page 的 url 路徑

1. 在 <u>src/App.js</u> 新增 Shop Route
2. `import Shop from './routes/shop/shop.component'` (shop.component 是即將新增的 file)

```diff
+ import Shop from './routes/shop/shop.component'
+ <Route path='shop' element={<Shop />} />
```

```js hl_lines="9 10"
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component.jsx'
import Shop from './routes/shop/shop.component'

const App = () => {
  return (
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  )
}
```

## 新增 Shop Component 建立 Shop Page

1. 在 src 中新增 shop-data.json 儲存 products data

- shop-data.json :

```json
[
  {
    "id": 1,
    "name": "Blue Brim",
    "imageUrl": "<some url>",
    "price": 25
  },
  {
    "id": 2,
    "name": "Blue Beanie",
    "imageUrl": "<some url>",
    "price": 18
  }, ... (共9筆資料)
]
```

2. 新建 shop.component.jsx (<u>src/routes/shop/shop.component.jsx</u>)，並將 shop-data.json 的資料 import
3. Shop Component 列出所有 products 的資訊 (image, name, price)
   > 提醒每一個迴圈製造的 element 都需要 unique key (通常=id)
4. 建立新的 ProductCard Component 配置產品卡，並包裹在 Shop Component 中使用。
5. 將 PRODUCT_DATAS 賦值在 products 變量中，傳遞給 ProductCard 作為 props 使用

```js
import ProductCard from "../../components/product-card/product-card.component";
import PRODUCT_DATAS from "../../shop-data.json";

import "./shop.style.scss";

const Shop = () => {
  const products = PRODUCT_DATAS;

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Shop;
```

## 新增 ProductCard Component 配置產品卡

1. 在 <u>src/components/product-card</u> 新增 product-card.component.jsx
2. 產品卡須包含的內容有 : 產品圖片、價格、名稱、加入購物車按鈕
3. 將先前專案製作的 Button Component 拿來使用，作為加入購物車的按紐

```diff
+ import Button from '../button/button.component'
```

4.  將來自父輩 Component 傳遞的 props 拆解。Shop Component 傳遞 的 product 包含 ProductCard 所需的"name, price, imageUrl"。

```diff
+ const { name, price, imageUrl } = product
```

5. 將 name, price, imageUrl, Button 在 return 中顯示在 page 上

```js
import "./product-card.style.scss";
import Button from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  return (
    <div className="product-card-container">
      <div className="product-line"> </div>
      <div className="img-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="cart-btn">
        <Button buttonType="inverted"> Add to Cart</Button>
      </div>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">$ {price}</span>
      </div>
    </div>
  );
};
export default ProductCard;
```

# 將 PRODUC_DATAS 從 Shop Component 移到 ProductsContext

目前的 products data 是從 shop-data.json 中 hard coding 出來的，後續會結合 Google FireBase 將產品數據移至雲端數據庫中儲存，再透過 fetch api 的方式抓到 web app 中取用跟更新，因此將原本 Shop Component 中的 PRODUCT_DATAS 移到 Context 中，可利於購物車功能、結帳功能鍵立之後，直接取用產品數據庫

## 創建 ProductsContext

1. 在 <u>src/context</u> 新增 products.context.jsx 檔案
2. 將產品數據賦值於 PRODUCTS_DATA 變量中
3. 創建 ProductsContext, 並設定 "products"跟"setProducts"的初始值
4. 提供 ProductsContext, 並使用 useState(PRODUCTS_DATA)，當 products 改變時，可以 setState 調整
5. 將 ProductsContext.Provider 的 value 設置為 products, 以提供 products 給所有子輩 Components

```js
import { useState, createContext } from "react";

import PRODUCTS_DATA from "../shop-data.json";

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
```

6. 在 index.js 中 `import { ProductsProvider } from './context/products.context';`，並將 ProductsProvider 包裹在原本的 UserProvider 之中

```diff
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
+       <ProductsProvider>
            <App />
+       </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

## 調整 Shop Component

1. 將 react useContext 功能置入，並置入 ProductsContext 以取用 Context 中的 value

```diff
+ import { useContext } from "react";
+ import { ProductsContext } from "../../context/products.context";
```

2. 將原本置入的 json 檔案刪除，因為我們將從 Context 中取用產品數據

```diff
- import PRODUCT_DATAS from "../../shop-data.json";
```

3. 設定 products 變量，以取用產品數據 : 數據改由 ProductsContext 中提取

```diff
- const products = PRODUCT_DATAS;
+ const { products } = useContext(ProductsContext)
```

```js
import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.style.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Shop;
```

# 在 Navigation 中新增購物車功能

目的 : 在 web app 的 nav bar 中增加購物車 icon, 讓他可以顯示用戶放置購物車產品的數量，並在點擊 icon 時可以彈出下拉選單，下拉選單中顯示放置購物車的產品及數量以及 check out 的按紐

## 在 Navigation 中新增購物車 icon

1. 在 Navigation Component 新增 `<CartIcon />` 跟 `<CartDropdown />`

```diff
+ import CartIcon from "../../components/cart-icon/cart-icon.component";
+ import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'
+ <CartIcon />
+ <CartDropdown />
```

> CartIcon 跟 CartDropDown 會在之後製作

```js
//...
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'

const Navigation = () => {
  //...
  return (
    <Fragment>
      <nav className="navigation">
        ...
        <div className="nav-links-container">
          ...
          <CartIcon />
        </div>
        <CartDropdown />
      </nav>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
```

## 製作 CartIcon Component

Cart Icon 顯示 購物車 icon 跟用戶挑選的產品數量

1. 在<u>src/components/cart-icon</u> 中新增 cart-icon.component.jsx
2. 使用 ReactCompoent 功能設定新的 html element "<ShoppingIcon>"

```diff
+ import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
```

3. 在 return 中設定 CartIcon 的 html 配置

```js
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
export default CartIcon;
```
## 新增CartDropdown
重點 : CartDropdown需顯示產品資訊以及checkout btn
1. 在 <u> src/components/cart-dropdown</u> 中新增cart-dropdown.component.jsx
2. 設置CartDropdown的配置
```js
import Button from '../button/button.component'
import './cart-dropdown.styles.scss'

const CartDropDown =() => {
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-item'>

            </div>
            <Button>CKECKOUT</Button>
        </div>
    )
}

export default CartDropDown
```

## 設置CartDropdown的toggle功能
重點 : 用戶點擊cart icon時彈出CartDropdown，再次點擊時收回CartDropdown，為了判斷用戶是否點擊，建立一個CartContext, 目的是當用戶點擊時，如果CartDropdown是沒有顯示的狀態時，改成顯示的狀態。然後在navigation中取得CarDropdown的狀態來決定是否顯示或關閉CartDropdown
1. 在 <u> src/context </u> 中新增 cart.context.jsx
```js
import {createContext, useState} from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>null
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const value = {isCartOpen, setIsCartOpen}
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
```
2. 在index.js中將CartContext包裹在 `<ProductsProvider>` 中
```diff
+ import { CartProvider } from './context/cart.context';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <ProductsProvider>
+         <CartProvider>
            <App />
+         </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```
index.js 全部code
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import { ProductsProvider } from './context/products.context';
import { CartProvider } from './context/cart.context';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

3. 在CartIcon component中提取CartContext，使用戶點擊icon時改變isCartOpen 是否彈出的狀態
+ cart-icon.component.jsx原本的code
```js
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
export default CartIcon;
```
+ 置入 useContext, CartContext
```diff
+ import { useContext } from 'react';
+ import { CartContext } from '../../context/cart.context';
```
+ 在CartIcon Component中提取 CartContext中的 isCartOpen 跟 setIsCartOpen value
```diff
+ const {isCartOpen, setIsCartOpen} = useContext(CartContext)
```
+ 設置toggleCart function，目的是透過setState，當使用者點擊icon時，改變isCartOpen的狀態，如果原本是 true (開啟狀態)就改變成false (關閉狀態)，反之則改成true
```diff
+     const toggleCart = () => {
+       setIsCartOpen(!isCartOpen);
+   }
```
+ 將toggleCart function放置於 icon `<div>`中作為Onclick觸發的function
+ cart-icon.component.jsx更新的code
```js
import { useContext } from 'react';

import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";

import { CartContext } from '../../context/cart.context';

import './cart-icon.styles.scss';
const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext)

    const toggleCart = () => {
        console.log("click");
        setIsCartOpen(!isCartOpen);
    }
    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

## 新增 Shop Component 建立 Shop Page

1. 在 src 中新增 shop-data.json 儲存 products data

- shop-data.json :

```json
[
  {
    "id": 1,
    "name": "Blue Brim",
    "imageUrl": "<some url>",
    "price": 25
  },
  {
    "id": 2,
    "name": "Blue Beanie",
    "imageUrl": "<some url>",
    "price": 18
  }, ... (共9筆資料)
]
```

2. 新建 shop.component.jsx (<u>src/routes/shop/shop.component.jsx</u>)，並將 shop-data.json 的資料 import
3. Shop Component 列出所有 products 的資訊 (image, name, price)
   > 提醒每一個迴圈製造的 element 都需要 unique key (通常=id)
4. 建立新的 ProductCard Component 配置產品卡，並包裹在 Shop Component 中使用。
5. 將 PRODUCT_DATAS 賦值在 products 變量中，傳遞給 ProductCard 作為 props 使用

```js
import ProductCard from "../../components/product-card/product-card.component";
import PRODUCT_DATAS from "../../shop-data.json";

import "./shop.style.scss";

const Shop = () => {
  const products = PRODUCT_DATAS;

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Shop;
```

## 新增 ProductCard Component 配置產品卡

1. 在 <u>src/components/product-card</u> 新增 product-card.component.jsx
2. 產品卡須包含的內容有 : 產品圖片、價格、名稱、加入購物車按鈕
3. 將先前專案製作的 Button Component 拿來使用，作為加入購物車的按紐

```diff
+ import Button from '../button/button.component'
```

4.  將來自父輩 Component 傳遞的 props 拆解。Shop Component 傳遞 的 product 包含 ProductCard 所需的"name, price, imageUrl"。

```diff
+ const { name, price, imageUrl } = product
```

5. 將 name, price, imageUrl, Button 在 return 中顯示在 page 上

```js
import "./product-card.style.scss";
import Button from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  return (
    <div className="product-card-container">
      <div className="product-line"> </div>
      <div className="img-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="cart-btn">
        <Button buttonType="inverted"> Add to Cart</Button>
      </div>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">$ {price}</span>
      </div>
    </div>
  );
};
export default ProductCard;
```

# 將 PRODUC_DATAS 從 Shop Component 移到 ProductsContext

目前的 products data 是從 shop-data.json 中 hard coding 出來的，後續會結合 Google FireBase 將產品數據移至雲端數據庫中儲存，再透過 fetch api 的方式抓到 web app 中取用跟更新，因此將原本 Shop Component 中的 PRODUCT_DATAS 移到 Context 中，可利於購物車功能、結帳功能鍵立之後，直接取用產品數據庫

## 創建 ProductsContext

1. 在 <u>src/context</u> 新增 products.context.jsx 檔案
2. 將產品數據賦值於 PRODUCTS_DATA 變量中
3. 創建 ProductsContext, 並設定 "products"跟"setProducts"的初始值
4. 提供 ProductsContext, 並使用 useState(PRODUCTS_DATA)，當 products 改變時，可以 setState 調整
5. 將 ProductsContext.Provider 的 value 設置為 products, 以提供 products 給所有子輩 Components

```js
import { useState, createContext } from "react";

import PRODUCTS_DATA from "../shop-data.json";

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
```

6. 在 index.js 中 `import { ProductsProvider } from './context/products.context';`，並將 ProductsProvider 包裹在原本的 UserProvider 之中

```diff
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
+       <ProductsProvider>
            <App />
+       </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

## 調整 Shop Component

1. 將 react useContext 功能置入，並置入 ProductsContext 以取用 Context 中的 value

```diff
+ import { useContext } from "react";
+ import { ProductsContext } from "../../context/products.context";
```

2. 將原本置入的 json 檔案刪除，因為我們將從 Context 中取用產品數據

```diff
- import PRODUCT_DATAS from "../../shop-data.json";
```

3. 設定 products 變量，以取用產品數據 : 數據改由 ProductsContext 中提取

```diff
- const products = PRODUCT_DATAS;
+ const { products } = useContext(ProductsContext)
```

```js
import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.style.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Shop;
```

# 在 Navigation 中新增購物車功能

目的 : 在 web app 的 nav bar 中增加購物車 icon, 讓他可以顯示用戶放置購物車產品的數量，並在點擊 icon 時可以彈出下拉選單，下拉選單中顯示放置購物車的產品及數量以及 check out 的按紐

## 在 Navigation 中新增購物車 icon

1. 在 Navigation Component 新增 `<CartIcon />` 跟 `<CartDropdown />`

```diff
+ import CartIcon from "../../components/cart-icon/cart-icon.component";
+ import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'
+ <CartIcon />
+ <CartDropdown />
```

> CartIcon 跟 CartDropDown 會在之後製作

```js
//...
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'

const Navigation = () => {
  //...
  return (
    <Fragment>
      <nav className="navigation">
        ...
        <div className="nav-links-container">
          ...
          <CartIcon />
        </div>
        <CartDropdown />
      </nav>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
```

## 製作 CartIcon Component

Cart Icon 顯示 購物車 icon 跟用戶挑選的產品數量

1. 在<u>src/components/cart-icon</u> 中新增 cart-icon.component.jsx
2. 使用 ReactCompoent 功能設定新的 html element "<ShoppingIcon>"

```diff
+ import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
```

3. 在 return 中設定 CartIcon 的 html 配置

```js
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
export default CartIcon;
```
## 新增CartDropdown
重點 : CartDropdown需顯示產品資訊以及checkout btn
1. 在 <u> src/components/cart-dropdown</u> 中新增cart-dropdown.component.jsx
2. 設置CartDropdown的配置
```js
import Button from '../button/button.component'
import './cart-dropdown.styles.scss'

const CartDropDown =() => {
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-item'>

            </div>
            <Button>CKECKOUT</Button>
        </div>
    )
}

export default CartDropDown
```

## 設置CartDropdown的toggle功能
重點 : 用戶點擊cart icon時彈出CartDropdown，再次點擊時收回CartDropdown，為了判斷用戶是否點擊，建立一個CartContext, 目的是當用戶點擊時，如果CartDropdown是沒有顯示的狀態時，改成顯示的狀態。然後在navigation中取得CarDropdown的狀態來決定是否顯示或關閉CartDropdown
1. 在 <u> src/context </u> 中新增 cart.context.jsx
```js
import {createContext, useState} from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>null
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const value = {isCartOpen, setIsCartOpen}
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
```
2. 在index.js中將CartContext包裹在 `<ProductsProvider>` 中
```diff
+ import { CartProvider } from './context/cart.context';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <ProductsProvider>
+         <CartProvider>
            <App />
+         </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```
index.js 全部code
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import { ProductsProvider } from './context/products.context';
import { CartProvider } from './context/cart.context';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

3. 在CartIcon component中提取CartContext，使用戶點擊icon時改變isCartOpen 是否彈出的狀態
+ cart-icon.component.jsx原本的code
```js
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
export default CartIcon;
```
+ 置入 useContext, CartContext
```diff
+ import { useContext } from 'react';
+ import { CartContext } from '../../context/cart.context';
```
+ 在CartIcon Component中提取 CartContext中的 isCartOpen 跟 setIsCartOpen value
```diff
+ const {isCartOpen, setIsCartOpen} = useContext(CartContext)
```
+ 設置toggleCart function，目的是透過setState，當使用者點擊icon時，改變isCartOpen的狀態，如果原本是 true (開啟狀態)就改變成false (關閉狀態)，反之則改成true
```diff
+     const toggleCart = () => {
+       setIsCartOpen(!isCartOpen);
+   }
```
+ 將toggleCart function放置於 icon `<div>`中作為Onclick觸發的function
+ cart-icon.component.jsx更新的code
```js
import { useContext } from 'react';

import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";

import { CartContext } from '../../context/cart.context';

import './cart-icon.styles.scss';
const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext)

    const toggleCart = () => {
        console.log("click");
        setIsCartOpen(!isCartOpen);
    }
    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon
```

4. 在navigation.component.jsx中置入CartContext
+ ` import { CartContext } from '../../context/cart.context' `
+ 將原本的 ` <CartDropDown /> `改成 `{isCartOpen && <CartDropDown />}`

# js "&&" short hand : 
a && b -> 當 a 與 b 值為true時，return b，反之，不return