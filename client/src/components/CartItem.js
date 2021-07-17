import styled from 'styled-components';
import QuantityControllers from '../components/ui/QuantityControllers';


const CartItem = ({ id, productName, image, brand, totalPrice, quantity, removeItemFromCart, addOrUpdateItem }) => {
    return (
        <Container>
            <img src={image} />

            <div>
                <div>{productName}</div>
                <div>{quantity} יח'</div>
            </div>

            <div>
                <div>₪{totalPrice}</div>
                <QuantityControllers addOrUpdateItem={addOrUpdateItem} id={id} itemQuantity={quantity} />
            </div>

            <div onClick={() => { removeItemFromCart(id) }}>X</div>

        </Container>
    )
}

export default CartItem;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px black solid;
    padding: 5px;

    img {
        width: 70px;
        height: 70px;
        border-left: 1px solid black;
        padding-left: 5px;
    }
`;