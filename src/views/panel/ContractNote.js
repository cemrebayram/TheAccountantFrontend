import React from 'react'
import ContractNoteInputForm from '../../components/panel/contractNote/ContractNoteInputForm'
import { Button, Container, Typography, Divider } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import { createContractNote, fetchContractNotes } from '../../store/slices/contractNoteSlice'
import ContractNotesTable from '../../components/panel/contractNote/ContractNotesTable'
export default function Offser() {
    const newContractNote = useSelector(state => state.contractNote.newContractNote)
    const contractNotes = useSelector(state => state.contractNote.contractNotes)
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchContractNotes());
    }, [])
    return (
        <Container  sx={{
            marginTop: '10rem',
        }}>
            <Divider sx={{ margin: "30px 0"}}>
            <img width="50px" src="/../../contractNote.png"></img>
            </Divider>  
            <Typography variant="h6">Create contract note</Typography>
            <ContractNoteInputForm/>
            <br/>
            <br/>
            <Button onClick={()=>{
                dispatch(createContractNote(newContractNote));
                dispatch(fetchContractNotes());
            }} sx={{marginTop:'10px'}} fullWidth variant="contained" color="warning">Create ContractNote</Button>
            <ContractNotesTable contractNotes={contractNotes} />
        </Container>
    )
}
