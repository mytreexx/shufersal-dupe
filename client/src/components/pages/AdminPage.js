import { useState, useEffect } from "react";
import styled from "styled-components";

import Navbar from "../ui/Navbar";
import { getAllProducts } from "../../utils";
import CategoriesNav from "../ui/CategoriesNav";
import Header from "../ui/Header";
import ProductItem from "../ProductItem";

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
        <div>
            <Navbar />
            <Header>עריכת והוספת מוצרים</Header>
            <CategoriesNav setProducts={setProducts} currentUser={currentUser} />
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
        </div>

    )
}

export default AdminPage;

const Container = styled.div`
    display: flex;
`;