import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import OptionsMenu from "src/@core/components/option-menu";
import Icon from "src/@core/components/icon";
import { IconButton, Modal } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid";

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

interface UserCardProps {
  searchData: string; // Assuming searchData is of type string
}

const UserCard: React.FC<UserCardProps> = ({ searchData }) => {
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

  // Filter departments based on searchData
  const filteredDepartments = departments.filter((department) =>
    (department.attributes.name ?? "")
      .toLowerCase()
      .includes(searchData.toLowerCase())
  );

  return (
    <>
      {searchData ? (
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
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((department) => (
                <Grid item key={department.id} xs={12} sm={6} md={4}>
                  <Card sx={{ position: "relative", marginBottom: "1rem" }}>
                    <Box
                      sx={{
                        height: 65,
                        bgcolor: "#66b8ff",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <OptionsMenu
                        options={["Edit Department", "Delete Department"]}
                        iconButtonProps={{
                          size: "small",
                          className: "card-more-options",
                        }}
                      />
                      {department.attributes.name && (
                        <Box
                          sx={{
                            top: 40,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 50,
                            height: 50,
                            position: "absolute",
                            borderRadius: "50%",
                            bgcolor: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "2rem",
                            border: 1,
                          }}
                        >
                          {department.attributes.name.charAt(0).toUpperCase()}
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
                          <Icon
                            icon="solar:add-circle-linear"
                            fontSize="2rem"
                          />
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
        </Box>
      ) : (
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
                  <Card sx={{ position: "relative", marginBottom: "1rem" }}>
                    <Box
                      sx={{
                        height: 65,
                        bgcolor: "#66b8ff",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <OptionsMenu
                        options={["Edit Department", "Delete Department"]}
                        iconButtonProps={{
                          size: "small",
                          className: "card-more-options",
                        }}
                      />
                      {department.attributes.name && (
                        <Box
                          sx={{
                            top: 40,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 50,
                            height: 50,
                            position: "absolute",
                            borderRadius: "50%",
                            bgcolor: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "2rem",
                            border: 1,
                          }}
                        >
                          {department.attributes.name.charAt(0).toUpperCase()}
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
                          <Icon
                            icon="solar:add-circle-linear"
                            fontSize="2rem"
                          />
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
      )}
    </>
  );
};

export default UserCard;
