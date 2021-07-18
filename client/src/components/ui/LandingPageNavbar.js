import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import ShoppingCart from '../../assets/shopping-cart.png';
import shufersalOnline from '../../assets/shufersalOnlineLogo.png';
import shufersalLogo from '../../assets/shufersal-logo.webp';
import profileIcon from '../../assets/profile-icon.png';
import locationIcon from '../../assets/gps-icon.png';
import callCenterIcon from '../../assets/call-center-agent-icon.png'
import accessibility from '../../assets/disabled-sign-icon.png'
import Navbar from './Navbar';


const LandingPageNavbar = ({ currentUser, customerName, messageToUser, hasActiveCart, logout }) => {
    return (
        <Nav>
            <MainContainer>
                <AuthContainer>
                    <div className="auth-section">
                        <img src={ShoppingCart} alt="cart" />
                        <div >
                            <span><strong>שלום {customerName}</strong></span>
                            <span>{messageToUser}
                                &nbsp;
                                {currentUser ? <span onClick={logout} style={{ textDecoration: "underline", fontWeight: "bold" }}>התנתקות</span> : <span><Link to="/login">התחברות</Link> | <Link to="/register">הרשמה</Link></span>}

                            </span>
                        </div>
                    </div>

                    {currentUser ?
                        <Link to='/store'>
                            <StartShopping>
                                {hasActiveCart ? "להמשך קניה ב" : "התחלת קניה ב"}
                                <img src={shufersalOnline} />
                            </StartShopping>
                        </Link>
                        :
                        <Link to='/login'>
                            <StartShopping>
                                התחלת קניה ב
                                <img src={shufersalOnline} />
                            </StartShopping>
                        </Link>
                    }

                </AuthContainer>

                <NavigationContainer>
                    <Icon>
                        <img src={profileIcon} alt="profile" />
                        <span>האיזור האישי במועדון</span>
                    </Icon>
                    <Dot />
                    <Icon>
                        <img src={locationIcon} alt="gps" />
                        <span>איתור סניפים</span>
                    </Icon>
                    <Dot />
                    <Icon>
                        <img src={accessibility} alt="accessibility" />
                        <span>נגישות</span>
                    </Icon>
                    <Dot />
                    <Icon>
                        <img src={callCenterIcon} alt="call center" />
                        <span>שירות לקוחות</span>
                    </Icon>
                    <img src={shufersalLogo} />
                </NavigationContainer>
            </MainContainer>

            <Navbar size='small' />
        </Nav>
    )
}

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    font-size: 14px;
    border-bottom: 1px solid rgb(224 226 233);
    background-color: white;

    img {
        height: 40px;
        margin-left: 10px;
    }

    .auth-section {
        display: flex;
        align-items: center;

        @media (max-width: 977px) {
            font-size: 12px;
        }

        div {
            display: flex;
            flex-direction: column;
        }
    }
`

const AuthContainer = styled.div`
    background-color: #D51D4B;
    color: white;
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px 0 20px;

a {
    color: inherit;
    font-weight: bold;
}
`

const StartShopping = styled.button`
    background-color: white;
    font-family: 'myfont';
    display: flex;
    align-items: center;
    color: #D51D4B;
    border: none;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 15px;
    border-radius: 4px;

    @media (max-width: 1300px) {
        font-size: 14px;
        
        img {
            transform: scale(70%)
        }
    }

img {
    height: auto;
}
`

const NavigationContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`;

const Icon = styled.div`
    box-sizing: border-box;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    word-wrap: break-word;
    min-width: 40px;
    font-size: 12px;
    color: #048BF3;
    filter: brightness(50%); 
    line-height: 0.8;
    padding: 8px 0;
    margin: 0 10px;
    cursor: pointer;
    transition: .5s;

    img {
        width: 32px;
        height: 32px;
        margin: 0;
    }
    span {
        text-align: center;
    }

    :hover {
        filter: brightness(100%); 
    }
`;

const Dot = styled.div`
    background-color: #2f416e;
    border-radius: 50%;
    border: 3px solid #2f416e;
    align-self: flex-end;
    margin-bottom: 9px;
`;

const Nav = styled.div`
    box-shadow: 0 1px 8px 0 rgb(47 65 110 / 30%);
`;

export default LandingPageNavbar;
