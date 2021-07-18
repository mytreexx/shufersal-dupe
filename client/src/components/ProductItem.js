import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { editProduct } from '../utils';
import Button from './ui/Button';
import QuantityControllers from './ui/QuantityControllers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductItem = ({ currentUser, categoryId, categories, id, image, name, brand, price, addOrUpdateItem, itemQuantity, isEditMode }) => {
    const [showControllers, setShowControllers] = useState(false)
    const [editedPrice, setEditedPrice] = useState(price);
    const [editedName, setEditedName] = useState(name);
    const [editedBrand, setEditedBrand] = useState(brand);
    const [editedCategory, setEditedCategory] = useState(categoryId);
    const [editedImage, setEditedImage] = useState(image);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setEditedImage(reader.result);
    };

    const editButtonPressed = () => {
        setIsLoading(true);

        editProduct(currentUser, id, editedName, editedCategory, editedPrice, editedImage, editedBrand)
            .then((response) => {
                if (response.ok) {
                    toast.success('המוצר נערך בהצלחה')
                } else {
                    response.json()
                        .then((response) => toast.error(response.error));
                }
                setIsLoading(false);
            });
    }

    if (isEditMode) {
        return (
            <Container>
                <ToastContainer
                    position="bottom-right"
                    autoClose={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                />

                <img src={editedImage} />
                <div>
                    <input
                        type="file"
                        onChange={handleFileInputChange} />
                </div>
                <div>
                    <label>
                        מחיר
                        <input type="number" onChange={(e) => setEditedPrice(e.target.value)} value={editedPrice} />
                    </label>
                </div>
                <div>
                    <label>
                        מוצר
                        <input type="text" onChange={(e) => setEditedName(e.target.value)} value={editedName} />
                    </label>
                </div>
                <div>
                    <label>
                        מותג
                        <input type="text" onChange={(e) => setEditedBrand(e.target.value)} value={editedBrand} />
                    </label>
                </div>
                <div>
                    <label>
                        קטגוריה
                        <select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)}>
                            {categories.map((category) =>
                                <option value={category.id}>{category.category}</option>
                            )}
                        </select>
                    </label>
                </div>

                <div>
                    <Button mini disabled={isLoading} onClick={editButtonPressed}>עריכה</Button>
                </div>
            </Container>
        )
    }

    return (
        <Container
            onMouseEnter={() => setShowControllers(true)}
            onMouseLeave={() => setShowControllers(false)}
        >
            <img src={image} />
            <div>
                <strong>₪{price}</strong>
                <div>
                    <b>{name}</b> | {brand}
                </div>
            </div>


            <QuantityControllers
                id={id}
                itemQuantity={itemQuantity}
                addOrUpdateItem={addOrUpdateItem}
                style={showControllers ? { opacity: '1' } : { opacity: '0' }}
            />
        </Container>
    )
}

export default ProductItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
    height: 300px;
    border: 1px solid #e0e2e9;
    margin: 10px;
    transition: .5s;
    padding: 10px;
    .Toastify__toast {
        background-color: #D51C4A;
    }

    :hover {
        border: 1px solid #D51C4A;
    }

    img {
        height: 155px;
        width: 155px;
        margin: 0 auto;
    }

    strong {
        font-size: 20px;
        font-weight: normal;
    }
`;
