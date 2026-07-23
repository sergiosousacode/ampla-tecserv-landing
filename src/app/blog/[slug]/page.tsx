import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({
  params,
}: PostPageProps) {
  const { slug } = await params;

  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Link href="/blog">Voltar ao blog</Link>

      <article>
        <Link href={`/blog/categoria/${post.categoria.slug}`}>
          {post.categoria.nome}
        </Link>

        <h1>{post.titulo}</h1>

        <p>{post.conteudo}</p>
      </article>
    </main>
  );
}