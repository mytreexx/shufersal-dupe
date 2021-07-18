import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';

import Navbar from '../ui/Navbar';
import Header from "../ui/Header";
import { getCartItems, getOrderDetails, onMakeOrder } from "../../utils";
import Cart from '../Cart';
import Input from "../ui/Input";
import Button from '../ui/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';


const OrderPage = ({ currentUser, userDetails }) => {
    const [cartItems, setCartItems] = useState();
    const [availableDates, setAvailableDates] = useState();

    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [shippingDate, setShippingDate] = useState();
    const [creditCard, setCreditCard] = useState();

    const history = useHistory();
    const dateFormat = (dateString) => dateString.split('-').reverse().join('/');

    const validateCreditCard = (cardNumber) => {
        const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
        return regex.test(cardNumber);
    }

    const componentToPrint = useRef();

    const printReceipt = useReactToPrint({
        content: () => componentToPrint.current
    });

    useEffect(() => {
        getCartItems(currentUser)
            .then(response => response.json())
            .then(data => {
                setCartItems(data)
            })
    }, []);

    useEffect(() => {
        getOrderDetails(currentUser)
            .then(response => response.json())
            .then(data => {
                setCity(data.customer.city);
                setStreet(data.customer.street);
                setAvailableDates(data.availableDates)
                // setShippingDate(availableDates[0])
            })
    }, []);

    const makeOrder = (e) => {
        e.preventDefault();

        if (validateCreditCard(creditCard)) {
            onMakeOrder(currentUser, city, street, shippingDate, creditCard)
                .then((response) => {
                    if (response.ok) {
                        response.json()
                            .then((response) => history.push({
                                pathname: `/receipt/${response.shippingDate}/${response.orderId}`,
                                state: shippingDate
                            }));
                    } else {
                        response.json()
                            .then((response) => toast.error(response.error));
                    }
                });
        } else {
            toast.error("אמצעי תשלום אינו תקין")
        }
    }

    return (
        <Container>
            <div>

                <Navbar />
                <Header>
                    ביצוע הזמנה
                </Header>

                <OrderForm onSubmit={makeOrder}>
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
                        label="עיר מגורים"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <Input
                        required
                        label="רחוב"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />

                    <Label>
                        תאריך למשלוח
                        <Select onChange={(e) => setShippingDate(e.target.value)}>
                            {availableDates && availableDates.map(date =>
                                <option value={date}>{dateFormat(date)}</option>
                            )}
                        </Select>
                    </Label>

                    <Input
                        required
                        label="אמצעי תשלום"
                        type="number"
                        value={creditCard}
                        onChange={(e) => setCreditCard(e.target.value)}
                    />

                    <Button type="submit" small>בצע הזמנה כעת</Button>
                    <Link to="/store"><Button small light> חזור</Button></Link>
                    <Button type="button" small onClick={printReceipt}>הדפס קבלה</Button>
                </OrderForm>

            </div>

            <div ref={componentToPrint}>
                <Cart
                    cartItems={cartItems}
                    userDetails={userDetails}
                    readOnly />
            </div>

        </Container>
    )
}

export default OrderPage;

const OrderForm = styled.form`
    margin: 80px;

    > * {
        margin-bottom: 20px;
    }

    button {
        margin-left: 10px;
    }

    
    .Toastify__toast {
        background-color: #D51C4A;
    }
`;

const Container = styled.div`
    display: flex;
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


