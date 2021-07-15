import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SecondaryNavbar from '../ui/SecondaryNavbar';
import Logo from '../../assets/Shufersal-logo-large.png';
import bgImage from '../../assets/register-bg.jpg';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { getLogin } from '../../utils'


const Login = () => {
    const [idNumber, setIdNumber] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();

    const loginUser = (e) => {
        e.preventDefault();
        console.log(idNumber, password)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idNumber,
                password
            }),
        };

        getLogin(requestOptions)
            .then((response) => {
                if (response.ok) {
                    history.push('/');
                } else {
                    response.json()
                        .then((response) => toast.error(response.error));
                }
            });
    }

    return (
        <>
            <NavContainer>
                <img src={Logo} />
                <SecondaryNavbar />
            </NavContainer>

            <MainContainer>
                <LoginContainer>
                    <Header>התחברות לאתר שופרסל</Header>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />

                    <Form onSubmit={loginUser}>
                        <Input
                            required
                            label="תעודת זהות"
                            type="text"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                        />

                        <Input
                            required
                            label="סיסמה"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className='buttons'>
                            <Button
                                type="submit"
                                small
                            >
                                התחברות
                            </Button>
                        </div>
                    </Form>
                </LoginContainer>
            </MainContainer>
        </>
    )
}

export default Login;

const NavContainer = styled.div`
    display: flex;
    height: 110px;
    align-items: center;
    border-bottom: 1px #f0f3f9 solid;
    padding-right: 40px;
`;

const MainContainer = styled.div`
    display: flex;
    width: 100%;
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    height: 700px;
`;

const LoginContainer = styled.div`
    background-color: white;
    width:50%;
    max-width: 1120px;

    .Toastify__toast {
        background-color: #D51C4A;
    }
`;

const Header = styled.div`
    display: flex;
    background-color: #D51C4A;
    color: white;
    height: 70px;
    font-size: 24px;
    font-weight: normal;
    align-items: center;
    padding: 0 100px;
`;

const Form = styled.form`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 600px;
    margin: auto;
    margin-top: 70px;

    div {
        margin-bottom: 50px;
    }

    .buttons {
        width: 100%;
        direction: ltr;
        margin-bottom: 0;

       button {
           margin-left: 15px;
       }
    }
`;
