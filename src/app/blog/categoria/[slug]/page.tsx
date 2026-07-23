import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

type CategoriaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoriaPage({
  params,
}: CategoriaPageProps) {
  const { slug } = await params;

  const postsDaCategoria = posts.filter(
    (post) => post.categoria.slug === slug
  );

  if (postsDaCategoria.length === 0) {
    notFound();
  }

  const nomeCategoria = postsDaCategoria[0].categoria.nome;

  return (
    <main>
      <Link href="/blog">Voltar ao blog</Link>

      <h1>Categoria: {nomeCategoria}</h1>

      <section>
        {postsDaCategoria.map((post) => (
          <article key={post.slug}>
            <h2>
              <Link href={`/blog/${post.slug}`}>
                {post.titulo}
              </Link>
            </h2>

            <p>{post.resumo}</p>
          </article>
        ))}
      </section>
    </main>
  );
}