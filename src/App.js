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
