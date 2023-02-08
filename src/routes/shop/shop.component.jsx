import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocument } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';

import { Routes, Route } from 'react-router-dom'
import CatsPreview from '../cats-preview/cats-preview.component'
import Cat from '../cat/cat.component'

import './shop.style.scss'

const Shop = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocument();
            dispatch(setCategories(categoriesArray))
          };
          getCategoriesMap(); 
    },[dispatch])
    return (
        <Routes>
            <Route index element={<CatsPreview />} />
            <Route path=":catName" element={<Cat />} />
        </Routes>
    )
}

export default Shop

