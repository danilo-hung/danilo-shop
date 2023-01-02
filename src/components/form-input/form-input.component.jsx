import './form-input.style.scss'

const FormInput = ({ label, htmlFor, ...otherProps }) => {
    return (
        <div className="group">
            <input
                className='input-box'
                {...otherProps} />

            {label ? (
                <label
                    className="form-input-label"
                    htmlFor={htmlFor}>
                    {label}
                </label>
            ) : null}

        </div>
    )
}

export default FormInput