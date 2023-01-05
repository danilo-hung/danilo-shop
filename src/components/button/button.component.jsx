import './button.style.scss'

const Button = ({ children, buttonType, ...otherProps }) => {

    const BUTTON_TYPE_CLASSES = {
        google: 'google-sign-in',
        inverted: 'inverted',
        pink: 'pink-style'
    }

    return (
        <button
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}>
                {children}
        </button>
    )
}

export default Button