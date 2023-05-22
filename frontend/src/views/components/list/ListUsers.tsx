import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Modal,
  Grid,
} from "@mui/material";
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  AccountCircle,
} from "@mui/icons-material";
import axios from "axios";

interface Department {
  id: number;
  attributes: {
    name: string;
  };
}

const ListComponent: React.FC = ({ searchData }) => {
  const [openMenus, setOpenMenus] = useState<{
    [id: number]: HTMLElement | null;
  }>({});
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

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [id]: event.currentTarget,
    }));
  };

  const closeMenu = (id: number) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [id]: null,
    }));
  };

  const handleEdit = (id: number) => {
    closeMenu(id);
    alert(`Edit Department ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    closeMenu(id);
    alert(`Delete Department ID: ${id}`);
  };

  const filteredDepartments = departments.filter((department) =>
    (department.attributes.name ?? "")
      .toLowerCase()
      .includes(searchData?.toLowerCase() ?? "")
  );

  return (
    <>
      {searchData ? (
        <div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((department) => (
                <li
                  key={department.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "1em",
                        marginLeft: "1em",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#9db2f2",
                          color: "#fff",
                          width: 35,
                          height: 35,
                        }}
                      >
                        {department.attributes.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </Box>
                    <span>{department.attributes.name}</span>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={handleOpenPopup}>
                      <Avatar
                        sx={{
                          bgcolor: "#3f51b5",
                          color: "#fff",
                          marginRight: "1em",
                          width: 30,
                          height: 30,
                        }}
                      >
                        <Add />
                      </Avatar>
                      <Typography sx={{ fontSize: "0.9em" }}>
                        Assign Resources
                      </Typography>
                    </IconButton>
                    <IconButton
                      onClick={(event) => openMenu(event, department.id)}
                      size="small"
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={openMenus[department.id]}
                      open={Boolean(openMenus[department.id])}
                      onClose={() => closeMenu(department.id)}
                    >
                      <MenuItem onClick={() => handleEdit(department.id)}>
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography variant="body2">
                              Edit Department
                            </Typography>
                          }
                        />
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(department.id)}>
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography
                              variant="body2"
                              sx={{ fontSize: 14, color: "#ff0000" }}
                            >
                              Delete Department
                            </Typography>
                          }
                        />
                      </MenuItem>
                    </Menu>
                  </Box>
                </li>
              ))
            ) : (
              <Grid item>
                <Typography variant="body2">No departments found</Typography>
              </Grid>
            )}
          </ul>

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
                    {resource.attributes.name}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">No resources found</Typography>
              )}
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            {departments.map((department) => (
              <li
                key={department.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "1em",
                      marginLeft: "1em",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#9db2f2",
                        color: "#fff",
                        width: 35,
                        height: 35,
                      }}
                    >
                      {department.attributes.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>
                  <span>{department.attributes.name}</span>
                </Box>
                <Box>
                  <IconButton size="small" onClick={handleOpenPopup}>
                    <Avatar
                      sx={{
                        bgcolor: "#3f51b5",
                        color: "#fff",
                        marginRight: "1em",
                        width: 30,
                        height: 30,
                      }}
                    >
                      <Add />
                    </Avatar>
                    <Typography sx={{ fontSize: "0.9em" }}>
                      Assign Resources
                    </Typography>
                  </IconButton>
                  <IconButton
                    onClick={(event) => openMenu(event, department.id)}
                    size="small"
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={openMenus[department.id]}
                    open={Boolean(openMenus[department.id])}
                    onClose={() => closeMenu(department.id)}
                  >
                    <MenuItem onClick={() => handleEdit(department.id)}>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="body2">
                            Edit Department
                          </Typography>
                        }
                      />
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(department.id)}>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography
                            variant="body2"
                            sx={{ fontSize: 14, color: "#ff0000" }}
                          >
                            Delete Department
                          </Typography>
                        }
                      />
                    </MenuItem>
                  </Menu>
                </Box>
              </li>
            ))}
          </ul>

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
                    {resource.attributes.name}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">No resources found</Typography>
              )}
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ListComponent;
