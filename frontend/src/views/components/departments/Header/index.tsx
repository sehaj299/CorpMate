import * as React from "react";
import { useState, useCallback } from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Button from "@mui/material/Button";
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
  const [departmentName, setDepartmentName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      window.location.reload();
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

interface HeaderProps {
  displayChange: (childState: any) => void;
  searchData: (childState: any) => void;
}

const Header: React.FC<HeaderProps> = ({ displayChange, searchData }) => {
  const [value, setValue] = useState<string>("");
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const [isAddDepartmentDialogOpen, setIsAddDepartmentDialogOpen] =
    useState(false);

  const handleAddDepartmentClick = () => {
    setIsAddDepartmentDialogOpen(true);
  };

  const handleCloseAddDepartmentDialog = () => {
    setIsAddDepartmentDialogOpen(false);
  };

  const handleFilter = useCallback((val: string) => {
    searchData(val)
  }, []);

  const handleViewChange = (childState: any) => {
    displayChange(childState);
  };

  const toggleAddUserDrawer = () =>
    setIsAddDepartmentDialogOpen(!isAddDepartmentDialogOpen);

  return (
    <TabContext value={value}>
      <TableHeader
        value={value}
        handleFilter={handleFilter}
        toggle={toggleAddUserDrawer}
        handleViewChange={handleViewChange}
      />
      <AddDepartmentDialog
        open={isAddDepartmentDialogOpen}
        onClose={handleCloseAddDepartmentDialog}
      />
    </TabContext>
  );
};

export default Header;
