import styled from 'styled-components';

const Input = ({ label, height, textarea, ...props }) => {
    return (
        <Container height={height}>
            <label>{label}</label>
            <input {...props} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-bottom: 1px #2f416e solid;
    width: 250px;
    height: ${(props) => (props.height ? props.height : '60px')};
    justify-content: space-between;
    padding: 2px;

    label {
        font-size: 14px;
        font-weight: 600;
        align-self: flex-start;
    }

    input {
        border: none;
        outline: none;
        font-size: 22px;
        direction:RTL;
        width: 95%
    }
    :focus-within {
        border-bottom: #048bf3 1px solid;
    }

    :focus-within input {
        color: #048bf3;
    }

    :focus-within label {
        color: #048bf3;
    }
`;

export default Input;
