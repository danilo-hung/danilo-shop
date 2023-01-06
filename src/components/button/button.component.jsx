import { BaseButton, GoogleButton, InvertedButton, PinkButton } from './button.style.jsx'

const getBtn = (buttonType) => {
    switch (buttonType) {
        case 'google': return GoogleButton;
        case 'inverted': return InvertedButton;
        case 'pink': return PinkButton;
        default: return BaseButton
    }
}

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getBtn(buttonType);

    return (
        <CustomButton {...otherProps} >{children}</CustomButton>
    )
}

export default Button