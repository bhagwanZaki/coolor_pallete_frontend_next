import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLast: false,
  data: [],
};

export const colorData = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {
    getColor: (state, action) => {
      return {
        data: [ ...state.data,...action.payload.data],
        isLast : action.payload.isLast
      };
    },

    addColor: (state, action) => {
      return {
        ...state,
        data: [ action.payload,...state.data], // Add the new data to the end of the array
      };
    },
  },
});

export const { getColor, addColor } = colorData.actions;
export default colorData.reducer;
