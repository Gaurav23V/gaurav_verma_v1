"use client";

import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Icon } from "@/components/icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { srConfig } from "@/config";
import initScrollReveal from "@/utils/sr";

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: "";
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const initSR = async () => {
      const sr = await initScrollReveal();
      if (
        (sr && revealTitle.current,
        revealArchiveLink.current,
        revealProjects.current)
      ) {
        sr.reveal(revealTitle.current, srConfig());
        sr.reveal(revealArchiveLink.current, srConfig());
        revealProjects.current.forEach((ref, i) =>
          sr.reveal(ref, srConfig(i * 100))
        );
      }
    };

    const timer = setTimeout(() => {
      fetchProjects();
      initSR();
    }, 1750);

    return () => clearTimeout(timer);
  }, []);

  const GRID_LIMIT = 6;
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const LazyProjectContent = lazy(async ({ slug }) => {
    const response = await fetch(`/content/projects/${slug}.md`);
    const markdown = await response.text();
    const processedContent = await remark().use(html).process(markdown);
    const contentHtml = processedContent.toString();

    return {
      default: () => <div dangerouslySetInnerHTML={{ __html: contentHtml }} />,
    };
  });

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

      <Link
        className="inline-link archive-link"
        to="/archive"
        ref={revealArchiveLink}
      >
        view the archive
      </Link>

      <ul className="projects-grid">
        {projectsToShow.map((project, i) => (
          <StyledProject key={i} ref={(el) => (revealProjects.current[i] = el)}>
            <Link
              href={
                project.external
                  ? project.external
                  : project.github
                  ? project.github
                  : "/"
              }
            >
              <div className="project-inner">
                <header>
                  <div className="project-top">
                    <div className="folder">
                      <Icon name="Folder" />
                    </div>
                    <div className="project-links">
                      {project.github && (
                        <a
                          href={project.github}
                          aria-label="GitHub Link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {project.external && (
                        <a
                          href={project.external}
                          aria-label="External Link"
                          className="external"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="project-title">{project.title}</h3>

                  <Suspense fallback={<div>Loading project details...</div>}>
                    <LazyProjectContent slug={project.slug} />
                  </Suspense>
                </header>

                <footer>
                  {project.tech && (
                    <ul className="project-tech-list">
                      {project.tech.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  )}
                </footer>
              </div>
            </Link>
          </StyledProject>
        ))}
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? "Less" : "More"}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;
