import React, { useState } from "react";
import CommentTextArea from "./CommentTextArea";
import { getAuth } from "firebase/auth";
import Loader from "../Loader";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const CommentSection = () => {
  const auth = getAuth();
  const { articleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [inputText, setinputText] = useState("");
  const onChangeHandler = (e) => {
    setinputText(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (auth) {
        const blogRef = doc(db, "blogs", articleId);
        const commentData = {
          comment: inputText.trim(),
          userId: auth.currentUser.uid,
          userName: auth.currentUser.displayName,
          userImage: auth.currentUser.photoURL,
          timestamp: new Date().toISOString(),
          uuid: uuidv4(),
        };
        // Fetching existing blogData
        const blogSnapshot = await getDoc(blogRef);
        const blogData = blogSnapshot.data();
        // Add the comments to a new field "comments" in the existing blog data
        if (!blogData.comments) {
          await setDoc(blogRef, { ...blogData, comments: [commentData] });
        } else {
          await updateDoc(blogRef, {
            comments: [...blogData.comments, commentData],
          });
        }

        // Update the document with the new blogData containing comments
        // await setDoc(blogRef, blogData);
        setinputText("");
        toast.success("Comment Posted!!");
        console.log("Try finished");
      }
    } catch (error) {
      if (!auth.currentUser) {
        Swal.fire("You need to be logged in to post a comment.");
      }
      console.log(error);
      // toast.error("Unable to post comment");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className='mt-4'>
      <h1 className='py-3 text-2xl text-cyan-800'>Comments ~</h1>
      <form onSubmit={onSubmitHandler}>
        {/* change to falsy */}
        <CommentTextArea
          inputText={inputText}
          onChangeHandler={onChangeHandler}
          auth={auth}
        />
        <button
          onSubmit={onSubmitHandler}
          type='submit'
          className='mt-8 w-full cursor-pointer rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white transition duration-200 ease-in-out active:scale-90'
        >
          Post comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
