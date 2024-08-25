import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(request) {
  const blogDirectory = path.join(process.cwd(), "public/content/blogs");
  const blogSlugs = fs.readdirSync(blogDirectory);

  const blogData = blogSlugs.map((blogSlug) => {
    const filePath = path.join(blogDirectory, blogSlug, "index.md");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      slug: blogSlug,
      content: content.trim().split('\n')[0], // Get first line of content
    };
  });

  return NextResponse.json(blogData);
}