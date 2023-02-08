import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import CategoryPreview from "../../components/category-preview.component/category-preview.component";


const CatsPreview = () => {
    const  categoriesMap  = useSelector(selectCategoriesMap)
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