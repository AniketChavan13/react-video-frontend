import { configureStore } from "@reduxjs/toolkit";
import videoSlicers from "../slicers/video-slicer";

export default configureStore({

    reducer:{
        store:videoSlicers
    }
})
