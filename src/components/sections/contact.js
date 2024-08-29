import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { srConfig, email } from "@/config";
import initScrollReveal from "@/utils/sr";

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
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
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What&apos;s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I am currently seeking internship opportunities in Machine Learning and
        Software Development roles. If you&apos;re looking for someone eager to
        learn and contribute, I would love to connect with you!
      </p>

      {/* No changes to the email link */}
      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>
    </StyledContactSection>
  );
};

export default Contact;
