import {BackgroundImage, Body, DirectoryItemContainer} from "./category-item.styles";
import {useNavigate} from "react-router-dom";

const CategoryItem = ({ category: { id, title, imageUrl,route } }) => {
    const navigate = useNavigate();

    const onNavigateHandler = ()=> navigate(route)

    return(
        <DirectoryItemContainer key={id} onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl}/>
            <Body>
                <h2>{title}</h2>
                <p>Show Now</p>
            </Body>
        </DirectoryItemContainer>
    )
};

export default CategoryItem;
