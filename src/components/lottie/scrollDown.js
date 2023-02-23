import React, { createRef, useEffect } from "react";
import lottie from 'lottie-web';

import animationData from './scroll-down.json';

const ScrollDown = () => {
    let animationContainer = createRef();
    useEffect(() => {
        lottie.loadAnimation({
            container: animationContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    }, []);



    return (
        <span ref={animationContainer} style={{ width: 60, height: 60 }}></span>
    );
};

export default ScrollDown;