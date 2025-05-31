import {
    createSlice,
} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
   
    filter: {
        status: null,
        source: null,
        counsellor: null,
        manager: null,
        date: {
            startDate: new Date(),
            endDate: dayjs(new Date(), 7),
            key: 'created_at'
          }
     
    }
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      
        setDate: (state, action) => {
            const {key, startDate, endDate} = action.payload;
            state.filter.date = {key, startDate, endDate}
        },
        setFilter: (state, action) => {
          
            const {key, value} = action.payload;
            state.filter[key] = value
        }
    },
});
export const {
    setDate,
    setFilter
} = dashboardSlice.actions;


export default dashboardSlice.reducer;

