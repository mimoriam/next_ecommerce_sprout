import getPosts from "@/server/actions/get-posts";
import createPost from "@/server/actions/create-post";

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

          <br />

          <form action={createPost}>
            <input
              className="bg-black"
              type="text"
              name="title"
              placeholder="Title"
            />
            <button type="submit">Submit</button>
          </form>
        </main>
      </>
    );
  }
}
