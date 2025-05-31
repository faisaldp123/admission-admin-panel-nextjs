import { setDate, setFilter } from '@/store/slice/dashboard';
import { Autocomplete, Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import { useDispatch, useSelector } from 'react-redux';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import dayjs from 'dayjs';
import FilterBtn from '../leads/FilterBtn';

const DashboardFilter = () => {
  const dispatch = useDispatch();
  const [isDatePickerShow, setIsDatePickerShow] = useState(false)
  const { filter: filterSlice, dashboard } = useSelector(state => state);
  const { filter } = dashboard;
  const { masterValues } = filterSlice;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleChange(key, value) {

    dispatch(setFilter({ key, value }))
  }
  function handleSelect(ranges) {
    console.log(ranges);

  }
  function handleDate(date) {
    dispatch(setDate({...date.created_at}))
  }

  return (
    <>
    <Stack direction="row" spacing={2} style={{ marginBottom: "1rem", justifyContent: "space-between" }}>
      <Autocomplete

        value={filter.counsellor}
        onChange={(event, newValue) => {
          handleChange("counsellor", newValue)

        }}
        options={masterValues.counsellor}
        sx={{ width: "200px" }}
        renderInput={(params) => <TextField {...params} label="Counsellor" />}
      />
      <div>
      <div className='relative'>
        <FilterBtn>
        <Button variant='outlined' className='me-3'>
          Filter
        </Button>
        </FilterBtn>
     
        <Button variant='outlined' onClick={() => setIsDatePickerShow(prev => !prev)}>
          Date Filter
        </Button>
        <div className="absolute right-0 text-black shadow-lg">
          {
            isDatePickerShow &&
            <DateRangePicker
            onChange={handleDate}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[filter.date]}
            direction="horizontal"
          />
          }

        </div>

      </div>
      </div>
      



    </Stack>

    </>
  )
}

export default DashboardFilter