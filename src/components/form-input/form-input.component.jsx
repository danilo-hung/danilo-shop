import { Group,InputBox, FormInputLabel } from './form-input.style.jsx'

const FormInput = ({ label, htmlFor, ...otherProps }) => {
    return (
        <Group>
            <InputBox
                className='input-box'
                {...otherProps} />

            {label ? (
                <FormInputLabel
                    htmlFor={htmlFor}>
                    {label}
                </FormInputLabel>
            ) : null}

        </Group>
    )
}

export default FormInput