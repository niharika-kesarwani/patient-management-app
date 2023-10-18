import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wards: [],
  status: "idle",
  error: null
};

const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(
    "https://patient-management-backend.niharika2018.repl.co/wards"
  );
  return response.data.wards;
});

const addWardAsync = createAsyncThunk("wards/addWardAsync", async (newWard) => {
  const response = await axios.post(
    "https://patient-management-backend.niharika2018.repl.co/wards",
    newWard
  );
  return response.data.ward;
});

const updateWardAsync = createAsyncThunk(
  "wards/updateWardAsync",
  async ({ id, updatedWard }) => {
    const response = await axios.put(
      `https://patient-management-backend.niharika2018.repl.co/wards/${id}`,
      updatedWard
    );
    return response.data.ward;
  }
);

const deleteWardAsync = createAsyncThunk(
  "wards/deleteWardAsync",
  async (id) => {
    const response = await axios.delete(
      `https://patient-management-backend.niharika2018.repl.co/wards/${id}`
    );
    return response.data.ward;
  }
);

// const getAWardAsync = createAsyncThunk("wards/getAWardAsync", async (id) => {
//   const response = await axios.get(
//     `https://patient-management-backend.niharika2018.repl.co/wards/${id}`
//   );
//   return response.data.ward;
// });

const wardsSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards.push(action.payload);
    },
    [addWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWard = action.payload;
      const index = state.wards.findIndex(
        (ward) => ward._id === updatedWard._id
      );
      if (index !== -1) {
        state.wards[index] = updatedWard;
      }
    },
    [updateWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload._id
      );
    },
    [deleteWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
    // [getAWardAsync.pending]: (state) => {
    //   state.status = "loading";
    // },
    // [getAWardAsync.fulfilled]: (state, action) => {
    //   console.log(action);
    //   state.status = "success";
    //   state.singleWard = action.payload;
    // },
    // [getAWardAsync.rejected]: (state, action) => {
    //   state.status = "error";
    //   state.error = action.error.message;
    // }
  }
});

export {
  wardsSlice,
  fetchWards,
  addWardAsync,
  updateWardAsync,
  deleteWardAsync
};

export default wardsSlice.reducer;
