import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import Navbar from "../ui/Navbar";
import Header from "../ui/Header";
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
    width: 90%;
    max-width: 400px;
    height: 300px;
    padding-bottom: 50px;

    p {
        padding: 30px;
        text-align: center;
        
    }
`;
