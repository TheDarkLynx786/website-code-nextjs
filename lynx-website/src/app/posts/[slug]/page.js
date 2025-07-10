import { getPostFileNames, getFileNameFromSlug, getPostByFileName } from '@/app/_lib/posts';

let slugToFilenameMap = null;

export async function generateStaticParams() {
  const posts = getPostFileNames();
  console.log(posts);
  // Build a map from slug to filename
  slugToFilenameMap = {};
  return posts.map( ({ filename }) => ({ filename }) );
}

export default async function PostPage({ params }) {
  const filename = await getFileNameFromSlug(params.slug);
  console.log("filename fetched from slug: ", filename);
  const { contentHtml, frontmatter } = await getPostByFileName(filename);

  return (
    <article className="prose">
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}