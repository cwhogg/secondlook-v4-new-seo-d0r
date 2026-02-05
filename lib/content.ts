import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  type: string;
  date: string;
  content: string;
  targetKeywords?: string[];
  ideaName?: string;
  status?: string;
}

const typeToDirectory: Record<string, string> = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparison',
  'faq': 'content/faq'
};

export async function getAllPosts(type: string): Promise<ContentItem[]> {
  const contentDirectory = typeToDirectory[type];
  if (!contentDirectory) {
    return [];
  }

  try {
    const fullPath = path.join(process.cwd(), contentDirectory);
    const fileNames = fs.readdirSync(fullPath);
    
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          return await getPostBySlug(type, slug);
        })
    );
    
    return allPostsData
      .filter((post): post is ContentItem => post !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.warn(`Content directory ${contentDirectory} not found:`, error);
    return [];
  }
}

export async function getPostBySlug(type: string, slug: string): Promise<ContentItem | null> {
  const contentDirectory = typeToDirectory[type];
  if (!contentDirectory) {
    return null;
  }

  try {
    const fullPath = path.join(process.cwd(), contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(content);
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      type: data.type || type,
      date: data.date || new Date().toISOString(),
      content: processedContent.toString(),
      targetKeywords: data.targetKeywords || [],
      ideaName: data.ideaName,
      status: data.status
    };
  } catch (error) {
    console.warn(`Post ${slug} not found in ${contentDirectory}:`, error);
    return null;
  }
}