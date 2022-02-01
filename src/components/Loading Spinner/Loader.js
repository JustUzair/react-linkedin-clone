import React from "react";
import styled from "styled-components";

import "./Loader.css";
function Loader() {
  return (
    <div className="overlay">
      <div className="overlay__inner">
        <div className="overlay__content">
          <span className="spinner"></span>
        </div>
      </div>
    </div>
  );
}

export { Loader };
