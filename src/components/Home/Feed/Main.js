import styled from "styled-components";
import React, { useEffect, useState } from "react";
import videoIcon from "../../../images/video-icon.svg";
import articleIcon from "../../../images/article-icon.svg";
import eventIcon from "../../../images/event-icon.svg";
import imageIcon from "../../../images/image-icon.svg";
import userSvg from "../../../images/user.svg";
import ellipsis from "../../../images/ellipsis.svg";
import sharedImage from "../../../images/shared-image.jpg";
//social icons
import likeButton from "../../../images/social/like-icon.svg";
import commentButton from "../../../images/social/comment-icon.svg";
import shareButton from "../../../images/social/share-icon.svg";
import sendButton from "../../../images/social/send-icon.svg";
// post reactions
import likeIcon from "../../../images/social/reactions/like.svg";
import clapIcon from "../../../images/social/reactions/clap.svg";
import PostModal from "./PostModal";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import { Loader } from "../../Loading Spinner/Loader";
import { connect } from "react-redux";
import { getArticlesAPI } from "../../../actions/index";
import ReactPlayer from "react-player";
function Main(props) {
  const [showModal, setShowModal] = useState("close");
  useEffect(() => {
    props.getArticles();
  }, []);
  const handleClick = e => {
    e.preventDefault();
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user ? (
              <img src={props.user.photoURL} alt="user" />
            ) : (
              <img src={userSvg} alt="user" />
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src={imageIcon} alt="image icon" />
              <span>Photo</span>
            </button>
            <button>
              <img src={videoIcon} alt="video icon" />
              <span>Video</span>
            </button>
            <button>
              <img src={eventIcon} alt="event icon" />
              <span>Event</span>
            </button>
            <button>
              <img src={articleIcon} alt="article icon" />
              <span> Article</span>
            </button>
          </div>
        </ShareBox>

        {!props.articles.length ? (
          <p style={{ textAlign: "center" }}>No articles to display!!</p>
        ) : (
          <Content>
            {props.loading && <Loader />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img
                        src={
                          article.actor.image ? article.actor.image : userSvg
                        }
                        alt="user"
                      />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date
                            .toDate()
                            .toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src={ellipsis} alt="menu" width="20" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a
                      href={article.sharedImg && article.sharedImg}
                      target="_blank"
                    >
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width="100%" url={article.video} />
                      ) : (
                        article.sharedImg && (
                          <LazyImg
                            alt={article.description}
                            effect="blur"
                            delayTime={500}
                            src={article.sharedImg} // use normal <img> attributes as props
                          />
                        )
                      )}
                    </a>
                  </SharedImg>
                  <Social>
                    <li>
                      <button>
                        <img src={likeIcon} alt="like" />
                        <img src={clapIcon} alt="like" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} Comments</a>
                    </li>
                  </Social>

                  <SocialActions>
                    <button>
                      <img src={likeButton} alt="like" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src={commentButton} alt="comment" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src={shareButton} alt="share" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img src={sendButton} alt="send" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
        <PostModal showModal={showModal} handleClick={handleClick}></PostModal>
      </Container>
    </>
  );
}

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0/20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(1, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        &:hover {
          background: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
  div:nth-of-type(2) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 4px;

    button {
      @media (max-width: 550px) {
        max-width: 55px;
      }
      @media (min-width: 551px) {
        max-width: 100px;
      }
      max-width: 100px;
      padding-top: 2.5px;
      width: 100%;
      border-radius: 5px;
      transition: all 0.15s;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  }
  div:nth-of-type(1) {
    button {
      flex-direction: row;
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 2px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
  }
`;
const Social = styled.ul`
  list-style: none;
  list-style-type: none;
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 12px 8px;
  border-bottom: 1px solid #e9e5df;
  li:first-child {
    display: flex;
    margin-left: 5px;
    button {
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-radius: 5px;
      font-weight: 600;
      img {
        width: 20px;
      }
    }
  }
  li:nth-child(2) {
    font-size: 12px;
    a {
      transition: all 0.1s;
      cursor: pointer;
      font-weight: 500;
    }
    a:hover {
      text-decoration: underline;
      color: #066ac2;
    }
  }
`;

const LazyImg = styled(LazyLoadImage)`
  transition: all 0.24s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  max-width: inherit;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-around;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    box-sizing: border-box;
    color: #066ac2;
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    span {
      padding-left: 2px;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      span {
        padding-top: 3px;
        padding-left: 0px;
      }
    }
    &:nth-child(4) {
      img {
        padding-left: 3px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
`;
const mapStateToProps = state => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};
const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
