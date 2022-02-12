import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Select, MenuItem, Box, Stack, Container, InputAdornment, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { createNewRecord } from '../services/appService';
import { recordCategories } from '../constants/recordConstants';

const recordType = {
  EXPENSESES: {
    value: 'EXPENSESES',
    text: 'Expenses'
  },
  INCOME: {
    value: 'INCOME',
    text: 'Income'
  },
  TRANSFERS: {
    value: 'TRANSFERS',
    text: 'Transfers'
  }
}

const AddRecordModal = ({visible = false, dispatch, accounts}) => {
  const addRecordFormInitialValue = {
    account: '',
    amount: '',
    date: Date.now(),
    type: recordType.EXPENSESES.value,
    note: '',
    category: recordCategories[0].text
  };
  const [ formState, setFormState ] = useState(addRecordFormInitialValue);
  const [ showToast, setToast ] = useState(false);

  const closeModal = () => {
    dispatch({ type: 'showAddModal', payload: false })
    setFormState(addRecordFormInitialValue);
  };

  const formFieldOnChange = (field, event) => {
    setFormState({...formState, [field]: event.target.value});
  };

  const handleOnClickAdd = async () => {
    try {
      const newDate = new Date(formState.date);
      const payload = { ...formState, date: newDate.toISOString()}
      await createNewRecord(payload);
      setToast(true);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    if (accounts && formState.account === '') {
      setFormState({...formState, account: accounts[0].id})
    }
  }, [accounts])

  return (
    <Modal
      open={visible}
      onClose={closeModal}
    >
      <Container
        className='add-modal-container'
        maxWidth='sm'
        sx={{
          backgroundColor: 'white',
          mt: 10,
          padding: 4
        }}
      >
        <Box className='form-action-top-section' sx={{mb: 4}}>
          <Typography variant='h5'>
            ADD RECORD
          </Typography>
        </Box>
        <Stack className='add-record-form-section' sx={{ gap: 2}}>
          <Select
            label='Account'
            onChange={(value) => formFieldOnChange('account', value)}
            value={formState.account}
          >
            {accounts?.map(account => <MenuItem key={`account-option-${account.id}`} value={account.id}>{account.name}</MenuItem>)}
          </Select>
          <Select
            label='Type'
            onChange={(value) => formFieldOnChange('type', value)}
            value={formState.type}
          >
            {Object.keys(recordType).map(type => <MenuItem key={`record-type-option-${recordType[type].value}`} value={recordType[type].value}>{recordType[type].text}</MenuItem>)}
          </Select>
          <Select
            label='Category'
            onChange={(value) => formFieldOnChange('category', value)}
            value={formState.category}
          >
            {recordCategories.map(record => <MenuItem key={`record-type-option-${record.text}`} value={record.text}>{record.text}</MenuItem>)}
          </Select>
          <TextField
            label='Amount'
            type='number'
            onChange={value => formFieldOnChange('amount', value)}
            value={formState.amount}
            InputProps={{
              startAdornment: <InputAdornment position="start">Rp</InputAdornment>
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={formState.date}
              onChange={(value) => setFormState({...formState, date: value})}
              renderInput={(params => <TextField {...params}/>)}
            />
          </LocalizationProvider>
          <TextField
            label='Note'
            type='text'
            value={formState.note}
            onChange={value => formFieldOnChange('note', value)}
          />
        </Stack>
        <Box className='form-action-bottom-section' sx={{ mt: 4}}>
          <Button
            variant='contained'
            onClick={handleOnClickAdd}
          >
            Add Record 
          </Button>
          <Button
            variant='text'
            onClick={closeModal}
          >
            Cancel
          </Button>
        </Box>
        <Snackbar
          className='add-record-toast'
          open={showToast}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          autoHideDuration={2000}
          onClose={() => setToast(false)}
        >
          <Alert severity='success'>Record Added</Alert>
        </Snackbar>
      </Container>
    </Modal>
  )
}

export default AddRecordModal;
