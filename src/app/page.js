"use client"

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Jobs from "@/components/sections/jobs";

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const page = () => {
  return (
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
    </StyledMainContainer>
  );
};

export default page;
