import React from "react";

import styled from "styled-components";
function ErrorModal(props) {
  const closeErrorModal = e => {
    e.target.closest(".modal").classList.add("hide");
    setTimeout(() => {
      e.target.closest(".frame").classList.add("hidden");
    }, 720);
    props.handleErrorModal(false);
  };
  return (
    <Frame className="frame">
      <Modal className="modal">
        <img
          src="https://100dayscss.com/codepen/alert.png"
          width="44"
          height="38"
        />
        <span className="title">Oh snap!</span>
        <p>{props.error ? props.error : "An Error has occured"}</p>
        <div className="button" onClick={closeErrorModal}>
          Dismiss
        </div>
      </Modal>
    </Frame>
  );
}
const Frame = styled.div`
  color: #415868;
  font-family: "Open Sans", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;

  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000;
  &.hidden {
    display: none;
  }
`;
const Modal = styled.div`
  position: absolute;
  width: 280px;
  height: 210px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 3px;
  box-shadow: 4px 8px 12px 0 rgba(0, 0, 0, 0.4);
  text-align: center;
  overflow: hidden;
  animation: show-modal 0.7s ease-in-out;
  transform-origin: center center !important;
  animation-fill-mode: forwards;
  @keyframes show-modal {
    0% {
      transform: scale(0) translate(-50%, -50%);
      opacity: 0;
    }
    60% {
      transform: scale(1.1) translate(-50%, -50%);
    }
    80% {
      transform: scale(0.95) translate(-50%, -50%);
    }
    100% {
      transform: scale(1) translate(-50%, -50%);
      opacity: 1;
    }
  }

  @keyframes hide-modal {
    0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
    }
    20% {
      transform: scale(1.1) translate(-50%, -50%);
    }
    100% {
      transform: scale(0) translate(-50%, -50%);
      opacity: 0;
    }
  }
  &.hide {
    transform: translate(-50%, -50%);
    animation: hide-modal 0.6s ease-in-out both;
    transform-origin: center center;
  }

  img {
    margin-top: 24px;
  }

  .title {
    display: block;
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    margin: 14px 0 5px 0;
  }

  p {
    font-size: 16px;
    font-weight: 300;
    line-height: 19px;
    margin: 0;
    padding: 0 30px;
  }

  .button {
    position: absolute;
    height: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f65656;
    color: #fff;
    line-height: 40px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #ec3434;
    }
  }
`;
export default ErrorModal;
