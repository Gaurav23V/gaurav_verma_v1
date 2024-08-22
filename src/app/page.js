"use client"

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const page = () => {
  return (
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
    </StyledMainContainer>
  );
};

export default page;
