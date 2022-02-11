import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { datetimeToDayMonth } from '../utils/Common';

const isoDateToDateString = (isoDateTime) => {
  return (new Date(isoDateTime)).toLocaleDateString()
}

const RecordRow = ({ amount, category, account, note }) => {
  return (
    <Paper
      className='record-row'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        py: 1.5,
        px: 2
      }}      
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row'}}>
        <Typography>
          {category}
        </Typography>
        <Typography>
          {account}
        </Typography>
        <Typography>
          {note}
        </Typography>
      </Box>
      <Typography>
        {amount}
      </Typography>
    </Paper>
  )
}

const RecordGroupByDay = ({ records }) => {
  let groupDate = new Date(records[0].date);
  groupDate = datetimeToDayMonth(groupDate);

  return (
    <Box
      className='record-group-row'
      sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}
    >
      <Typography sx={{mx: 2}}>
        {groupDate}
      </Typography>
      <Box
        className='record-group-content-wrapper'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 1
        }}
      >
        {
          records.map(record => <RecordRow key={record.id} {...record}/>)
        }
      </Box>
    </Box>
  )
}

const RecordList = ({ records }) => {
  const groupReducer = (group, record) => {
    const recordDate = isoDateToDateString(record.date);
    group[recordDate] = group[recordDate] ?? [];
    group[recordDate].push(record);
    return group;
  }
  const groupedRecords = records.reduce(groupReducer, {})

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
      {
        Object.keys(groupedRecords).map(key => <RecordGroupByDay key={key} records={groupedRecords[key]}/>)
      }
    </Box>
  )
}

export default RecordList;