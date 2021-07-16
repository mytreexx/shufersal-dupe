import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SecondaryNavbar from '../ui/SecondaryNavbar';
import Logo from '../../assets/Shufersal-logo-large.png';
import { getCategoriesFromServer, getAllProducts, onGetCategoryItems } from '../../utils';


const Store = ({ currentUser }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState();

    useEffect(() => {
        getCategoriesFromServer(currentUser)
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
    }, []);

    useEffect(() => {
        getAllProducts(currentUser)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }, []);

    const getCategoryItems = (catagoryId) => {
        onGetCategoryItems(currentUser, catagoryId)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }

    return (
        <>
            <NavContainer>
                <img src={Logo} />
                <SecondaryNavbar />
            </NavContainer>

            <CategoriesNav>
                {categories && categories.map(category =>
                    <div onClick={() => { getCategoryItems(category.id) }}>
                        {category.category}
                    </div>
                )}
            </CategoriesNav>

            {products && products.map(product => <div>{product.product_name}</div>)}
        </>
    )
}

export default Store;

const NavContainer = styled.div`
    display: flex;
    height: 110px;
    align-items: center;
    border-bottom: 1px #f0f3f9 solid;
    padding-right: 40px;
`;

const CategoriesNav = styled.div`
    display: flex; 
    padding: 20px;
    padding-right: 50px;

    div {
        font-size: 16px;
        margin: 10px 0 10px 10px;
        padding: 5px 0 5px 10px;
        border-left: 2px solid #e0e2e9;

        :hover {
            color: #048BF3
        }
    }

    div:last-child {
        border-left: none;
    }
`;