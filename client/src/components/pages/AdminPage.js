import { useState, useEffect } from "react";
import styled from "styled-components";
import { BsPlusCircle } from 'react-icons/bs';

import Navbar from "../ui/Navbar";
import { getAllProducts } from "../../utils";
import CategoriesNav from "../ui/CategoriesNav";
import Header from "../ui/Header";
import ProductItem from "../ProductItem";
import SearchInput from "../ui/SearchInput";
import { Link } from "react-router-dom";

const AdminPage = ({ currentUser }) => {
    const [products, setProducts] = useState();

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
                        catagoryId={product.category_id}
                        price={product.price}
                        image={product.image}
                        brand={product.brand}
                    />
                )}
            </Container>

            <AddButtonLink to='/add'>
                <BsPlusCircle />
            </AddButtonLink>

        </>

    )
}

export default AdminPage;

const Container = styled.div`
    display: flex;
`;

const AddButtonLink = styled(Link)`
    position: absolute;
    bottom: 50px;
    right: 50px;
    border-radius: 100%;
    height: 70px;
    width: 70px;
    transition: .3s;
    cursor: pointer;

    svg {
        width: 75px;
        height: 75px;
        color: #D51C4A;
    }

    :hover {
        filter: brightness(.9)
    }
`;