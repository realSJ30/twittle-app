import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import React from "react";

const Home = () => {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's up?" />
      <PostFeed />
    </>
  );
};

export default Home;
