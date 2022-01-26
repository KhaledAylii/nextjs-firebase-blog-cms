import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

export interface Post {
  title?: string;
  description?: string;
  imageURL?: string;
  postId?: number | string;
  body?: string;
}

const mockPosts = [
  {
    title: "Blog 1",
    description: "Desc1233123123",
    imageURL:
      "https://www.rd.com/wp-content/uploads/2020/05/ok-vs-okay-scaled.jpg",
    postId: 1,
    body: "lorem ipsum sit amet dolor",
  },
  {
    title: "Blog 2",
    description: "Desc1233123123",
    imageURL:
      "https://www.rd.com/wp-content/uploads/2020/05/ok-vs-okay-scaled.jpg",
    postId: 1,
    body: "lorem ipsum sit amet dolor",
  },
  {
    title: "Blog 3",
    description: "Desc1233123123",
    imageURL:
      "https://www.rd.com/wp-content/uploads/2020/05/ok-vs-okay-scaled.jpg",
    postId: 1,
    body: "lorem ipsum sit amet dolor",
  },
  {
    title: "Blog 4",
    description: "Desc1233123123",
    imageURL:
      "https://www.rd.com/wp-content/uploads/2020/05/ok-vs-okay-scaled.jpg",
    postId: 1,
    body: "lorem ipsum sit amet dolor",
  },
];

export const usePosts = (): Post[] => {
  const db = getDatabase();
  const myRef = ref(db, "posts/");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    onValue(myRef, (snapshot) => {
      const data = snapshot.val();
      setPosts(data);
    });
  }, []);

  return posts;
};
