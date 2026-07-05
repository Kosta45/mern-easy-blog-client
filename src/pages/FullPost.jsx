import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const FullPost = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataPost, setPostData] = useState();

  console.log(params);
  console.log(dataPost);

  useEffect(() => {
    axios
      .get(`/posts/${params.id}`)
      .then((res) => {
        console.log(res);
        setPostData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error during getting the article");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={dataPost?._id}
        title={dataPost?.title}
        imageUrl={dataPost.imageUrl ? `${dataPost.imageUrl}` : ""}
        user={dataPost?.user}
        createdAt={dataPost?.createdAt}
        viewsCount={dataPost?.viewsCount}
        commentsCount={dataPost?.commentsCount}
        tags={dataPost?.tags}
        isFullPost
      >
        <Markdown remarkPlugins={remarkGfm}>{dataPost?.text}</Markdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "It's a test comment 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
