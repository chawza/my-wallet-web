import React, { useState } from 'react';
import { Modal, Button, TextField, Select, MenuItem, Box, Stack, Container, InputAdornment } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


const accountList = [
  {
    name: 'BCA Primary',
    id: 'account-1'
  }
];

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

const addRecordFormInitialValue = {
  account: accountList[0].id,
  amount: '',
  date: Date.now(),
  type: recordType.EXPENSESES.value
};

const AddRecordModal = ({visible = false, dispatch}) => {
  const [ formState, setFormState ] = useState(addRecordFormInitialValue);
  const closeModal = () => {
    dispatch({ type: 'showAddModal', payload: false })
    setFormState(addRecordFormInitialValue);
  };

  const formFieldOnChange = (field, event) => {
    setFormState({...formState, [field]: event.target.value});
  };

  const handleOnClickAdd = () => {
  }

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
        <Stack className='add-record-form-section' sx={{ gap: 2}}>
          <Select
            label='Account'
            onChange={(value) => formFieldOnChange('account', value)}
            value={formState.account}
          >
            {accountList.map(account => <MenuItem key={`account-option-${account.id}`} value={account.id}>{account.name}</MenuItem>)}
          </Select>
          <Select
            label='Type'
            onChange={(value) => formFieldOnChange('type', value)}
            value={formState.type}
          >
            {Object.keys(recordType).map(type => <MenuItem key={`record-type-option-${recordType[type].value}`} value={recordType[type].value}>{recordType[type].text}</MenuItem>)}
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
        </Stack>
        <Box className='form-action-section' sx={{ mt: 4}}>
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
      </Container>
    </Modal>
  )
}

export default AddRecordModal;
