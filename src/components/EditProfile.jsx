import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ userData }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [age, setAge] = useState(userData.age);
  const [gender, setGender] = useState(userData.gender);
  const [about, setAbout] = useState(userData.about);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleEditProfile = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:7777/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true },
      );
      //   console.log(res);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
      console.dir(err);
    }
  };

  return (
    <>
      {showToast && <div className="toast toast-top toast-center mt-14">
        <div className="alert alert-success">
          <span>Profile Edited successfully.</span>
        </div>
      </div>}
      <div className="flex justify-center my-16 items-start ">
        <div className="card card-border bg-base-200 w-96 mx-10">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name : </legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name : </legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age : </legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender : </legend>
                <input
                  type="text"
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL : </legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About : </legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="text-red-600 my-2">{error}</div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleEditProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
        <FeedCard
          feedData={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
    </>
  );
};

export default EditProfile;
