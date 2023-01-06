import DirectoryItem from '../directory-item/directory-item.component';

import { Container, DirectoryContainer } from './directory.style.jsx';

const Directory = ({ prop }) => {
    const cats = prop;
    return (
        <Container>
            <DirectoryContainer >
                {cats.map((cat) => (
                    <DirectoryItem key={cat.id} prop={cat} />
                )
                )}
            </DirectoryContainer>
            <div className="copyRight">
                <i className="fa-regular fa-registered"></i>
                <span> Danilo 2022</span>
            </div>
        </Container>
    )
}

export default Directory