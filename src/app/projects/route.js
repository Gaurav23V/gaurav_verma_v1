import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(request) {
  const projectsDirectory = path.join(process.cwd(), "public/content/projects");
  const filenames = fs.readdirSync(projectsDirectory);

  const projectsData = filenames
    .map((filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const matterResult = matter(fileContents);

      // Only include projects where showInProjects is true
      if (matterResult.data.showInProjects) {
        return {
          ...matterResult.data,
          slug: filename
            .replace(/\.md$/, "")
            .toLowerCase()
            .replace(/\s+/g, "-"), // Create slug from filename
        };
      }
    })
    .filter(Boolean); // Filter out undefined results

  return NextResponse.json(projectsData);
}
