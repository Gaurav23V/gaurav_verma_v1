"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import { srConfig } from "@/config";
import initScrollReveal from "@/utils/sr";

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const initSR = async () => {
        const sr = await initScrollReveal();
        if (sr && revealContainer.current) {
          sr.reveal(revealContainer.current, srConfig());
        }
      };

      initSR();
    }, 2000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  const skills = [
    "Python",
    "JS",
    "NextJS",
    "NLP",
    "React-Native",
    "Computer-Vision",
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I am Gaurav and i enjoy exploring new tech. Fell in love with
              computers ever since I played my first computer game, and still
              can't control the excitement I get after hearing about something
              new.
            </p>
            <p>
              Fast-forward to today, and I’ve explore various fields such as
              MLOps and Web Development. Also have been a part of the{" "}
              <a href="https://gdsc.community.dev/indian-institute-of-information-technology-kota-india/">
                Google Developers Student Club
              </a>
              , Where I was able to improve my leadership and teaching skills.
              My main focus these days is contributing in open source programs
              and building backend at <a href="https://upvalue.in/">UpValue</a>.
            </p>

            <p>
              I also recently{" "}
              <a href="https://gaurav23v.hashnode.dev/">launched a blog</a>{" "}
              where I share anything new I am exploring or building.
            </p>
            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Image
              src="/images/me.webp"
              alt="Headshot"
              width={300}
              height={375}
              className="img"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
