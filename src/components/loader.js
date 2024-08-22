"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head"; // Use Next.js's Head component
import PropTypes from "prop-types";
import anime from "animejs";
import styled from "styled-components";
import { IconLoader } from "./icons";

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: 0;
    &.show {
      opacity: 1;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #G {
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const logoWrapper = document.querySelector(".logo-wrapper");
      logoWrapper.classList.add("show");
      animate();
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: "#logo path",
        delay: 300,
        duration: 1500,
        easing: "easeInOutQuart",
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: "#logo #G",
        duration: 700,
        easing: "easeInOutQuart",
        opacity: 1,
      })
      .add({
        targets: "#logo",
        delay: 500,
        duration: 300,
        easing: "easeInOutQuart",
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: ".loader",
        duration: 200,
        easing: "easeInOutQuart",
        opacity: 0,
        zIndex: -1,
      });
  };

  return (
    <StyledLoader className="loader">
      <Head>
        {" "}
        <body className="hidden" />
      </Head>

      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.PropTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
