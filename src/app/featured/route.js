import { NextResponse } from "next/server";
import fs from 'fs';
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html'

export async function GET(request) {
    const featuredDirectory = path.join(process.cwd(), 'public/content/featured');
    const projectNames = fs.readdirSync(featuredDirectory);
  
    const featuredProjectsData = await Promise.all(
      projectNames.map(async (projectName) => {
        const filePath = path.join(featuredDirectory, projectName, 'index.md');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);
        const slug = projectName.replace(/[^a-z0-9]+/gi, "-");
  
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
        const contentHtml = processedContent.toString();
  
        return {
          ...matterResult.data,
          html: contentHtml,
          slug: slug, // Create a slug for routing
        };
      })
    );

    featuredProjectsData.sort((a, b) => Number(a.date) - Number(b.date));
  
    return NextResponse.json(featuredProjectsData);
  }