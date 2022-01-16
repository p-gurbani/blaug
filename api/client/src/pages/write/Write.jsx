import { useContext, useRef, useState } from "react";
import "./write.css";
import Request from "../../services/Request";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../services/upload";

const Write = () => {
  const navigate = useNavigate();

  // Auto-grow text area as the user types
  const textAreaRef = useRef();
  const autoGrow = () => {
    const el = textAreaRef.current;
    el.style.height = el.scrollHeight + "px";
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const publish = async (e) => {
    e.preventDefault();
    try {
      const newPost = { username: user.username, title, desc };
      const filename = await uploadFile(file);
      if (filename) {
        newPost.image = filename;
      }
      const result = await Request.post("/posts", newPost);
      if (result.success) {
        navigate(`/post/${result.post._id}`);
      }
    } catch (err) {}
  };

  return (
    <div className="wt">
      <div className="wt-img-container">
        {file && (
          <img src={URL.createObjectURL(file)} alt="" className="wt-img" />
        )}
      </div>
      <form className="wt-form" onSubmit={publish}>
        <div className="wt-form-group">
          <label htmlFor="fileinput">
            <i className="fas wt-icon-add fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileinput"
            className="wt-file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="wt-input"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="wt-form-group">
          <textarea
            placeholder="Tell your story..."
            type="text"
            onInput={autoGrow}
            ref={textAreaRef}
            className="wt-input wt-textarea"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="wt-submit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
