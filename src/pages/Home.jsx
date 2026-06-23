import { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";
import { selectPostsData, selectPosts } from "@/redux/selectors/postsSelectors";
import { selectTagsData } from "@/redux/selectors/tagsSelectors";
import { fetchPosts, fetchTags } from "@/redux/slices/postsSlice";
import { selectUserData } from "@/redux/selectors/authSelectors.js";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  console.log(userData);

  const postsData = useSelector(selectPostsData);
  const tagsData = useSelector(selectTagsData);
  const posts = useSelector(selectPosts);
  console.log(postsData);
  console.log(tagsData);

  const isPostsLoading = postsData.status === "loading";
  const isTagsLoading = tagsData.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid size={8}>
          {(isPostsLoading ? [...Array(5)] : posts).map((postElem, index) => (
            <Post
              key={postElem?._id || index}
              isLoading={isPostsLoading}
              id={postElem?._id}
              title={postElem?.title}
              imageUrl={
                postElem?.imageUrl
                  ? `${import.meta.env.VITE_API_URL}${postElem.imageUrl}`
                  : ""
              }
              user={postElem?.user}
              createdAt={postElem?.createdAt}
              viewsCount={postElem?.viewsCount}
              commentsCount={3}
              tags={postElem?.tags}
              isEditable={userData?._id === postElem?.user._id}
            />
          ))}
        </Grid>
        <Grid size={4}>
          <TagsBlock items={tagsData.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Test User",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Test comment",
              },
              {
                user: {
                  fullName: "Test User",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
