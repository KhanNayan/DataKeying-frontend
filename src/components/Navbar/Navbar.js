import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

export default function Navbar() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
         
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            GHIT
          </Typography>
      
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tabs textColor="warning" value={value} onChange={handleChange} aria-label="nav tabs example">
                        <LinkTab  label="Page One" href="/drafts" />
                        <LinkTab  label="Page Two" href="/trash" />
                        <LinkTab  label="Page Three" href="/spam" />
                    </Tabs>
          </Box>
        
        </Toolbar>
      </AppBar>
     
    </Box>
  );
}
