import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import LeftSide from "./Feed/LeftSide";
import RightSide from "./Feed/RightSide";
import Main from "./Feed/Main";
import { Redirect } from "react-router";
import { connect } from "react-redux";

function Home(props) {
  useEffect(() => {
    document.title = "Feed | LinkedIn ";
  }, []);
  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Section>
        <h5>
          <a>Hiring in a hurry? - </a>
        </h5>
        <p>
          {"  "}
          Find talented pros in record time with Upwork and keep business
          moving.
        </p>
      </Section>
      <Layout>
        <LeftSide></LeftSide>
        <Main></Main>
        <RightSide></RightSide>
      </Layout>
    </Container>
  );
}
const Container = styled.div`
  padding-top: 72px;
  /* max-width: 100%; */
  max-width: 1200px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  @media (max-width: 768px) {
    padding-top: 52px;
  }
`;
const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;
const Section = styled.section`
  min-height: 10px;
  padding: 16px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
      cursor: pointer;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
    margin: 0 12px;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    pading: 0 5px;
  }
`;
const mapStateToProps = state => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Home);
