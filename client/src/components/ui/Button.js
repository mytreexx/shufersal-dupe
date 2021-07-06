import styled from 'styled-components';

const Button = styled.button`
    background-color: ${(props) => (props.light ? 'transparent' : '#D51C4A')};
    border: #D51C4A 1px solid;
    outline: none;
    padding: 15px;
    color: white;
    border-radius: 4px;
    font-weight: 700;
    width: 200px;
    font-size: 21px;
    cursor: pointer;
    transition: .5s;

    :hover {
        background-color: ${(props) => (props.light ? '#D51C4A' : '#BB103B')};
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default Button;
