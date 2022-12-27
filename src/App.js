import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/sign-in/sign-in.component.jsx'

const App = () => {
  return (
    //set Routes
    <Routes>
      {/* when url go to "/" lead to Home page */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App;
