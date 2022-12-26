import CatItem from '../cat-item/cat-item.component';
import './directory.style.scss'


const Directory = ({ prop }) => {
    const cats = prop;
    return (
        <div className="directory-container" >
            {cats.map((cat) => (
                <CatItem key={cat.id} prop={cat} />
            )
            )}
        </div>
    )
}

export default Directory