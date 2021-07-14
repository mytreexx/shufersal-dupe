import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import Banner1 from '../../assets/banner1.jpg';
import Banner2 from '../../assets/banner2.jpg';
import Banner3 from '../../assets/banner3.jpg';
import Banner4 from '../../assets/banner4.jpg';
import Banner5 from '../../assets/banner5.jpg';


const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        Banner1,
        Banner2,
        Banner3,
        Banner4,
        Banner5
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(currentSlide => currentSlide === banners.length - 1 ? 0 : currentSlide + 1)
        }, 5000);

        return () => clearInterval(interval)
    }, []);

    return (
        <Container>
            <Slide src={banners[currentSlide]} alt="ad banner" />

            <Controllers>
                <BsChevronRight
                    onClick={() => { setCurrentSlide(currentSlide => currentSlide <= 0 ? banners.length - 1 : currentSlide - 1) }}
                    size="1.5em"
                />

                <div>
                    {banners.map((banner, index) =>
                        <Dot {...(currentSlide === index && { className: 'active' })} onClick={() => { setCurrentSlide(index) }} />
                    )}
                </div>

                <BsChevronLeft
                    onClick={() => { setCurrentSlide(currentSlide => currentSlide === banners.length - 1 ? 0 : currentSlide + 1) }}
                    size="1.5em"
                />
            </Controllers>
        </Container>
    )
}

export default Carousel;

const Container = styled.div`
    width: 100%;
    color: #6d7a99;
    
    .active {
        width: 15px;
        height: 15px;
        background-color: #048BF3;
    }
`;

const Slide = styled.img`
    width: 100%;
`;

const Dot = styled.div`
    height: 10px;
    width: 10px;
    background-color: #bfc5d2;
    margin: 0 10px;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
`;

const Controllers = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #f0f3f9;
    height: 60px;
    margin-top: -5px; 
    div {
        display: flex;
        align-items: center;
    }
`;
