import ProductCard from '../product-card/product-card.component'
import { useNavigate } from 'react-router-dom'

import {CatPreivewContainer, H2, H3, Preview} from './category-preview.style.jsx'

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate()
    const navToCatPageHandler = () => {
        navigate(`/shop/${title}`)
    }
    return (
        <CatPreivewContainer>
            <H2>
                {title.toUpperCase()}
            </H2>
            <Preview>
                {
                    products
                        .filter((_, index) => index < 4)
                        .map(product => <ProductCard key={product.id} product={product} title={title} />)
                }
            </Preview>
            <H3 onClick={navToCatPageHandler} >See More...</H3>
        </CatPreivewContainer>
    )
}

export default CategoryPreview