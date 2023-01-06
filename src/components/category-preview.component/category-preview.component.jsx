import './category-preview.style.scss'
import ProductCard from '../product-card/product-card.component'
import { useNavigate } from 'react-router-dom'

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate()
    const navToCatPageHandler = () => {
        navigate(`/shop/${title}`)
    }
    return (
        <div className='cat-preview-container'>
            <h2>{title.toUpperCase()}
            </h2>
            <div className="preview">
                {
                    products
                        .filter((_, index) => index < 4)
                        .map(product => <ProductCard key={product.id} product={product} title={title} />)
                }
            </div>
            <h3 onClick={navToCatPageHandler} >See More...</h3>
        </div>
    )
}

export default CategoryPreview