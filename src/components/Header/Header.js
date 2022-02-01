import styled from "styled-components";
import React, { useEffect } from "react";

import homeLogo from "../../images/home-logo.svg";
import searchIcon from "../../images/search-icon.svg";
// Navbar icons
import navHome from "../../images/nav-home.svg";
import navNetwork from "../../images/nav-network.svg";
import navJobs from "../../images/nav-jobs.svg";
import navMessaging from "../../images/nav-messaging.svg";
import navNotifications from "../../images/nav-notifications.svg";
import downIcon from "../../images/down-icon.svg";
import navWork from "../../images/nav-work.svg";
import userSvg from "../../images/user.svg";
//firebase

import { connect } from "react-redux";
import { signOutAPI } from "../../actions";
//  Navbar icons
function Header(props) {
  useEffect(() => {
    let list = document.querySelectorAll(".nav--list");
    // console.log(list);
    list.forEach(el => el.addEventListener("click", handleClick));
  }, []);

  const handleClick = e => {
    let list = document.querySelectorAll(".nav--list");
    list.forEach(el => {
      // console.log(el);
      el.classList.remove("active");
    });
    e.target.closest(".nav--list").classList.add("active");
  };
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src={homeLogo} alt="home logo" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src={searchIcon} alt="search" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="nav--list active">
              <a>
                {" "}
                <img src={navHome} alt="nav home" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList className="nav--list" onClick={handleClick}>
              <a>
                {" "}
                <img src={navNetwork} alt="nav network" />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList className="nav--list">
              <a>
                {" "}
                <img src={navJobs} alt="nav jobs" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList className="nav--list">
              <a>
                {" "}
                <img src={navMessaging} alt="nav messaging" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList className="nav--list">
              <a>
                {" "}
                <img src={navNotifications} alt="nav notifications" />
                <span>Notifications</span>
              </a>
            </NavList>
            <User>
              <a>
                {/* {props.user ? (
                  <img src={props.user.photoURL} alt="User" />
                ) : (
                  <img src={userSvg} alt="User" />
                )} */}
                <img
                  src={props.user ? props.user.photoURL : userSvg}
                  alt="User"
                />
                <span>
                  Me
                  <img
                    src={downIcon}
                    style={{ width: "15px", height: "15px" }}
                    alt="down arrow"
                  />
                </span>
              </a>
              <UserDropDown>
                <a onClick={() => props.signOut()}>Sign Out</a>{" "}
                {window.innerWidth < 690 && (
                  <a>
                    <img src={navWork} alt="work" />
                    <span>
                      Work
                      <img src={downIcon} alt="down arrow" />
                    </span>
                  </a>
                )}
              </UserDropDown>
            </User>

            {window.innerWidth >= 690 && (
              <Work>
                <a>
                  <img src={navWork} alt="work" />
                  <span>
                    Work
                    <img src={downIcon} alt="down arrow" />
                  </span>
                </a>
              </Work>
            )}
            {/* <Work className="nav--list">
              <a>
                <img src={navWork} alt="work" />
                <span>
                  Work
                  <img src={downIcon} alt="down arrow" />
                </span>
              </a>
            </Work> */}
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
  @media (max-width: 768px) {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;
const Logo = styled.span`
  margin-right: 8px;
  font-size: 8px;
`;
const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      padding: 0 8px 0 40px;
      width: 218px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const SearchIcon = styled.div`
  position: absolute;
  width: 40px;
  top: 10px;
  z-index: 1;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    width: 100%;
  }
`;
const NavListWrap = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      border-color: rgba(0, 0, 0, 0.9);
      opacity: 1;
      height: auto;
    }
  }
`;
const NavList = styled.li`
  cursor: pointer;
  display: flex;
  margin: 0 5px;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
  align-items: center;

  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    @media (max-width: 425px) {
      min-height: 42px;
      min-width: 50px;
    }
    @media (max-width: 355px) {
      min-height: 32px;
      min-width: 30px;
      margin: 0 2px;
      & > img {
        max-width: 18px;
      }
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      @media (max-width: 498px) {
        font-size: 10px;
      }
      @media (max-width: 355px) {
        font-size: 9px;
      }
      &:after {
        content: "";
        height: 2px;
        background: black;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0.2px;
        transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
        transform-origin: left center;
        opacity: 0;
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;
const UserDropDown = styled.div`
  position: absolute;
  top: 45%;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 170ms;
  text-align: center;
  display: none;
  @media (max-width: 748px) {
    z-index: 100;
    top: -70%;
    bottom: 45%;
    height: 250px;
    right: 2%;
    & > a {
      border-bottom: 1.5px solid rgba(0, 0, 0, 0.1);
    }
  }
`;
const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${UserDropDown} {
      align-items: center;
      display: flex;
      flex-direction: column;
      /* justify-content: center; */
    }
  }
`;
const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const mapStateToProps = state => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
