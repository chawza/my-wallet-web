import React, { useReducer, useEffect } from "react";
import { Container, Box, Typography, Table, CircularProgress } from "@mui/material";
import RecordList from "../../compontents/RecordList";
import useFetch from "../../utils/useFetch";
import { reducer } from "../../utils/Common";
import { TRANSACTION_API } from "../../constants/serviceUrls";

const TransactionIntialState = {
  start_date: '1 December 2021',
  end_date: (new Date).toLocaleString()
}

const TransactionRecordPage = () => {
  const [state, dispatch] = useReducer(reducer, TransactionIntialState)
  const {data: { transactions }} = useFetch(TRANSACTION_API, {
    start_date: state.start_date,
    end_date: state.end_date
  });

  return (
    <Box>
      <Typography variant='h5'>
        Transaction Record
      </Typography>
      {
        transactions
        ? <RecordList records={transactions}/>
        : <CircularProgress />
      }
    </Box>
  );
}

export default TransactionRecordPage;
