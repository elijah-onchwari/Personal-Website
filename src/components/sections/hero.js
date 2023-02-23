import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { ScrollDown } from '@components/lottie';
const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;

  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--blueMunsell);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .center-botton-250{
    display: flex;
    align-items: flex-end;
    align-self: center;
    flex: 0 0 250px;
  }


  .center-botton-200{
    display: flex;
    align-items: flex-start;
    align-self: center;
    flex: 0 0 200;
  }

  .center-botton-100{
    display: flex;
    align-items: flex-end;
    align-self: center;
    flex: 0 0 150px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h2 className="big-heading">ELIJAH ONCHWARI</h2>;
  const two = <h3 className="small-heading">SOFTWARE & DEVEOPS ENGINEER</h3>;
  // const four = (
  //   <>
  //     <p>
  //       I’m a software engineer specializing in building (and occasionally designing) exceptional
  //       digital experiences. Currently, I’m focused on building accessible, human-centered products
  //       at{' '}
  //       <a href="https://upstatement.com/" target="_blank" rel="noreferrer">
  //         Upstatement
  //       </a>
  //       .
  //     </p>
  //   </>
  // );
  const three = (
    <a href="#about">
      <ScrollDown />
    </a>

  );

  const items = [one, two, three];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i, arr) => (
            arr.length - 1 === i ? (<div className='scroll-down' key={i}>{item}</div>) : (<div key={i}>{item}</div>)
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i, arr) => {
              if (arr.length - 1 === i) {
                return <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div className='center-botton-100' style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              }

              if (arr.length - 3 === i) {
                return <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div className='center-botton-250' style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              }

              return <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div className='center-botton-200' style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>

            })}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
