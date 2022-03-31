import React, { useState } from "react";
import ContractNoteInputForm from "../../components/panel/contractNote/ContractNoteInputForm";
import { Button, Container, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  createContractNote,
  fetchContractNotes,
} from "../../store/slices/contractNoteSlice";
import ContractNotesTable from "../../components/panel/contractNote/ContractNotesTable";
import Notification from "../../components/panel/common/Notification";
export default function Offser() {
  const newContractNote = useSelector(
    (state) => state.contractNote.newContractNote
  );
  const contractNotes = useSelector(
    (state) => state.contractNote.contractNotes
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchContractNotes());
  }, []);
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const showAlert = (message, severity) => {
    setAlertData({
      severity,
      open: true,
      message,
    });
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "5em",
        paddingBottom: "5em",
      }}
    >
      <Notification
        open={alertData.open}
        severity={alertData.severity}
        message={alertData.message}
      />
      <Divider sx={{ margin: "30px 0" }}>
        <img width="50px" src="/../../contractNote.png"></img>
      </Divider>
      <Typography variant="h6">Create contract note</Typography>
      <ContractNoteInputForm />
      <Button
        onClick={async () => {
          await dispatch(createContractNote(newContractNote));
          dispatch(fetchContractNotes());
          showAlert("Offer created successfully", "success");
        }}
        sx={{ marginTop: "10px" }}
        fullWidth
        variant="contained"
        color="warning"
      >
        Create ContractNote
      </Button>
      <ContractNotesTable contractNotes={contractNotes} />
    </Container>
  );
}
