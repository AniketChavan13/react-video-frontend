import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    videos:[],
    savedVideos:[],
    videosCount:0
}

const videoSlicer = createSlice({
    name:'video',
    initialState,
    reducers:{
        addToSaveList:(state, action)=>{
            state.videos.push(action.payload);
            state.videosCount += 1;
        },
        removeFromSaveList:(state, action) =>{
            state.savedVideos = state.savedVideos.filter(video => video.VideoId!== action.payload);
            state.videosCount -= 1;
        },
    },
});

export const { addToSaveList, removeFromSaveList } = videoSlicer.actions;
export default videoSlicer.reducer;