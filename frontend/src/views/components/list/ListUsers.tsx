import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import OptionsMenu from "src/@core/components/option-menu";
import Icon from "src/@core/components/icon";
import { Box, IconButton, Modal } from "@mui/material";
import axios from "axios";

interface Department {
  id: number;
  attributes: {
    name: string;
  };
}

interface Resource {
  id: number;
  name: string;
  // Add more properties as needed
}

const DepartmentLogo = styled(Box)(({ theme }) => ({
  width: 30,
  height: 30,
  margin: "1em",
  borderRadius: "50%",
  backgroundColor: "#9db2f2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1rem",
  color: "#ffffff",
  // border: `1px solid black`,
}));

// for testing purpose
const AssignDepartmentLogo = styled(Box)(({ theme }) => ({
  width: 30,
  height: 30,
  margin: "1em",
  borderRadius: "50%",
  backgroundColor: "#666cff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: "1rem",
  color: "white",
  // border: `1px solid black`,
}));

const DepartmentItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#ffffff",
  borderRadius: 20,
}));

const UserList = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.get<{ data: Department[] }>(
          "http://localhost:1337/api/departments",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = response.data.data;
        setDepartments(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDepartments();
  }, []);

  const handleOpenPopup = async () => {
    setOpenPopup(true);
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get<{ data: Resource[] }>(
        "http://localhost:1337/api/resources",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data);
      setResources(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  function getInitials(name: string): string {
    const words = name.trim().split(" ");
    let initials = "";
    if (words.length > 0) {
      initials += words[0].charAt(0).toUpperCase();
      if (words.length > 1) {
        initials += words[1].charAt(0).toUpperCase();
      }
    }
    return initials;
  }


  return (
    <>
      {departments.length > 0 ? (
        <List>
          {departments.map((department) => (
            <DepartmentItem key={department.id}>
              <DepartmentLogo>
              {getInitials(department.attributes.name)}
              </DepartmentLogo>
              <ListItemText
                primary={
                  <Typography variant="h6">
                    {department.attributes.name}
                  </Typography>
                }
              />
              <IconButton onClick={handleOpenPopup}>
                <AssignDepartmentLogo>{"+"}</AssignDepartmentLogo>
                <h6>Assign Resources</h6>
              </IconButton>
              <OptionsMenu
                options={[
                  "Edit Department",
                  {
                    text: "Delete Department",
                    menuItemProps: { sx: { color: "error.main" } },
                  },
                ]}
                iconButtonProps={{
                  size: "small",
                  className: "card-more-options",
                }}
              />
            </DepartmentItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2">No departments found</Typography>
      )}

      <Modal open={openPopup} onClose={handleClosePopup}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            padding: "2rem",
          }}
        >
          <Typography variant="h6">Resources</Typography>
          {resources.length > 0 ? (
            resources.map((resource) => (
              <Typography key={resource.id} variant="body1">
                {resource.attributes.name}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No resources found</Typography>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UserList;
