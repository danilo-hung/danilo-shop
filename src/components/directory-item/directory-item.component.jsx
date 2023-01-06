import { useNavigate } from 'react-router-dom';
import { DirectoryItemBodyBox, DirectoryItemContainer, ContentBox, Title, SubTitle,BackgroundImg, Img,DirectoryItemLine } from './directory-item.style.jsx'

const DirectoryItem = ({ prop }) => {
    const { imgUrl, title } = prop;
    const navigate = useNavigate()
    const navToCatPage = () => {
        navigate(`/shop/${title.toLowerCase()}`)
    }
    return (
        <DirectoryItemBodyBox >
            <DirectoryItemContainer >
                <DirectoryItemLine> </DirectoryItemLine>
                <BackgroundImg>
                    <Img src={imgUrl} alt="directory-item-img" />
                </BackgroundImg>
                <ContentBox onClick={navToCatPage}>
                    <Title>{title}</Title>
                    <SubTitle>Shop Now</SubTitle>
                </ContentBox>
            </DirectoryItemContainer>
        </DirectoryItemBodyBox>
    )
}

export default DirectoryItem