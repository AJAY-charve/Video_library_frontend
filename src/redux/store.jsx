
import { configureStore } from "@reduxjs/toolkit"
import likesSlicer from "./video-slicer.jsx"

export default configureStore({
    reducer: {
        store: likesSlicer
    }
})