import styled from "styled-components";

export const Group = styled.div`
margin: 50px auto;
position: relative;
`
export const FormInputLabel = styled.label`
position: absolute;
left: 0;
padding: 12px;
pointer-events: none;
font-size: 1.5rem;
color: rgb(124, 124, 124);
text-transform: uppercase;
transition: 500ms;
`


export const InputBox = styled.input`
width: 100%;
padding: 20px 10px 0;
border: none;
border-bottom: 1px solid rgb(0, 0, 0);
background: none;
outline: none;
color: rgb(255, 99, 125);
line-height: 1rem;
font-size: 2.5rem;
transition: 300ms;
&::-webkit-search-cancel-button {
    -webkit-appearance: none;
}
&:focus {
    border-bottom: 3px solid rgb(0, 0, 0);
}
&:focus ~ ${FormInputLabel},
&:valid ~ ${FormInputLabel}{
    color: rgb(0, 0, 0);
    border-left: 1px solid rgb(0, 0, 0);
    border-right: 1px solid rgb(0, 0, 0);
    transform: translateX(15px) translateY(-6px);
    font-size: 0.8rem;
    padding: 0 10px;
    background: none;
    letter-spacing: 0.2rem;
}
`




// .form-input-label {

// }