/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const BlogEditor = ({ blogData, setBlogData }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const onchangeHandler = (value) => {
    setBlogData({
      ...blogData,
      content: value,
    });
  };

  return (
    <div className=''>
      <ReactQuill
        theme={"snow"}
        modules={modules}
        formats={formats}
        value={blogData?.content}
        onChange={onchangeHandler}
        style={{
          height: "300px",
        }}
        className='mt-6 h-full rounded-md border-zinc-800 text-lg text-zinc-800'
      />
    </div>
  );
};

export default BlogEditor;
