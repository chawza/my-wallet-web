import React, { useReducer, useState } from "react";
import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import RecordList from "../../compontents/RecordList";
import useFetch from "../../utils/useFetch";
import { reducer } from "../../utils/Common";
import { TRANSACTION_API } from "../../constants/serviceUrls";

const oneMinuteInMilisecond = 60000;
const date30daysAgo = new Date((new Date()).getTime() - 30*24*60*oneMinuteInMilisecond)

const TransactionIntialState = {
  showAddModal: false,
  startDate: date30daysAgo,
  endDate: new Date()
}

const TransactionRecordPage = () => {
  const [state, dispatch] = useReducer(reducer, TransactionIntialState);
  const {data: { transactions }, refetch } = useFetch(TRANSACTION_API, {
    start_date: state.startDate,
    end_date: state.endDate
  });

  const handleDateChange = async (field, value) => {
    dispatch({ type: field, payload: value});
    await refetch()
  }

  const renderTopMenu = () => {
    return (
      <Box className='option-menu-top' sx={{ display: 'flex', justifyContent: 'space-between', my: 4}}>
        <Button
          variant='contained'
          onClick={() => dispatch({ type: 'showAddModal', payload: true })}
        >
          Add Record
        </Button>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction='row' spacing={2}>
            <DatePicker
              label='Start Date'
              value={state.startDate}
              onChange={(value) => handleDateChange('startDate', value)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label='End Date'
              value={state.endDate}
              onChange={(value) => handleDateChange('endDate', value)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </Box>
    )
  }

  return (
    <Box className="record-list-page">
      <Box classname='record-list-content-wrapper'>
        {
          renderTopMenu()
        }
        {
          transactions?.length > 0
          ? <RecordList records={transactions}/>
          : <Typography variant='h6'>No Transactions</Typography>
        }
      </Box>
    </Box>
  );
}

export default TransactionRecordPage;
