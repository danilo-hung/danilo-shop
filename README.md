# 新增 Shop Page 並配置功能

## 新增 Shop Route

1. 在 <u>src/App.js</u>中新增 Shop Route
2. `import Shop from './routes/shop/shop.component'` (shop.component 是即將新增的 file)

<pre>
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
</pre>
