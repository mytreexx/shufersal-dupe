import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import Navbar from "../ui/Navbar";
import Logo from '../../assets/Shufersal-logo-large.png';
import Button from '../ui/Button';


const Receipt = () => {
    const dateFormat = (dateString) => dateString.split('-').reverse().join('/');
    const { shippingDate: shippingDate } = useParams();
    const { orderId: orderId } = useParams();

    return (
        <>
            <Navbar />

            <Container>
                <Header>ההזמנה שלך בוצעה בהצלחה!</Header>
                <p>הזמנה מספר {orderId}<br /> תישלח אליך בתאריך {dateFormat(shippingDate)}</p>
                <Link to="/">
                    <Button small >אישור וחזרה לאתר</Button>
                </Link>

            </Container>
        </>
    )
}

export default Receipt;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 10%;
    border: 1px gray solid;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    height: 300px;
    padding-bottom: 50px;

    p {
        padding: 30px;
        text-align: center;
        
    }
`;

const Header = styled.div`
    background-color: #D51C4A;
    border-radius: 9px 9px 0 0;
    box-sizing: border-box;
    height: 50px;
    color: white;
    font-size: 20px;
    padding: 10px;
    width: 100%;
`;