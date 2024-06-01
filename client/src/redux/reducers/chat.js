import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    notificationCount: 0,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        increamentNotication: (state) => {
            state.notificationCount += 1;
        },
        resetNotificationCount: (state) => {
            state.notificationCount = 0;
        },
    }
});


export default chatSlice;
export const {  
    increamentNotication,
    resetNotificationCount,
} = chatSlice.actions;