"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

const StyledBlogPost = styled.div`
  max-width: 700px; 
  margin: 0 auto; 
  padding: 100px 20px; 

  @media (max-width: 768px) {
    padding: 80px 10px; 
  }
`;

const StyledBlogTitle = styled.h1`
  font-size: clamp(40px, 8vw, 80px);  
  text-align: center;               
  margin-bottom: 20px;              
`;

const StyledBlogContent = styled.div`
  color: var(--green);         
  margin: 0 0 20px 0;           
  font-size: var(--fz-md);       
  font-family: var(--font-mono);   
  font-weight: 400;                 
  line-height: 1.5;              

  @media (max-width: 1080px) {
    font-size: var(--fz-sm);     
  }

  @media (max-width: 768px) {
    font-size: var(--fz-xs);     
  }

  a {                            
    ${({ theme }) => theme.mixins.inlineLink};
    line-height: 1.5;          
  }
`;

const BlogPost = ({ params }) => {
    const [postContent, setPostContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchPostContent = async () => {
            try {
                const response = await fetch(`/content/blogs/${params.slug}/index.md`);
                const markdown = await response.text();

                const matterResult = matter(markdown);
                setTitle(matterResult.data.title);

                const processedContent = await remark().use(html).process(matterResult.content);
                setPostContent(processedContent.toString());
            } catch (error) {
                console.error("Error fetching blog posrt content:", error);
            }
        };

        fetchPostContent();
    }, [params.slug]);

    return (
        <StyledBlogPost>
            <StyledBlogTitle className="big-heading">
                {title}
            </StyledBlogTitle>
            <StyledBlogContent 
                className="subtitle"
                dangerouslySetInnerHTML={{ __html: postContent }}
            />
        </StyledBlogPost>
    );
};

export default BlogPost;