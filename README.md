## Nested Route

---

當需要將兩個以上的Component合併在一個路徑的page上顯示時，使用Nested Route合併

example : 假設我需要將nav bar放置於所有url中page的頂端，

```jsx
//  src/App.js
import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component.jsx'

const App = () => {
  return (
//set Routes
		<Routes>
      {/* when url go to "/" lead to Home page */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
				<Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;
```

index : 與parent route相同的url (當我導向”/”的時候，顯示Home Component)

## Dynamic Route

---

製作動態Route

1. 在Router中使用 “*”代表Dynamic的變數
2. 在path中設定 “:name” (ex : “:catName”)
3. 在element的Component檔案中 import { useParams } from "react-router-dom";
4. 在Component中取用該變數使用const { name } = useParams() (ex : const { catName } = useParams())

設定dynamic route

Sol1: 集中放在App.js中

```jsx
//  src/App.js
import { Routes, Route } from 'react-router-dom'
// ...
const App = () => {
  return (
    //set Routes
    <Routes>
      {/* when url go to "/" lead to Home page */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path="shop/*">
            <Route index element={<CatsPreview />} />
            <Route path=":catName" element={<Cat />} />
        </Route>
          <Route path='checkout' element={<Checkout />} />
        </Route>
    </Routes>
  )
}

export default App;
```

Sol2 : 分散在子router

```jsx
//  src/App.js
import { Routes, Route } from 'react-router-dom'
// ...

const App = () => {
  return (
    //set Routes
    <Routes>
      {/* when url go to "/" lead to Home page */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;
```

```jsx
//  src/App.js
import { Routes, Route } from 'react-router-dom'
// ...
const Shop = () => {

    return (
        <Routes>
            <Route index element={<CatsPreview />} />
            <Route path=":catName" element={<Cat />} />
        </Routes>
    )
}

export default Shop
```

取用 catName

```jsx
import { useParams } from "react-router-dom";

const Cat = () => {
const { catName } = useParams()
return (...)
}

export default Cat
```

..