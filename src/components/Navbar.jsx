import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice";
import { useNavigate } from "react-router";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/logout",
        {},
        { withCredentials: true },
      );
      dispatch(clearUser());
      return navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-200 p-6 shadow-xl">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <p className="flex items-center">welcome, {user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
