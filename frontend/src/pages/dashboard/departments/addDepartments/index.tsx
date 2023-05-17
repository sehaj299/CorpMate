// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box';

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Stack from '@mui/material/Stack';
import axios from 'axios'
interface AddDepartmentDialogProps {
 open: boolean;
 onClose: () => void;
  }
const DialogForm = () => {
  // ** State
   const [departmentName, setDepartmentName] = useState('');
  const [open, setOpen] = useState<boolean>(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleDepartmentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 setDepartmentName(event.target.value);
 };
 const handleSave = async () => {
 const jwt = localStorage.getItem('jwt')
  try { const addResponse = await axios.post(
  'http://localhost:1337/api/departments',
  { data: { name: departmentName } },
  { headers: { Authorization: `Bearer ${jwt}` } }
 );
 console.log(`Department name: ${departmentName}`);
 console.log(addResponse);
 handleClose();
  } catch (error) {
 console.error(error);
  }
 };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <h3>There are no departments</h3>
    <p>Click on the button below to add department</p>
    <Fragment >
      <Button variant='contained' onClick={handleClickOpen}>
        Add Department
      </Button>
      <Box display="flex" justifyContent="center" alignItems="center">
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add Department</DialogTitle>
        <DialogContent>
       <TextField  autoFocus  margin="dense"  label="Department Name"  fullWidth  value={departmentName}  onChange={handleDepartmentNameChange} />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
         <Stack spacing={2} direction="row" sx={{ p: 2 }}>
          <Button onClick={handleClose}>close</Button>
          <Button variant="contained" onClick={handleSave}>save</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
    </Fragment>
    </Box>
  )
}

export default DialogForm


