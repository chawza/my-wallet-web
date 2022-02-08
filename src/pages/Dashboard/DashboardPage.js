import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useFetch from '../../utils/useFetch';
import AccountCard from "../../compontents/AccountCard";
import { ACCOUNT_API } from "../../constants/serviceUrls";

const DashboardPage = () => {
  const { data: { accounts } } = useFetch(ACCOUNT_API);

  return (
    <Box className='dashboard-content-area'>
      <Link to='/transaction-record'>
        <Typography variant='h6'>
          Transaction Record
        </Typography>
      </Link>
      <Box
        className="account-list-wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {
          accounts
          ? accounts.map((account) => <AccountCard key={account.id} {...account} />)
          : "No Account Attached"
        }
      </Box>
    </Box>
  )
}

export default DashboardPage;
