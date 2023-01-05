import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from '../../components/product-card/product-card.component'

import './shop.style.scss'

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    const titles = Object.keys(categoriesMap)

    return (
        <div className="shop-container">
            {
                titles.map(title => {
                    return (
                        <Fragment key={title}>
                            <h2>{title.toUpperCase()}</h2>
                            <div className="products-container">
                            {
                            categoriesMap[title].map(product=>{
                                return(
                                    <ProductCard key={product.id} product={product} />
                                )
                            })
                            }
                            </div>
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default Shop

