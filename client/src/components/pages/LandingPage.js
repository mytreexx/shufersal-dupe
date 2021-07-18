import { useState, useEffect } from 'react';
import styled from 'styled-components';

import LandingPageNavbar from '../ui/LandingPageNavbar';
import Carousel from '../ui/Carousel';
import advertisement1 from '../../assets/advertisement1.jpg';
import advertisement2 from '../../assets/advertisement2.jpg';
import { getStoreDetails } from '../../utils';


const LandingPage = ({ currentUser, userDetails, logout }) => {
    const [numberOfProducts, setNumberOfProducts] = useState();
    const [numberOfOrders, setNumberOfOrders] = useState();
    const [messageToUser, setMessageToUser] = useState();
    const [hasActiveCart, setHasActiveCart] = useState();

    useEffect(() => {
        getStoreDetails(currentUser)
            .then(response => response.json())
            .then((result) => {
                setNumberOfProducts(result.numberOfProducts);
                setNumberOfOrders(result.numberOfOrders);
                setMessageToUser(result.messageToUser);
                setHasActiveCart(result.hasActiveCart);
            })
    }, []);

    return (
        <Container>
            <LandingPageNavbar logout={logout} customerName={userDetails.first_name || 'אורח'} currentUser={currentUser} messageToUser={messageToUser} hasActiveCart={hasActiveCart} />
            <Carousel />
            <Announcement>
                לקוחות שופרסל Online,
                <br />
                במהלך השבוע הבא צפוי מחסור כללי בשוק של מוצרי עוף והודו טריים,
                <br />
                וכן בשל חופשת חג עיד אל אדחא ייתכנו שינויים בזמינות המשלוחים בשבוע הבא.
                <br />
                אנו ממליצים להקדים את הזמנותיכם לימים הקרובים. תודה, שופרסל.
            </Announcement>

            <Main>
                <Card>
                    <div>מספר המוצרים אונליין</div>
                    <strong>{numberOfProducts}</strong>
                </Card>

                <Card>
                    <div>מספר ההזמנות שבוצעו</div>
                    <strong>{numberOfOrders}</strong>
                </Card>
                <img src={advertisement1} />
            </Main>

            <Ad src={advertisement2} />
        </Container>
    )
}

export default LandingPage;

const Container = styled.div`
background-color: #F0F3F9;
`;

const Announcement = styled.div`
    color: #d51d4b;
    font-weight: bold;
    font-size: 18px;
    padding: 30px 40px;
    background-color: white;
`;

const Main = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px 0;
    background-color: #F0F3F9;

    img {
        @media (max-width: 1250px) {
            width: 500px;
        }
    }
`;

const Card = styled.div`
    display: flex;
    font-weight: bold;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px rgb(221 227 238) solid;
    margin: 0 20px;
    width: 200px;
    background-color: white;

    strong {
        color: #d51d4b;
        font-weight: bold;
        font-size: 100px;
    }
`;

const Ad = styled.img`
    width: 100%;
    align-self: flex-end;
`;
