import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";

import { getSearchedProducts } from '../../utils';

const SearchInput = ({ currentUser, setProducts }) => {
    const [searchTerm, setSearchTerm] = useState();

    const searchForProducts = () => {
        console.log(currentUser)
        getSearchedProducts(currentUser, searchTerm)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }

    return (
        <Container>
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="מה תרצה לחפש?"
            />
            <BsSearch onClick={searchForProducts} />
        </Container>
    )
}

export default SearchInput;


const Container = styled.div`
    margin: 10px auto;
    display: flex;
    justify-content: space-around;
    width: 90%;
    border: 1px solid #e0e2e9;
    border-radius: 5px;
    height: 75px;
    position: relative;
    z-index: 2;
    background-color: white;
    opacity: 0.9;

    input {
        width: 90%;
        border: none;
        font-size: 30px;
        outline: none;
    }


    svg {
        color: #048BF3;
        height: 50px;
        width: 50px;
        padding: 5px;
        border-radius: 10px;
        margin: auto 0;
        transition: 0.5s;

        :hover {
            background-color: #e0e2e9;
        }
    }
`;