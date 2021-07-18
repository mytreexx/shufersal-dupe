import styled from 'styled-components';
import { Link } from 'react-router-dom';
import supermarket from '../../assets/Supermarket2.png';
import mall from '../../assets/Mall-2.png';
import be from '../../assets/Be2.png';
import green from '../../assets/Green2.png';
import business from '../../assets/Business.png';
import Logo from '../../assets/Shufersal-logo-large.png';

const Navbar = ({ ...props }) => {
    return (
        <Container {...props}>
            {props.size !== 'small' && <Link to='/'>
                <img src={Logo} />
            </Link>}

            <div>
                <img src={supermarket} />
                <span><strong>סופרמרקט</strong></span>
            </div>

            <div>
                <img src={mall} />
                <span><strong>הקניון - הכל לבית</strong></span>
            </div>

            <div>
                <img src={be} />
                <span><strong>פארם וקוסמטיקה</strong></span>
            </div>

            <div>
                <img src={green} />
                <span><strong>green בריאות וטבע</strong></span>
            </div>

            <div>
                <img src={business} />
                <span>שופרסל<br />עסקים</span>
            </div>

            <div>
                <span>תו<br />הזהב</span>
            </div>
        </Container>
    )
}

export default Navbar;

const Container = styled.div`
    display: flex;
    border-bottom: ${(props) => (props.size !== 'small' && '1px #f0f3f9 solid')};
    align-items: center;
    font-size: 22px;
    background-color: white;
    ${(props) => (props.size === 'small' ? 'height: 75px' : 'height: 110px')};
    ${(props) => (props.size !== 'small' && 'padding-right: 40px')};

    div {
        display: flex;
        align-items: center;
        margin: 0 20px;
        text-align: center;
    }
`;
