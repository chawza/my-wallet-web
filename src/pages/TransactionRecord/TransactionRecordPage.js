import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Table } from "@mui/material";
import RecordList from "../../compontents/RecordList";
import dummyData from './dummpyTrans.json';

const TransactionRecordPage = () => {
  const [transactionsRecord, setTransactionRecord ] = useState([]);
  
  useEffect(() => {
    setTransactionRecord(dummyData.transactions)
  }, [])

  return (
    <Container maxWidth='md'>
      <Box>
        <Typography variant='h5'>
          Transaction Record
        </Typography>
        <RecordList records={transactionsRecord}/>
      </Box>
    </Container>
  );
}

export default TransactionRecordPage;
