import styled from "styled-components";

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 5px dotted #D51C4A;
    animation: rotation 2s infinite linear;
    align-self: center;
    border-radius: 100%;
    margin-top: 20px;

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
`;

export default Spinner;