import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import userSvg from "../../../images/user.svg";
import closeIcon from "../../../images/close-icon.svg";
//Share Icons
import shareImageIcon from "../../../images/share-modal/share-image.svg";
import shareVideo from "../../../images/share-modal/share-video.svg";
import shareComment from "../../../images/share-modal/share-comment.svg";
//Share Icons
import ErrorModal from "./ErrorModal/ErrorModal";
import { connect } from "react-redux";
// import firebase from "../../../firebase";
import firebase from "firebase/compat/app";
import { postArticleAPI } from "../../../actions";
function PostModal(props) {
  let Filter = require("bad-words"),
    filter = new Filter();
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const handleChange = e => {
    const image = e.target.files[0];
    if (image && !image.name.match(/.(jpg|jpeg|png|gif|jfif)$/i)) {
      setErrorText(
        `File is not an image, the file is of type ${image.name.split(".")[1]}`
      );
      setErrorModal(true);
      setShareImage("");
    }
    if (image === "" || image === "undefined") {
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = area => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const postArticle = e => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: filter.clean(editorText),
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e);
  };
  const reset = e => {
    setTimeout(() => {
      setEditorText("");
      setShareImage("");
      setVideoLink("");
      props.handleClick(e);
    }, 150);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content className="modal">
            <Header>
              <h2>Create a post</h2>
              <button
                className={"btn--close"}
                onClick={event => {
                  event.target
                    .closest(".modal")
                    .classList.add("modal--inactive");
                  reset(event);
                }}
              >
                <img
                  src={closeIcon}
                  onClick={e => e.target.closest(".btn--close").click()}
                  alt="close"
                />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {props.user ? (
                  <img src={props.user.photoURL} alt="user" />
                ) : (
                  <img src={props.user.photoURL} alt="user" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>

              <Editor>
                <textarea
                  value={editorText}
                  onChange={e => {
                    const text = e.target.value;
                    setEditorText(text);
                  }}
                  autoFocus={true}
                  placeholder="What do you want to talk about?"
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif , image/jpeg , image/png , image/jpg"
                      name="image"
                      id="file"
                      style={{
                        display: "none",
                      }}
                      onChange={handleChange}
                    />
                    <p
                      className="select-image--label"
                      style={{
                        fontStyle: "italic",
                        color: "rgba(6, 106, 194,.8)",
                      }}
                    >
                      <label htmlFor="file" style={{ cursor: "pointer" }}>
                        Select an Image to Share!
                      </label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)}></img>
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <div style={{ position: "relative" }}>
                        <input
                          className="video--link"
                          type="text"
                          placeholder=""
                          value={videoLink}
                          onChange={e => setVideoLink(e.target.value)}
                        />
                        <label>Video URL</label>
                        <span className="focus-border"></span>
                      </div>
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src={shareImageIcon} alt="share-image" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src={shareVideo} alt="share-video" />
                </AssetButton>
              </AttachAssets>

              <ShareComment>
                <AssetButton className={"comment--btn"}>
                  <img src={shareComment} alt="share-comment" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={
                  !editorText
                    ? true
                    : !shareImage.name && !videoLink.length
                    ? true
                    : false
                }
                onClick={event => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
      {errorModal && (
        <ErrorModal
          error={errorText}
          handleErrorModal={setErrorModal}
        ></ErrorModal>
      )}
    </>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.5);
  .modal--inactive {
    animation: animateBottom 0.3s;
    animation-fill-mode: forwards;
    @keyframes animateBottom {
      0% {
        opacity: 1;
        transform: translateY(0%);
      }
      100% {
        opacity: 0;
        transform: translateY(150%);
      }
    }
  }
  /* Text field effect */
  .video--link {
    border: 0;
    padding: 4px 0;
    border-bottom: 1px solid #ccc;
    background-color: transparent;
    width: 100%;
    height: 35px;
    font-size: 13px;
    outline: none;
  }

  .video--link ~ .focus-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #3399ff;

    transition: 0.4s;
  }
  .video--link:focus ~ .focus-border,
  .has-content.video--link ~ .focus-border {
    width: 100%;
    transition: 0.4s;
  }
  .video--link ~ label {
    position: absolute;
    left: 0;
    width: 100%;
    top: 9px;
    color: #aaa;
    transition: 0.3s;
    z-index: -1;
    letter-spacing: 0.5px;
  }
  .video--link:focus ~ label,
  .has-content.video--link ~ label {
    top: -5px;
    font-size: 12px;
    color: #3399ff;
    transition: 0.3s;
  }
  /*****************/
`;
const Content = styled.div`
  width: 100%;
  max-height: 90%;
  max-width: 552px;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  overflow-wrap: break-word;
  background: #fff;
  transition: opacity 150ms ease-in-out;
  opacity: 0;
  animation: animateModal 0.4s;
  animation-fill-mode: forwards;
  @keyframes animateModal {
    0% {
      opacity: 0;
      transform: translateY(150%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;
const Header = styled.header`
  display: flex;
  padding: 0.5rem 1.8rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  h2 {
    color: rgba(0, 0, 0, 0.7);
    font-weight: 450;
    font-size: 1.2rem;
  }
  button {
    background: transparent;
    border: none;
    outline: none;
    z-index: 9999;
    img {
      z-index: -9999;
      transition: 0.1s cubic-bezier(0, 0, 0.33, 0.74);
      padding: 9px;
      width: 40px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;
const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    backgorund-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 7px;
  height: 40px;
  min-width: auto;
  background: transparent;
  border: none;
  margin: none;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.5);
  transition: 0.15s cubic-bezier(0, 0, 0.33, 0.74);
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.07);
    color: rgba(0, 0, 0, 0.8);
  }
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    border-radius: 15px !important;
    svg,
    img {
      margin-right: 5px;
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${props => (props.disabled ? "rgba(0,0,0,0.1)" : "#0a66c2")};
  border: none;
  color: ${props => (props.disabled ? "rgba(0,0,0,0.5)" : "white")};
  cursor: pointer;
  transition: 0.15s cubic-bezier(0, 0, 0.33, 0.74);
  &:hover {
    background: ${props => !props.disabled && "#004182"};
  }
`;
const Editor = styled.div`
  padding: 12px 30px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    outline: none;
    border: none;
    font-size: 15px;
  }
  input:not(.video--link) {
    width: 100%;
    height: 35px;
    font-size: 13px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
const mapStateToProps = state => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = dispatch => ({
  postArticle: payload => dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
