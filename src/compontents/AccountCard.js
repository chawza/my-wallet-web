import React from "react";
import { Box, Typography } from '@mui/material'

const AccountCard = ({ id, name }) => {

  return (
    <Box
      className="account-card-wrapper"
      // sx={{
      //   // display: 'flex',
      //   // maxWidth: '25%'
      // }}
      // key={id}
    >
      <Typography>{name}</Typography>
    </Box>
  );
};

export default AccountCard;