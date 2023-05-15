// ** React Imports
import * as React from "react";
import { SyntheticEvent, useState, useCallback } from "react";

// ** MUI Imports
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Button from "@mui/material/Button";

// ** Icon Imports
import TableHeader from "src/views/apps/user/list/TableHeader";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import axios from "axios";
interface AddDepartmentDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddDepartmentDialog: React.FC<AddDepartmentDialogProps> = ({
  open,
  onClose,
}) => {
  const [departmentName, setDepartmentName] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleDepartmentNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartmentName(event.target.value);
  };

  const handleSave = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const addResponse = await axios.post(
        "http://localhost:1337/api/departments",
        { data: { name: departmentName } },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      console.log(`Department name: ${departmentName}`);
      console.log(addResponse);
      alert("Department saved successfully");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Department</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Department Name"
          fullWidth
          value={departmentName}
          onChange={handleDepartmentNameChange}
        />
        {errorMessage && <Box sx={{ color: "red" }}>{errorMessage} </Box>}
      </DialogContent>
      <Stack spacing={2} direction="row" sx={{ p: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Dialog>
  );
};

const TabsForcedScroll = () => {
  // ** State
  const [value, setValue] = useState<string>("");
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const [isAddDepartmentDialogOpen, setIsAddDepartmentDialogOpen] =
    React.useState(false);
  const handleAddDepartmentClick = () => {
    setIsAddDepartmentDialogOpen(true);
  };
  const handleCloseAddDepartmentDialog = () => {
    setIsAddDepartmentDialogOpen(false);
  };
  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const toggleAddUserDrawer = () =>
    setIsAddDepartmentDialogOpen(!isAddDepartmentDialogOpen);

  return (
    <TabContext value={value}>
      <TableHeader
        value={value}
        handleFilter={handleFilter}
        toggle={toggleAddUserDrawer}
      />
      <AddDepartmentDialog
        open={isAddDepartmentDialogOpen}
        onClose={handleCloseAddDepartmentDialog}
      />
    </TabContext>
  );
};
export default TabsForcedScroll;
