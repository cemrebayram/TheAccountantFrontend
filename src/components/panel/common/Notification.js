import React,{useState}from 'react'
import {Alert,Snackbar} from '@mui/material'

export default function Notification(props) {
  const [alertData, setAlertData] = useState({
    open: props.open,
    severity: props.severity,
    message: props.message,
  });
  const handleClose = () => setAlertData({ ...alertData, open: false });
  return (
    <Snackbar
    open={alertData.open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <Alert
      onClose={handleClose}
      severity={alertData.severity}
      sx={{ width: "100%" }}
    >
      {alertData.message}
    </Alert>
  </Snackbar>
  )
}
