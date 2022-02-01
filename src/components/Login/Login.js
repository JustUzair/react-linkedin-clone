import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import loginLogo from "../../images/login-logo.svg";
import heroImg from "../../images/login-hero.svg";
import googleLogo from "../../images/google.svg";
import { connect } from "react-redux";
import { signInAPI } from "../../actions";
import { Redirect } from "react-router";
function Login(props) {
  // console.log(signInAPI);
  useEffect(() => {
    document.title = "LinkedIn: Log In or Sign Up";

    setTimeout(() => {
      setButtonTxt(true);
    }, 1000);
  }, []);
  const [buttonTxt, setButtonTxt] = useState(false);

  return (
    <Container>
      {props.user && <Redirect to="/home" />}
      <Nav>
        <a href="/">
          <img src={loginLogo} alt="Linked In logo" />
        </a>
        <NavLinks>
          <Join>Join Now</Join>
          <SignIn>Sign In</SignIn>
        </NavLinks>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src={heroImg} alt="Hero Image" />
        </Hero>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src={googleLogo} alt="google log in" />
            {/* <p>Sign In with Google</p> */}
            {buttonTxt && (
              <div>
                <p>Sign In with Google</p>
              </div>
            )}
          </Google>
        </Form>
      </Section>
    </Container>
  );
}
const Container = styled.div`
  padding: 0px;
`;
const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0px 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    padding: 0 5px;
    @media (max-width: 768px) {
      padding: 0 10px;
    }
  }
`;
const NavLinks = styled.div`
  & > * {
    margin: 0 10px;
    @media (max-width: 768px) {
      margin: 0 2px;
      padding: 0 2px;
    }
  }
`;
const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    border-radius: 4px;
  }
`;
const SignIn = styled.a`
  box-shadow: inset 0 0 0 1.2px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition: all 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
    background-color: rgba(112, 181, 249, 0.15);
    text-decoration: none;
  }
`;
const Section = styled.section`
  align-content: start;
  display: flex;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;
const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 22px;
      width: 100%;
      line-height: 2;
      font-weight: 300;
    }
  }
  img {
    z-index: -1;
    width: 700px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;
const Form = styled.div`
  margin-top: 100px;
  width: 408px;

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 0 22px;
  }
`;
const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  width: 100%;
  height: 56px;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 /60%), inset 0 0 0 2px rgb(0 0 0 /0%),
    inset 0 0 0 1px rgb(0 0 0 /0%);
  border-color: rgba(0, 0, 0, 0.4);
  border-width: 0.2px;
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  position: relative;
  min-width: 100px;
  & > img {
    margin-right: 10px;
    height: 40px;
    transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation: 0.5s btnimg;
    transform-origin: left;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
  & > div {
    position: relative;
  }
  & > div > p {
    animation: 0.5s btntext;
    transform: translateX(-200%);
    animation-fill-mode: forwards;
    transform-origin: top left;
  }
  @keyframes btnimg {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-60%);
    }
  }
  @keyframes btntext {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
`;
const mapStateToProps = state => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
