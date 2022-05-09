import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import  Paper  from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'USD',
    label: 'aaaaaa',
  },
  {
    value: 'EUR',
    label: 'sssssss',
  },
  {
    value: 'BTC',
    label: 'dddddd',
  },
  {
    value: 'JPY',
    label: 'fffffff',
  },
];

export default function AddRecord() {
  const [currency, setCurrency] = React.useState('EUR');
 
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    
    <Container maxWidth="lg"  sx={{py:2}} >
      <Paper elevation={1} sx={{p:2}}>

      
     
                <Typography my={3} variant="h3" component="h2" color="primary">
                      ADD NEW RECORD
                </Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '55ch', },
                }}
                noValidate
                autoComplete="off"
              >
                <div>

                  <TextField
                  required
                    id="outlined-text-input"
                    label="First Name"
                    type="text"
                    autoComplete="first-name"
                    
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    type="text"
                    autoComplete="Last Name"
                  />
                  <TextField
                    required
                    id="outlined-required-email"
                    label="Email"
                    type="email"
                    autoComplete="Email"
                  />
                 
                
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  
                
                  <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  
                  <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      value={currency}
                      onChange={handleChange}
                      helperText="Please select your currency"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id="date"
                      label="Birthday"
                      type="date"
                      defaultValue="2017-05-24"
                      sx={{ width: 220 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </div>
                <Button sx={{ m: 1 }}  variant="contained" endIcon={<SendIcon />} size="large">
                  Submit
                </Button>
                
              </Box>
              </Paper>
    </Container>

  );
}