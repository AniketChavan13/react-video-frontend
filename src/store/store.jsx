import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../slicers/video-slicer";

const store = configureStore({
  reducer: {
    video: videoReducer, // <-- this name must match useSelector path
  },
});

export default store;


