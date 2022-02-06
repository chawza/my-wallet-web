import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <Container maxWidth='md'>
      <Box className='dashboard-content-area'>
        <Link to='/transaction-record'>
          <Typography variant='h6'>
            Transaction Record
          </Typography>
        </Link>
      </Box>
    </Container>
  )
}

export default DashboardPage;
