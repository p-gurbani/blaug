import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { uploadFile } from "../../services/upload";
import Request from "../../services/Request";
import { userUpdate } from "../../context/Actions";
import { SERVER_BASE_URL } from "../../links";
import dummyProfileImage from "../../images/DummyUserProfileImage.jpg";

const Settings = () => {
  const { dispatch, user } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [file, setFile] = useState(null);

  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailure, setUpdateFailure] = useState(false);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword("");
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateSuccess(false);
    setUpdateFailure(false);
    try {
      const payload = { userId: user._id, username, email, password };
      const filename = await uploadFile(file);
      filename && (payload.imageFileName = filename);
      const result = await Request.put(`/users/${user._id}`, payload);
      if (result.success && result.user) {
        dispatch(userUpdate(result.user));
        setUpdateSuccess(true);
      } else {
        setUpdateFailure(true);
      }
    } catch (err) {
      setUpdateFailure(true);
    }
    setUpdating(false);
  };

  const deleteAccount = async () => {
    try {
      const result = await Request.delete(`/users/${user._id}`);
      if (result.success) {
        window.location.reload();
      }
    } catch (err) {}
  };

  return (
    <div className="st">
      <div className="st-wrapper">
        <div className="st-titles">
          <span className="st-title-update">Update Your Account</span>
        </div>
        <form className="st-form" onSubmit={updateProfile}>
          <label>Profile Picture</label>
          <div className="st-profile-pic">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.imageURL
                  ? `${SERVER_BASE_URL}${user.imageURL}`
                  : dummyProfileImage
              }
              alt=""
            />
            <label htmlFor="fileinput">
              <i className="far st-profile-pic-icon fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileinput"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <label>Username</label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="st-submit" type="submit" disabled={updating}>
            Update
          </button>
          <span className="st-title-delete" onClick={deleteAccount}>
            Delete Account
          </span>
          {updateSuccess && (
            <span className="st-msg success">Profile has been updated.</span>
          )}
          {updateFailure && (
            <span className="st-msg failure">
              Couldn't update your profile.
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
