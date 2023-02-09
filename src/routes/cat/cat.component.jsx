import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";
import Button from "../../components/button/button.component";
import { CatProductContainer, CatTitle, NotFoundContainer } from "./cat.style.jsx"

const Cat = () => { 
    const { catName } = useParams()
    console.log('render/re-render cat component')
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[catName])
    const navigate = useNavigate()
    const backToShopHandler = () => {
        navigate("/shop")
    }

    useEffect(() => {
        console.log('effect triggered, calling setProducts')
        const catProducts = categoriesMap[catName]
        setProducts(catProducts)
    }, [catName, categoriesMap])

    if (categoriesMap[catName]) {
        return (
            <Fragment>
                <CatTitle>{catName.toUpperCase()}</CatTitle>
                <CatProductContainer>
                    {
                        products && products.map((product) => {
                            return <ProductCard key={product.id} product={product} />
                        })
                    }
                </CatProductContainer>
            </Fragment>
        )
    } else {
        return (
            <NotFoundContainer>
                <h1>PAGE NOT FOUND</h1>
                <Button onClick={backToShopHandler}>Back to Shop</Button>
            </NotFoundContainer>

        )
    }
}

export default Cat