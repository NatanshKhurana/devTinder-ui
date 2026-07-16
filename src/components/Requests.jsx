import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequests } from "../store/requestSlice";
import { useSelector } from "react-redux";
import { clearRequest } from "../store/requestSlice";
import { BASE_URL } from "../utils/constansts";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
    //   console.log(res);
      dispatch(clearRequest(_id));
    } catch (err) {
      console.dir(err);
    }
  };

  const getRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true },
      );
      dispatch(addRequests(res.data.receivedRequests));
    } catch (err) {
      console.dir(err);
    }
  };
  //   console.log(requests);

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return "";
  if (requests.length === 0) return <div className="text-lg text-center mt-20">No requests for now !!</div>;
  return (
    <div>
      <div className="text-3xl font-bold text-center my-10">Requests</div>
      {requests.map((request) => {
        return (
          <div
            key={request.fromUserId._id}
            className="w-1/2 bg-gray-900 mx-auto flex justify-between p-4 mb-4"
          >
            <div>
              <img
                src={request.fromUserId.photoUrl}
                alt="profile photo"
                className="w-40 h-full rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p>
                {request.fromUserId.firstName} {request.fromUserId.lastName}
              </p>
              <p>
                {request.fromUserId.age} - {request.fromUserId.gender}
              </p>
              <p>{request.fromUserId.about}</p>
            </div>
            <div className="flex flex-col ">
              <button
                className="btn btn-dash btn-primary my-4"
                onClick={() =>
                  reviewRequest("rejected", request._id)
                }
              >
                Reject
              </button>
              <button
                className="btn btn-dash btn-secondary my-4"
                onClick={() =>
                  reviewRequest("accepted", request._id)
                }
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
