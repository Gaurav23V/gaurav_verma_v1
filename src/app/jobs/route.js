import { NextResponse } from "next/server";
import fs from 'fs';
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html'

export async function GET(request) {
    const jobsDirectory = path.join(process.cwd(), 'public/content/jobs');
    const companyNames = fs.readdirSync(jobsDirectory);

    const jobsData = await Promise.all(
        companyNames.map(async (companyName) => {
            const filePath = path.join(jobsDirectory, companyName, "index.md");
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const matterResult = matter(fileContents);

            const processedContent = await remark()
                .use(html)
                .process(matterResult.content);
            const contentHtml = processedContent.toString();

            return {
                ...matterResult.data,
                html: contentHtml,
                filename: `${companyName}/index.md`,
            };
        })
    );

    // Sort by date descending (newest first)
    jobsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json(jobsData)
}