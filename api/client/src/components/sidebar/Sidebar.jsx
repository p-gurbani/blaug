import { useEffect, useState } from "react";
import "./sidebar.css";
import Request from "../../services/Request";
import { Link } from "react-router-dom";
import { SERVER_BASE_URL } from "../../links";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const result = await Request.get("/categories");
        setCategories(result.categories);
      } catch (err) {}
    };
    getCategories();
  }, []);

  return (
    <div className="sb">
      <div className="sb-item">
        <div className="sb-title">ABOUT ME</div>
        <img
          src={SERVER_BASE_URL + "/images/BLG_1641623331216PankajGurbani.jpg"}
          alt=""
          className="sb-profile-img"
        />
        <p className="sb-desc">
          Hey there! I’m <b>Pankaj</b>, I design and develop visually appealing
          and enjoyable websites, with the help of my design-sense, and my
          passion to make the internet a beautiful place to visit.
        </p>
      </div>

      <div className="sb-item">
        <div className="sb-title">CATEGORIES</div>
        <ul className="sb-list">
          {categories &&
            categories.map((cat) => (
              <li key={cat._id} className="sb-list-item">
                <Link to={`/?category=${cat.name}`} className="link">
                  {cat.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div className="sb-item">
        <div className="sb-title">FOLLOW ME</div>
        <div className="sb-social">
          <a
            className="link"
            href="https://twitter.com/pankajgurbani_"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab sb-social-icon fa-twitter-square"></i>
          </a>
          <a
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/pankajgurbani.connect"
          >
            <i className="fab sb-social-icon fa-instagram-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
