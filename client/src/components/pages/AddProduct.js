import { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../ui/Navbar";
import Header from "../ui/Header";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { getCategoriesFromServer, createNewProduct } from '../../utils';


const AddProduct = ({ currentUser }) => {
    const [productName, setProductName] = useState();
    const [categoryId, setCategoryId] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [brand, setBrand] = useState();

    const [categories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        createNewProduct(currentUser, productName, categoryId, price, image, brand)
            .then((response) => {
                if (response.ok) {
                    setIsLoading(false);
                    toast.success('המוצר נוסף בהצלחה')
                } else {
                    response.json()
                        .then((response) => toast.error(response.error));
                }
            });
        clearForm();
    }

    const clearForm = () => {
        setProductName("")
        setCategoryId("")
        setPrice("")
        setImage("")
        setBrand("")
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setImage(reader.result);
    };

    return (
        <>
            <Navbar />
            <Header>עריכת מוצרים</Header>

            <Form onSubmit={addProduct}>
                <ToastContainer
                    position="bottom-right"
                    autoClose={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                />

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
                    step="any"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />


                <Input style={{ fontSize: '14px' }}
                    required
                    label="תמונה"
                    type="file"
                    onChange={handleFileInputChange}
                />

                <div className="buttons">
                    <Button type="submit" small>הוספת מוצר</Button>
                    <Button onClick={clearForm} type="button" light small>איפוס טופס</Button>
                </div>
                <Link to='/editProducts'>- חזרה לעריכת מוצרים</Link>
                {isLoading && <Spinner />}
                {image && !isLoading && <img src={image} alt="preview" />}
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

    .buttons {
        display: flex;
        width: 250px;
         button {
             margin-left: 10px;
         }
    }
      
    .Toastify__toast {
        background-color: #D51C4A;
    }

    img {
        width: 250px;
    }

    a {
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        color: #D51C4A;
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
