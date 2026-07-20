import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addConnections } from "../store/connectionSlice";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constansts";
import { Link } from "react-router";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
        // console.log(res.data);
      dispatch(addConnections(res.data));
    } catch (err) {
      console.dir(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return "";
  if (connections.length === 0)
    return <div className="text-lg font-bold text-center my-40">No connections, Send request to get connections</div>;

  return (
    <div className="">
      <div className="text-3xl font-bold text-white flex justify-center mt-8">
        Connections
      </div>
      {connections.map((connection) => {
        return (
          <div className="card card-side bg-base-200 h-40 shadow-sm mx-auto w-1/2 my-4" key={connection._id}>
            <figure className="p-4">
              <img
                src={connection.photoUrl}
                alt="Movie"
                className="rounded-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{connection.firstName} {connection.lastName}</h2>
              {connection.age && connection.gender && <p>{connection.age} - {connection.gender}</p>}
              {connection.about && <p>{connection.about}</p>}
            </div>
            <div>
              <Link to={"/chat/" + connection._id} className="bg-secondary p-3 rounded">Chat</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
