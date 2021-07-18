import { useState, useEffect } from "react";
import styled from "styled-components";
import { BsPlusCircle } from 'react-icons/bs';

import Navbar from "../ui/Navbar";
import CategoriesNav from "../ui/CategoriesNav";
import Header from "../ui/Header";
import ProductItem from "../ProductItem";
import SearchInput from "../ui/SearchInput";
import { Link } from "react-router-dom";
import { getAllProducts, getCategoriesFromServer } from '../../utils';

const EditProductsPage = ({ currentUser }) => {
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState([])

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

    return (
        <>
            <Navbar />
            <Header>עריכת מוצרים</Header>
            <CategoriesNav setProducts={setProducts} currentUser={currentUser} />
            <SearchInput setProducts={setProducts} currentUser={currentUser} />
            <Container>
                {products && products.map(product =>
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        name={product.product_name}
                        categoryId={product.category_id}
                        price={product.price}
                        image={product.image}
                        brand={product.brand}
                        categories={categories}
                        currentUser={currentUser}
                        isEditMode={true}
                    />
                )}
            </Container>

            <AddButtonLink to='/addProduct'>
                <BsPlusCircle />
            </AddButtonLink>
        </>
    )
}

export default EditProductsPage;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const AddButtonLink = styled(Link)`
    position: fixed;
    bottom: 50px;
    left: 50px;
    border-radius: 100%;
    height: 70px;
    width: 70px;
    transition: .3s;
    cursor: pointer;

    svg {
        width: 75px;
        height: 75px;
        color: #D51C4A;
        background-color: white;
        border-radius: 100%;
    }

    :hover {
        filter: brightness(.9)
    }
`;