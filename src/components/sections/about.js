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
    "Next.js",
    "Deep-Learning",
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
              I am Gaurav and I enjoy tinkering with things that are fun. My
              interest in web development started back in 2012 when I decided to
              try editing custom Tumblr themes — turns out hacking together a
              custom reblog button taught me a lot about HTML &amp; CSS!
            </p>
            <p>
              Fast-forward to today, and I’ve had the privilege of working at{" "}
              <a href="https://us.mullenlowe.com/">an advertising agency</a>,{" "}
              <a href="https://starry.com/">a start-up</a>,{" "}
              <a href="https://www.apple.com/">a huge corporation</a>, and{" "}
              <a href="https://scout.camd.northeastern.edu/">
                a student-led design studio
              </a>
              . My main focus these days is building accessible, inclusive
              products and digital experiences at{" "}
              <a href="https://upstatement.com/">Upstatement</a> for a variety
              of clients.
            </p>

            <p>
              I also recently{" "}
              <a href="https://www.newline.co/courses/build-a-spotify-connected-app">
                launched a course
              </a>{" "}
              that covers everything you need to build a web app with the
              Spotify API using Node &amp; React.
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
              width={500}
              height={500}
              className="img"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;