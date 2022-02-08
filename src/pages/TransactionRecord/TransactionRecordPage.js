import React, { useReducer } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import RecordList from "../../compontents/RecordList";
import useFetch from "../../utils/useFetch";
import { reducer } from "../../utils/Common";
import { TRANSACTION_API } from "../../constants/serviceUrls";

const TransactionIntialState = {
  start_date: '1 December 2021',
  end_date: (new Date()).toLocaleString()
}

const TransactionRecordPage = () => {
  const [state, _] = useReducer(reducer, TransactionIntialState);
  const {data: { transactions }} = useFetch(TRANSACTION_API, {
    start_date: state.start_date,
    end_date: state.end_date
  });

  return (
    <Box className="record-list-page">
      <Box classname='record-list-content-wrapper'>
        <Box className='option-menu-top' sx={{ display: 'flex', justifyContent: 'start', my: 4}}>
          <Button
            variant='contained'
          >
            Add Record
          </Button>
        </Box>
        {
          transactions
          ? <RecordList records={transactions}/>
          : <CircularProgress />
        }
      </Box>
    </Box>
  );
}

export default TransactionRecordPage;
