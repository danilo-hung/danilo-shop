import { useState, createContext, useEffect } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocument } from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap : {},
});

export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({})

    //push data to fire store
    // useEffect(()=>{
    //     addCollectionAndDocuments("categories", SHOP_DATA)
    // },[])

    //pull data from fire store
    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocument();
            setCategoriesMap(categoryMap)
        };
        getCategoriesMap();
        
    }, [])
    const value = {categoriesMap}

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}