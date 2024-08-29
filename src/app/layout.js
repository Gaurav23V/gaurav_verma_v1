"use client";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Email from "@/components/email";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Social from "@/components/social";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const BodyStyle = createGlobalStyle`
  body {
    overflow-y: auto !important;
  }
`;

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isHome) {
      setIsLoading(false);
    }
  }, [isHome]);

  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll("a"));
    if (allLinks.length > 0) {
      allLinks.forEach((link) => {
        if (link.host !== window.location.host) {
          link.setAttribute("rel", "noopener noreferrer");
          link.setAttribute("target", "_blank");
        }
      });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView();
            el.focus();
          }
        }, 0);
      }
      handleExternalLinks();
    }
  }, [isLoading, pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BodyStyle />
          <ClientOnly>
            {isLoading && isHome ? (
              <Loader finishLoading={() => setIsLoading(false)} />
            ) : (
              <StyledContent>
                <Nav isHome={isHome} />
                <Social isHome={isHome} />
                <Email isHome={isHome} />
                {children}
                <Footer />
              </StyledContent>
            )}
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}
