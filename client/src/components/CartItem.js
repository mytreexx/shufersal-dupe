import styled from 'styled-components';

const CartItem = ({ id, productName, image, brand, totalPrice, quantity }) => {
    return (
        <Container>
            <img src={image} />
            <div>
                <div>{productName}</div>
                <div>{quantity} יח'</div>
            </div>
            <div>₪{totalPrice}</div>

        </Container>
    )
}

export default CartItem;

const Container = styled.div`
display: flex;
    border-bottom: 1px black solid;
    padding: 5px;

    img {
        width: 70px;
        height: 70px;
        border-left: 1px solid black;
        padding-left: 5px;
    }
`;