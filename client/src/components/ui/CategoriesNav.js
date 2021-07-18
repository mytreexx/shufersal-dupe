import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getCategoriesFromServer, onGetCategoryItems } from '../../utils'

const CategoriesNav = ({ currentUser, setProducts }) => {
    const [categories, setCategories] = useState();

    useEffect(() => {
        getCategoriesFromServer(currentUser)
            .then(response => response.json())
            .then(data => {
                setCategories(data)
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
        <Container>
            {categories && categories.map(category =>
                <div
                    key={category.id}
                    onClick={() => {
                        getCategoryItems(category.id)
                    }}
                >
                    {category.category}
                </div>
            )}
        </Container>
    )
}

export default CategoriesNav;

const Container = styled.div`
    display: flex; 
    padding: 20px;
    padding-right: 50px;

    div {
        font-size: 16px;
        margin: 10px 0 10px 10px;
        padding: 5px 0 5px 10px;
        border-left: 2px solid #e0e2e9;
        cursor: pointer;

        :hover {
            color: #048BF3;
        }
    }

    div:last-child {
        border-left: none;
    }
`;
