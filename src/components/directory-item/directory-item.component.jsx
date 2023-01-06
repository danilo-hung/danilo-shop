import { useNavigate } from 'react-router-dom';
import './directory-item.style.scss'

const DirectoryItem = ({ prop }) => {
    const {imgUrl, title} = prop;
    const navigate = useNavigate()
    const navToCatPage = ()=> {
        navigate(`/shop/${title.toLowerCase()}`)
    }
    return (
        <div className='directory-item-body-box' >
            <div className="directory-item-container" >
                <div className='directory-item-line'> </div>
                <div className="background-img">
                    <img src={imgUrl} alt="directory-item-img" />
                </div>
                <div onClick={navToCatPage} className='content-box'>
                    <h2 className='title'>{title}</h2>
                    <h2 className='sub-title'>Shop Now</h2>
                </div>
            </div>
        </div>
    )
}

export default DirectoryItem