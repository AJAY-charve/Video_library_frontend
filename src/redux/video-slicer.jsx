import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    MyVideoLibrary: [],
    videosCount: 0
}

const likeSlice = createSlice({
    name: "My Library",
    initialState,
    reducers: {
        addToLibrary(state, action) {
            state.MyVideoLibrary.push(action.payload);
            state.videosCount = state.MyVideoLibrary.length
        }
    }
})

export const { addToLibrary } = likeSlice.actions;
export default likeSlice.reducer