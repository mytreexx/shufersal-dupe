import styled from 'styled-components';
import ShoppingCart from '../../assets/shopping-cart.png';
import shufersalOnline from '../../assets/shufersalOnlineLogo.png';
import shufersalLogo from '../../assets/shufersal-logo.webp';
import profileIcon from '../../assets/profile-icon.png';
import locationIcon from '../../assets/gps-icon.png';
import callCenterIcon from '../../assets/call-center-agent-icon.png'
import accessibility from '../../assets/disabled-sign-icon.png'

const LandingPageNavbar = () => {
    return (
        <Container>
            <AuthContainer>
                <div className="auth-section">
                    <img src={ShoppingCart} alt="cart" />
                    <div >
                        <span><strong>שלום אורח</strong></span>
                        <span>ברוך הבא לשופרסל <a>התחברות</a> | <a>הרשמה</a></span>
                    </div>
                </div>

                <StartShopping>להמשך קניה ב<img src={shufersalOnline}></img></StartShopping>
            </AuthContainer>

            <NavigationContainer>
                <Icon>
                    <img src={profileIcon} alt="profile" />
                    <span>האיזור האישי במועדון</span>
                </Icon>
                <Dot/>
                <Icon>
                    <img src={locationIcon} alt="gps" />
                    <span>איתור סניפים</span>
                </Icon>
                <Dot/>
                <Icon>
                    <img src={accessibility} alt="accessibility" />
                    <span>נגישות</span>
                </Icon>
                <Dot/>
                <Icon>
                    <img src={callCenterIcon} alt="call center" />
                    <span>שירות לקוחות</span>
                </Icon>
                <img src={shufersalLogo} />
            </NavigationContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    font-size: 14px;
    border-bottom: 1px solid rgb(224 226 233);

    img {
        height: 40px;
        margin-left: 10px;
    }

    .auth-section {
        display: flex;
        align-items: center;

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
    text-decoration: underline;
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
    padding: 5px 0;
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
    margin-bottom: 6px;
`;

export default LandingPageNavbar;