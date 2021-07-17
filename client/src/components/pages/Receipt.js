import styled from "styled-components";
import { Link } from "react-router-dom";

import SecondaryNavbar from "../ui/SecondaryNavbar";
import Logo from '../../assets/Shufersal-logo-large.png';
import Button from '../ui/Button';


const Receipt = () => {
    return (
        <>
            <NavContainer>
                <img src={Logo} />
                <SecondaryNavbar />
            </NavContainer>

            <Container>
                <Header>ההזמנה שלך בוצעה בהצלחה!</Header>
                <p>ההזמנה שלך לתאריך 06.05.1994 התקבלה במערכת ותישלח במועד</p>
                <Link to="/">
                    <Button small >אישור וחזרה לאתר</Button>
                </Link>

            </Container>
        </>
    )
}

export default Receipt;

const NavContainer = styled.div`
    display: flex;
    height: 110px;
    align-items: center;
    border-bottom: 1px #f0f3f9 solid;
    padding-right: 40px;
`;

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
        padding: 50px;
        
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