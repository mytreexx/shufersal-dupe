import { useEffect, useState } from "react";
import styled from "styled-components";

import Navbar from "../ui/Navbar";
import Header from "../ui/Header";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { getCategoriesFromServer } from '../../utils';


const AddProduct = ({ currentUser }) => {
    const [productName, setProductName] = useState();
    const [categoryId, setCategoryId] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [brand, setBrand] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        getCategoriesFromServer(currentUser)
            .then(response => response.json())
            .then(data => {
                setCategories(data)
                if (categories) {
                    setCategoryId(categories[0].id)
                }
            })
    }, []);

    const addProduct = (e) => {
        e.preventDefault()
        console.log(productName, categoryId, price, image, brand)
    }

    return (
        <>
            <Navbar />
            <Header>עריכת מוצרים</Header>
            <Form onSubmit={addProduct}>

                <Input
                    required
                    label="שם המוצר"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <Input
                    required
                    label="מותג"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />

                <Label>
                    קטגוריה
                    <Select onChange={(e) => setCategoryId(e.target.value)}>
                        {categories && categories.map(category =>
                            <option key={category.id} value={category.id}>{category.category}</option>
                        )}
                    </Select>
                </Label>
                <Input
                    required
                    label="מחיר"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />


                <Input
                    required
                    label="תמונה"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <Button type="submit">הוספת מוצר</Button>

            </Form>
        </>
    )
}

export default AddProduct;

const Form = styled.form`

    width: 250px;
    margin: auto;
    margin-top: 50px;
    > * {
        margin-bottom: 20px;
    }
`;

const Select = styled.select`
    width: 250px;
    height: 40px;
    border: 1px transparent solid;
    outline: none;
    border-bottom: 1px rgb(47 65 110) solid;
    font-size: 16px;
    padding-right: 5px;
    margin-top: 10px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 14px;
`;
