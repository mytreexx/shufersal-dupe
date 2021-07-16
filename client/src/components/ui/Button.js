import styled from 'styled-components';

const Button = styled.button`
    background-color: ${(props) => (props.light ? 'transparent' : '#D51C4A')};
    border: #D51C4A 1px solid;
    outline: none;
    padding: ${(props) => (props.small ? '10px' : props.mini ? '5px 10px' : '15px')};
    color: ${(props) => (props.light ? '#D51C4A' : 'white')};
    border-radius: 4px;
    padding: ${(props) => (props.small ? 'normal' : 'bold')};
    font-size: ${(props) => ((props.small || props.mini) ? '16px' : '21px')};
    cursor: pointer;
    transition: .5s;

    :hover {
        background-color: ${(props) => (props.light ? '#D51C4A' : '#BB103B')};
        color: white;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default Button;
