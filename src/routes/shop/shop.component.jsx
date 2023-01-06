import { Routes, Route } from 'react-router-dom'
import CatsPreview from '../cats-preview/cats-preview.component'
import Cat from '../cat/cat.component'

import './shop.style.scss'

const Shop = () => {

    return (
        <Routes>
            <Route index element={<CatsPreview />} />
            <Route path=":catName" element={<Cat />} />
        </Routes>
    )
}

export default Shop

