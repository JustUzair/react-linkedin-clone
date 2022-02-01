import styled from "styled-components";
import React, { useEffect } from "react";
import feedIcon from "../../../images/feed-icon.svg";
import rightIcon from "../../../images/right-icon.svg";
function RightSide() {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src={feedIcon} alt="feed" />
        </Title>
        <FeedList>
          <li>
            <a>
              <Avatar></Avatar>
            </a>
            <div>
              <span>#LinkedIn</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar></Avatar>
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>
        <Recommendation>
          View All Recommendations
          <img src={rightIcon} alt="right icon" />
        </Recommendation>
      </FollowCard>
      <BannerCard>
        <img
          src={
            "https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
          }
          alt="banner"
        />
      </BannerCard>
    </Container>
  );
}

const Container = styled.div`
  grid-area: rightside;
  margin-right: auto;

  @media (min-width: 768px) {
    position: sticky;
    height: 100vh;
    top: 70px;
  }
  @media (max-width: 768px) {
    margin-bottom: 35px;
    width: 100%;
  }
`;
const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 /20%);
  padding: 12px;
`;
const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;
const FeedList = styled.ul`
  list-style: none;
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
      border-width: 1px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
      &:hover {
        background: rgba(0, 0, 0, 0.06);
        transition: all 0.25s;
      }
    }
  }
`;
const Avatar = styled.div`
  background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;
const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  font-size: 14px;
  align-items: center;
  cursor: pointer;
`;
const BannerCard = styled(FollowCard)`
  img {
    width: 100%;
    height: 100%;
  }
`;
export default RightSide;
