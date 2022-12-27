# 使用Route
透過Router, 開發者可已在React App.js中指定url位址中要呈現的Component。
另外，透過 `<Outlet />` 可以將不同的Component合併到同一個Page中。
>Route的使用主要先在index.js中設定 React Router的環境，以利於在App.js中實現透過指定Route顯示指定Component

## Route設定
<sub>[關於React Rounter Document](https://reactrouter.com/en/main)</sub> 
1.  `npm add react-router-dom@6`  >安裝最新的版本 react-router-dom 6
2. 在 index.js 中 ` import { BrowserRouter } from 'react-router-dom' ` 
3. 在 index.js 中 將 原本的 <BrowserRouter> 用 <React.StrictMode>包裝起來

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

## Router的使用
1. 在App.js中 `import { Routes, Route } from 'react-router-dom'`
2. 在App Component 中先以 ` <Routes></Routes> `設定路徑環境
3. 在 ` <Routes></Routes> ` 中 透過 ` <Route> ` 指定url路徑中需要呈現的 Component
> ` <Route path="/" element={<Navigation />}> ` Path:指定路徑 Element:Component index:父輩路徑
```js
const App = () => {
  return (
    //set Routes
    <Routes>
      {/* when url go to "/" lead to Home page */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}
```
## Nesting Route
1. 若需在路徑中崁入兩個Component，以本project為例，在navigation.component.jsx中 ` import { Outlet, Link } from 'react-router-dom' ` ，並在content最後鍵入 ` <Outlet /> `
2. 在navigation.component.jsx 另外 ` import { Fragment } from 'react' ` 是因為Functional Component限制Return僅能有一個parent element (ex: <div>) 透過 ` <Fragment /> ` 可以讓最後的 html文本更乾淨，不需要再用div包裝一次
3. 在navigation.component.jsx中 ` import { Link } from 'react-router-dom' ` ， <Link></Link>功能類似於 <a><a>, 不同的是 用 to 來導向 project中的其他Route。

```js
import { Outlet, Link } from 'react-router-dom'
import { Fragment } from 'react'

import { ReactComponent as CrwnLogo } from '../../assets/CrwnLogo.svg'
import './navigation.style.scss'

const Navigation = () => {
    return (
        <Fragment>
            <nav className='navigation'>
                <Link className='logo-container' to="/">
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                </div>
            </nav>
            <Outlet />
        </Fragment>
    )
}


export default Navigation
```