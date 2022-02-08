import React, { useReducer } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import RecordList from "../../compontents/RecordList";
import useFetch from "../../utils/useFetch";
import { reducer } from "../../utils/Common";
import { TRANSACTION_API } from "../../constants/serviceUrls";

const TransactionIntialState = {
  start_date: '1 December 2021',
  end_date: (new Date).toLocaleString()
}

const TransactionRecordPage = () => {
  const [state, _] = useReducer(reducer, TransactionIntialState)
  const {data: { transactions }} = useFetch(TRANSACTION_API, {
    start_date: state.start_date,
    end_date: state.end_date
  });

  return (
    <Box sx={{paddingTop: 6}}>
      {
        transactions
        ? <RecordList records={transactions}/>
        : <CircularProgress />
      }
    </Box>
  );
}

export default TransactionRecordPage;
