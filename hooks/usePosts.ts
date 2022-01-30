import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "../helpers/firebase";
import { config } from "../webapp-config";

export interface Post {
  title?: string;
  description?: string;
  imageURL?: string;
  postId?: number | string;
  body?: string;
}

export const mockPosts = [
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
    postId: 2,
    body: "lorem ipsum sit amet dolor",
  },
  {
    title: "Blog 3",
    description: "Desc1233123123",
    imageURL:
      "https://www.rd.com/wp-content/uploads/2020/05/ok-vs-okay-scaled.jpg",
    postId: 3,
    body: "lorem ipsum sit amet dolor",
  },
  {
    title: "Blog 4",
    description: "Desc1233123123",
    imageURL:
      "https://www.rd.com/wp-content/uploads/2020/05/ok-vs-okay-scaled.jpg",
    postId: 4,
    body: "lorem ipsum sit amet dolor",
  },
];

export const getPosts = async () => {
  const db = getDatabase();
  const myRef = ref(db, "posts/");

  return config.isDemo
    ? new Promise((res) => {
        res(mockPosts);
      })
    : await (await get(myRef)).val();
};
