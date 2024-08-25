"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { srConfig } from "@/config";
import initScrollReveal from "@/utils/sr"; // Assuming you have sr.js in your utils folder

const StyledTableContainer = styled.div`
  margin: 100px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.year {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }
    }
  }
`;

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealBlogs = useRef([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        console.log("Fetched blog data:", data);
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    const initSR = async () => {
      const sr = await initScrollReveal();
      if (sr) {
        sr.reveal(revealTitle.current, srConfig());
        sr.reveal(revealTable.current, srConfig(200, 0));
        revealBlogs.current.forEach((ref, i) =>
          sr.reveal(ref, srConfig(i * 10))
        );
      }
    };

    fetchBlogData();
    initSR();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Unknown Date"
      : date.getFullYear().toString();
  };

  return (
    <main>
      <header ref={revealTitle}>
        <h1 className="big-heading">My Blogs</h1>
        <p className="subtitle">A big list of things I've written</p>
      </header>

      <StyledTableContainer ref={revealTable}>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {blogData.length > 0 ? (
              blogData.map((post, i) => (
                <tr key={i} ref={(el) => (revealBlogs.current[i] = el)}>
                  <td className="overline year">{formatDate(post.date)}</td>
                  <td className="title">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title || "Untitled"}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No blog posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </StyledTableContainer>
    </main>
  );
};

export default Blog;
