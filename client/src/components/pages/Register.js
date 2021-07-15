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
import { checkForRegistration, completeRegistration } from '../../utils'


const Register = () => {
    const [activeForm, setActiveForm] = useState(0);

    const [idNumber, setIdNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();

    const history = useHistory();

    const returnToSFirstStep = () => {
        setActiveForm(0)
    }

    const checkForm = (e) => {
        e.preventDefault();
        console.log(idNumber, email, password, confirmPassword)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idNumber,
                email,
                password,
                confirmPassword
            }),
        };

        checkForRegistration(requestOptions)
            .then((response) => {
                if (response.ok) {
                    setActiveForm(1);
                } else {
                    response.json()
                        .then((response) => toast.error(response.error));
                }
            });
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(idNumber, email, password, confirmPassword, firstName, lastName, street, city)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idNumber,
                email,
                password,
                confirmPassword,
                firstName,
                lastName,
                street,
                city
            }),
        };

        completeRegistration(requestOptions)
            .then((response) => {
                if (response.ok) {
                    setActiveForm(2);
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
                <Registration>
                    <Header>הרשמה לאתר שופרסל</Header>
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

                    <Form
                        onSubmit={checkForm}
                        {...((activeForm !== 0 || activeForm === 2) && { className: "disabled-form" })}
                    >
                        <Input
                            required
                            label="תעודת זהות"
                            type="text"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                        />

                        <Input
                            required
                            label="דואר אלקטרוני"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            required
                            label="סיסמה כניסה לאתר"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            required
                            label="יש להזין סיסמה שוב"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <div className='buttons'>
                            <Button
                                type="submit"
                                small
                            >
                                שמירה
                            </Button>
                        </div>
                    </Form>

                    <Form
                        onSubmit={submitForm}
                        {...((activeForm !== 1 || activeForm === 2) && { className: "disabled-form" })}
                    >
                        <Input
                            required
                            label="שם פרטי"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <Input
                            required
                            label="שם משפחה"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <Input
                            required
                            label="עיר מגורים"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <Input
                            required
                            label="רחוב"
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />

                        <div className='buttons'>
                            <Button
                                type="submit"
                                small
                            >
                                הרשמה
                            </Button>

                            <Button
                                type="button"
                                small
                                light
                                onClick={returnToSFirstStep}
                            >
                                חזרה
                            </Button>
                        </div>
                    </Form>
                </Registration>
            </MainContainer>
        </>
    )
}

export default Register;

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
`;

const Registration = styled.div`
    background-color: white;
    width:50%;
    max-width: 1120px;

    .disabled-form {
        filter: grayscale(1) brightness(3);
        pointer-events: none;
    }

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
