import React, { useState } from 'react';
import styled from 'styled-components';

import SecondaryNavbar from '../ui/SecondaryNavbar';
import Logo from '../../assets/Shufersal-logo-large.png';
import bgImage from '../../assets/register-bg.jpg';
import Input from '../ui/Input';
import Button from '../ui/Button';


const Register = () => {
    const [activeForm, setActiveForm] = useState(0);

    const returnToSFirstStep = () => {
        setActiveForm(0)
    }

    const checkForm = () => {
        setActiveForm(1)
    }

    const submitForm = () => {
        setActiveForm(2)
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

                    <Form {...((activeForm !== 0 || activeForm === 2) && { className: "disabled-form" })}>
                        <Input
                            required
                            label="תעודת זהות"
                            type="text"
                        // value={startingDate}
                        // onChange={(e) => setStartingDate(e.target.value)}
                        />

                        <Input
                            required
                            label="דואר אלקטרוני"
                            type="text"
                        // value={startingDate}
                        // onChange={(e) => setStartingDate(e.target.value)}
                        />

                        <Input
                            required
                            label="סיסמה כניסה לאתר"
                            type="password"
                        // value={startingDate}
                        // onChange={(e) => setStartingDate(e.target.value)}
                        />

                        <Input
                            required
                            label="יש להזין סיסמה שוב"
                            type="password"
                        // value={startingDate}
                        // onChange={(e) => setStartingDate(e.target.value)}
                        />

                        <div className='buttons'>
                            <Button
                                type="button"
                                small
                                onClick={checkForm}
                            >
                                שמירה
                            </Button>
                        </div>
                    </Form>

                    <Form {...((activeForm !== 1 || activeForm === 2) && { className: "disabled-form" })}>
                        <Input
                            required
                            label="שם פרטי"
                            type="text"
                        // value={startingDate}
                        // onChange={(e) => setStartingDate(e.target.value)}
                        />

                        <Input
                            required
                            label="שם משפחה"
                            type="text"
                        // value={startingDate}
                        // onChange={(e) => setStartingDate(e.target.value)}
                        />

                        <Input
                            required
                            label="עיר מגורים"
                            type="text"
                        // value={city}
                        // onChange={(e) => setCity(e.target.value)}
                        />

                        <Input
                            required
                            label="רחוב"
                            type="text"
                        // value={startingDate}
                        // onChange={(e) => setStartingDate(e.target.value)}
                        />

                        <div className='buttons'>
                            <Button
                                type="button"
                                small
                            onClick={submitForm}
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

const Form = styled.div`
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
