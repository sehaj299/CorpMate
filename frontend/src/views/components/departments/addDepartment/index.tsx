import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Typography from "@mui/material/Typography";

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
      <DialogTitle
        sx={{
          bgcolor: "#666cff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#fff", flexGrow: 1 }}
        >
          Add Department
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ color: "#fff" }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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

export default function AddDepartment() {
  const [isAddDepartmentDialogOpen, setIsAddDepartmentDialogOpen] =
    React.useState(false);

  const handleAddDepartmentClick = () => {
    setIsAddDepartmentDialogOpen(true);
  };

  const handleCloseAddDepartmentDialog = () => {
    setIsAddDepartmentDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20%",
      }}
    >
      <Box sx={{ mb: 10, textAlign: "center" }}>
        <Typography
          variant="h5"
          sx={{ mb: 2.5, fontSize: "1.5rem !important" }}
        >
          There are no departments 🏬
        </Typography>
        <Typography variant="body2">
          Click on the button below to add a new department.
        </Typography>
      </Box>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleAddDepartmentClick}>
          Add Department
        </Button>
      </Stack>
      <AddDepartmentDialog
        open={isAddDepartmentDialogOpen}
        onClose={handleCloseAddDepartmentDialog}
      />
    </Box>
  );
}
