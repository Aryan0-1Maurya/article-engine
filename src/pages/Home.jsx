/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import Search from "../components/Search";
// import { Link } from "react-router-dom";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { Balancer } from "react-wrap-balancer";
import Tags from "../components/common/Tags";
// import Loader from "../components/Loader";
import CardSkeleton from "../components/skeleton/CardSkeleton";

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchLatestArticles = async () => {
      setLoading(true);
      const blogRef = collection(db, "blogs");
      const q = query(blogRef, orderBy("timestamp", "desc"), limit(6));
      const docSnap = await getDocs(q);
      let blogs = [];
      docSnap.forEach((doc) => {
        blogs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setLatestBlogs(blogs);
      setLoading(false);
    };
    fetchLatestArticles();
  }, []);

  return (
    <div className='mx-auto max-w-7xl transition-all duration-300 ease-in-out'>
      <div>
        <Hero />
      </div>
      {/* Categories */}
      <Tags />

      {/* Articles */}
      <div>
        <h1 className='my-12 pl-2 text-3xl font-extrabold md:pl-9 md:text-4xl'>
          <Balancer>Latest articles on the web</Balancer>
        </h1>
        <div className=' mx-auto grid w-[80%] grid-cols-1 gap-5 md:w-[95%] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : latestBlogs && latestBlogs.length > 0 ? (
            latestBlogs.map((blog, index) => (
              <Card key={index} id={blog.id} blog={blog.data} />
            ))
          ) : (
            <p className='mt-24 text-center text-4xl font-extrabold'>
              No Article found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
