import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';

import SecondaryNavbar from '../ui/SecondaryNavbar';
import Logo from '../../assets/Shufersal-logo-large.png';
import { getCartItems, getOrderDetails, onMakeOrder } from "../../utils";
import Cart from '../Cart';
import Input from "../ui/Input";
import Button from '../ui/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OrderPage = ({ currentUser }) => {
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
            })
    }, []);

    const makeOrder = (e) => {
        e.preventDefault();
        if (validateCreditCard(creditCard)) {
        onMakeOrder(currentUser, city, street, shippingDate, creditCard)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((response) => toast.success(response.message))
                    setTimeout(() => {
                        history.push('/store');
                    }, 3000);
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
        <>
            <NavContainer>
                <img src={Logo} />
                <SecondaryNavbar />
            </NavContainer>

            <Cart cartItems={cartItems} />
            <OrderDetails onSubmit={makeOrder}>
                <ToastContainer
                    position="top-center"
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
                <Button type="submit">בצע הזמנה כעת</Button>
            </OrderDetails>
            <Link to="/store"><Button small > חזור</Button></Link>

        </>
    )
}

export default OrderPage;

const NavContainer = styled.div`
    display: flex;
    height: 110px;
    align-items: center;
    border-bottom: 1px #f0f3f9 solid;
    padding-right: 40px;
`;

const OrderDetails = styled.form`
`;