import './cat-item.style.scss'

const CatItem = ({ prop }) => {
    const {imgUrl, title} = prop;

    return (
        <div className='cat-body-box' >
            <div className="cat-container" >
                <div className='cat-line'> </div>
                <div className="background-img">
                    <img src={imgUrl} alt="cat-img" />
                </div>
                <div className='content-box'>
                    <h2 className='title'>{title}</h2>
                    <h2 className='sub-title'>Shop Now</h2>
                </div>
            </div>
        </div>
    )
}

export default CatItem