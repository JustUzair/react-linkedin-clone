import styled from "styled-components";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import cardBG from "../../../images/card-bg.svg";
import photo from "../../../images/photo.svg";
import widgetIcon from "../../../images/widget-icon.svg";
import itemIcon from "../../../images/item-icon.svg";
import plusIcon from "../../../images/plus-icon.svg";
function LeftSide(props) {
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBcg></CardBcg>
          <a>
            <Photo />
            <Link>Welcome, {props.user ? props.user.displayName : ""}!</Link>
          </a>
          <a>
            <AddPhotoText>Add a Photo</AddPhotoText>
          </a>
        </UserInfo>
        <Widget>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src={widgetIcon} alt="widget" />
          </a>
        </Widget>
        <Item>
          <span>
            <img src={itemIcon} alt="item icon" />
            My Items
          </span>
        </Item>
      </ArtCard>
      <CommunityCard>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src={plusIcon} alt="plus icon" />
          </span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover More</span>
        </a>
      </CommunityCard>
    </Container>
  );
}

const Container = styled.div`
  grid-area: leftside;

  @media (min-width: 768px) {
    position: sticky;
    height: 100vh;
    top: 70px;
  }
`;
const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0/15%), 0 0 0 rgb(0 0 0/20%);
`;
const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;
const CardBcg = styled.div`
  background: url(${cardBG});
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;
const Photo = styled.div`
  box-shadow: none;
  background-image: url(${photo});
  width: 72px;
  height: 72px;
  background-clip: content-box;
  box-sizing: border-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;
const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;
const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.33;
  font-weight: 400;
  cursor: pointer;
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    padding: 4px 12px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
  div {
    display: flex;
    flex-direction: column;
    text-align: left;
    span {
      font-size: 12px;
      line-height: 1.33;
      &:first-child {
        color: rgba(0, 0, 0, 0.6);
      }
      &:nth-child(2) {
        color: rgba(0, 0, 0, 1);
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`;
const Item = styled.a`
  cursor: pointer;
  span {
    display: flex;

    align-items: center;
    color: rgba(0, 0, 0, 1);
  }

  border-color: rgba(0, 0, 0, 0.8);
  padding: 12px;
  font-size: 12px;
  display: block;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;
const CommunityCard = styled(ArtCard)`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px 0 0;
  a {
    color: black;
    padding: 4px 12px;
    font-size: 12px;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.15); */
    &:hover {
      color: #0a66c2;
      cursor: pointer;
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
  &:nth-child(2) {
    span {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > img {
        width: 12px;
      }
    }
  }
`;
const mapStateToProps = state => {
  return {
    user: state.userState.user,
  };
};
export default connect(mapStateToProps)(LeftSide);
// export default LeftSide;
