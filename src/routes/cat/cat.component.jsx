import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import Button from "../../components/button/button.component";
import "./cat.style.scss"

const Cat = () => {
    const { catName } = useParams()
    const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState(categoriesMap[catName])

    const navigate = useNavigate()
    const backToShopHandler = () => {
        navigate("/shop")
    }

    useEffect(() => {
        const catProducts = categoriesMap[catName]
        setProducts(catProducts)
    }, [catName, categoriesMap])

    if (categoriesMap[catName]) {
        return (
            <Fragment>
                <h2 className="cat-title">{catName.toUpperCase()}</h2>
                <div className="cat-product-container">
                    {
                        products && products.map((product) => {
                            return <ProductCard key={product.id} product={product} />
                        })
                    }
                </div>
            </Fragment>
        )
    } else {
        return (
            <div className="not-found-container">
                <h1>PAGE NOT FOUND</h1>
                <Button onClick={backToShopHandler}>Back to Shop</Button>
            </div>

        )
    }
}

export default Cat