import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constansts";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    // if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      // console.log(res);
      
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.dir(err);
    }
  };
  

  useEffect(() => {
    getFeed();
  }, []);

  // console.log(feed);
  
  if(!feed) return "";
  if(feed.length === 0) return <div className="text-center text-lg mt-20">No feed for now !!</div>
  
  return feed && <div className="my-20">
    <FeedCard feedData = {feed[0]}/>
  </div>;
};

export default Feed;
