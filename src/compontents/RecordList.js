import React from 'react';
import { Typography, Box } from '@mui/material';
import { datetimeToDayMonth } from '../utils/Common';

const isoDateToDateString = (isoDateTime) => {
  return (new Date(isoDateTime)).toLocaleDateString()
}

const RecordRow = ({ amount, category, account, note }) => {
  return (
    <Box
      className='record-row'
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Typography>
        {category}
      </Typography>
      <Typography>
        {account}
      </Typography>
      <Typography>
        {note}
      </Typography>
      <Typography style={{flexGrow: 2}}>
        {amount}
      </Typography>
    </Box>
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
      <Typography>
        {groupDate}
      </Typography>
      {
        records.map(record => <RecordRow {...record}/>)
      }
    </Box>
  )
}

const RecordList = ({ records }) => {
  if (!records) {
    return <></>
  }

  const groupReducer = (group, record) => {
    const recordDate = isoDateToDateString(record.date);
    group[recordDate] = group[recordDate] ?? [];
    group[recordDate].push(record);
    return group;
  }
  const groupedRecords = records.reduce(groupReducer, {})

  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      {
        Object.keys(groupedRecords).map(key => <RecordGroupByDay key={key} records={groupedRecords[key]}/>)
      }
    </Box>
  )
}

export default RecordList;