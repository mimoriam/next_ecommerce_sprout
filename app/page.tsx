import getPosts from "@/server/actions/get-posts";

export default async function Home() {
  const { error, success } = await getPosts();

  if (error) {
    throw new Error(error);
  }

  if (success) {
    return (
      <>
        <main>
          {success.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
            </div>
          ))}
        </main>
      </>
    );
  }
}
