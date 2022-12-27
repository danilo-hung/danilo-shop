import CatItem from '../cat-item/cat-item.component';
import './directory.style.scss';



const Directory = ({ prop }) => {
    const cats = prop;
    return (
        <div className='container'>
            <div className="directory-container" >
                {cats.map((cat) => (
                    <CatItem key={cat.id} prop={cat} />
                )
                )}

            </div>
            <div className="copyRight">
                <i className="fa-regular fa-registered"></i>
                <span> Danilo 2022</span>
            </div>
        </div>
    )
}

export default Directory