import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import OptionsMenu from "src/@core/components/option-menu";
import Icon from "src/@core/components/icon";
import { IconButton, Modal, styled } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { shadows } from "@mui/system";

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

const UserCard = () => {
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
  const AssignDepartmentLogo = styled(Box)(({ theme }) => ({
    width: 40,
    height: 40,
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
    <Box
      sx={{
        display: "flex",
        alignItems: "inherit",
        justifyContent: "space-between",
      }}
    >
      <Grid
        container
        spacing={8}
        direction="row"
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        {departments.length > 0 ? (
          departments.map((department) => (
            <Grid item key={department.id} xs={12} sm={6} md={4}>
              <Card sx={{ position: "relative", margin: "1rem", width: 300 }}>
                <Box
                  sx={{
                    height: 65,
                    bgcolor: "#f3f4ff",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <OptionsMenu
                    options={[
                      "Edit Department",
                      {
                        text: "Delete Department",
                        menuItemProps: { sx: { color: "error.main" } },
                      },
                    ]}
                    iconButtonProps={{
                      sx: {
                        margin: "14",

                        color: "#a4a6b6", // Replace with your desired hexagon color
                      },
                      size: "small",
                      className: "card-more-options",
                    }}
                  />
                  {department.attributes.name && (
                    <Box
                      sx={{
                        backgroundColor: "#9db2f2",

                        color: "#ffffff",
                        top: 40,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 50,
                        height: 50,
                        position: "absolute",
                        borderRadius: "50%",
                        // fontSize: 12,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1rem",
                        borderTop: 1,
                        boxShadow: "inset 0px 0px 0px 3px",
                      }}
                    >
                      {getInitials(department.attributes.name)}
                    </Box>
                  )}
                </Box>
                <CardContent>
                  <Box
                    sx={{
                      mt: 5.75,
                      mb: 5.25,

                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h5">
                        {department.attributes.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      gap: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton onClick={handleOpenPopup}>
                      <AssignDepartmentLogo>{"+"}</AssignDepartmentLogo>
                    </IconButton>
                    <Typography variant="h6">Assign Resources</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item>
            <Typography variant="body2">No departments found</Typography>
          </Grid>
        )}
      </Grid>
      <Modal open={openPopup} onClose={handleClosePopup}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Resources</Typography>
          {resources.length > 0 ? (
            resources.map((resource) => (
              <Typography key={resource.id} variant="body1">
                {resource.name}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No resources found</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default UserCard;
