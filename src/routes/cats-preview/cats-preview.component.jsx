import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview.component/category-preview.component";


const CatsPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    const titles = Object.keys(categoriesMap)

    return (
        <Fragment>
            {
                titles.map(title => {
                    const products = categoriesMap[title]
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    )
                    
                })
            }
        </Fragment>
    )
}

export default CatsPreview