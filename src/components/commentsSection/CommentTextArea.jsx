/* eslint-disable react/prop-types */
import TextareaAutosize from "react-textarea-autosize";
import Swal from "sweetalert2";

const CommentTextArea = ({ inputText, onChangeHandler, auth }) => {
  const onclickHandler = () => {
    if (!auth) {
      Swal.fire("You need to be logged in to post a comment.");
    }
  };
  return (
    <>
      <TextareaAutosize
        onClick={onclickHandler}
        minRows={4}
        maxRows={6}
        value={inputText}
        onChange={onChangeHandler}
        placeholder='Leave a comment...'
        className='w-full rounded-lg text-zinc-800 '
      />
    </>
  );
};

export default CommentTextArea;
