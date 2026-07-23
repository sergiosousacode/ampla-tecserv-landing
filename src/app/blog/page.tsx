import Link from "next/link";
import { posts } from "@/data/posts";

export default function BlogPage() {
  return (
    <main>
      <h1>Blog da Ampla TecServ</h1>

      <section>
        {posts.map((post) => (
          <article key={post.slug}>
            <p>
              <Link href={`/blog/categoria/${post.categoria.slug}`}>
                {post.categoria.nome}
              </Link>
            </p>

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