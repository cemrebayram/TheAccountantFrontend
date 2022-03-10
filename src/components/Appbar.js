import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { clearUser } from '../store/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {DashboardCustomizeRounded, Person} from '@mui/icons-material';



export default function ButtonAppBar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 1}}
          />
          < IconButton to="/" component={Link}><DashboardCustomizeRounded style={{color: "black"}}></DashboardCustomizeRounded></IconButton>
          <Typography variant="h6" className='logo-text' color="black"  sx={{ flexGrow: 1 } }>
            the.accountant
          </Typography>
          {
            !user.token ? <><Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/register" color="inherit">Register</Button></> :<> <IconButton onClick={
              ()=>{
                navigate('/panel/profile')
              }
            } ><Person/></IconButton>  | <Button onClick={()=>{
              dispatch(clearUser());
            }} color="inherit">Logout</Button></>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );

}
