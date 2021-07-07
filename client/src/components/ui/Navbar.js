import styled from 'styled-components';
import ShoppingCart from '../../assets/shopping-cart.png';
import shufersalOnline from '../../assets/shufersalOnlineLogo.png';

const Navbar = () => {
    return (
        <Container>
            <AuthContainer>
                <div className="auth-section">
                    <img src={ShoppingCart} />
                    <div >
                        <span><strong>שלום אורח</strong></span>
                        <span>ברוך הבא לשופרסל <a>התחברות</a> | <a>הרשמה</a></span>
                    </div>
                </div>

                <StartShopping>להמשך קניה ב<img src={shufersalOnline}></img></StartShopping>
            </AuthContainer>

            <div>
                <span>test</span>
            </div>
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: space-between;
height: 60px;
font-size: 14px;

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

`;

export default Navbar;