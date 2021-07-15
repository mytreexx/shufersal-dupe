import styled from 'styled-components';
import supermarket from '../../assets/Supermarket2.png';
import mall from '../../assets/Mall-2.png';
import be from '../../assets/Be2.png';
import green from '../../assets/Green2.png';
import business from '../../assets/Business.png';

const SecondaryNavbar = () => {
    return (
        <Container>
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

export default SecondaryNavbar;

const Container = styled.div`
    display: flex;
    height: 75px;
    align-items: center;
    font-size: 22px;
    background-color: white;

    div {
        display: flex;
        align-items: center;
        margin: 0 20px;
        text-align: center;
    }
`;