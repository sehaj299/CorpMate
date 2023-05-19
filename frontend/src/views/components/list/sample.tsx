// ** MUI Imports
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import List, { ListProps } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

// ** Icon Imports
import Icon from "src/@core/components/icon";
import { useEffect, useState } from "react";
import axios from "axios";

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  "& .MuiListItem-container": {
    border: `2px solid ${theme.palette.divider}`,
    "&:first-of-type": {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    "&:last-child": {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "& .MuiListItem-root": {
      paddingRight: theme.spacing(24),
      marginBottom: theme.spacing(1),
    },
    "& .MuiListItemText-root": {
      marginTop: 0,
      "& .MuiTypography-root": {
        fontWeight: 500,
      },
    },
  },
}));

const ListUsers = () => {
  const [showActions, setShowActions] = useState(false);
  const [department, setDepartment] = useState([]);
  const handleToggleActions = () => {
    setShowActions(!showActions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const jwt = localStorage.getItem("jwt");
    await axios
      .get("http://localhost:1337/api/departments", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setDepartment(response.data.data);
        console.log(response.data.data);
      });
  };
  return (
    <>
      <StyledList>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/images/avatars/2.png" alt="Caroline Black" />
          </ListItemAvatar>
          <div>
            <ListItemText primary="HR and Administration" />
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Box
                sx={{
                  mr: 3,
                  display: "flex",
                  alignItems: "center",
                  "& svg": { mr: 1, color: "success.main" },
                }}
              >
                <Icon icon="mdi:circle" fontSize="0.625rem" />
                <Typography variant="caption">Online</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                13 minutes ago
              </Typography>
            </Box>
          </div>
          <ListItemSecondaryAction>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={handleToggleActions}
            >
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              {showActions && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "#ffffff",
                    border: "1px solid #dddddd",
                    borderRadius: "5px",
                    width: "150px",
                    padding: "10px",
                    boxShadow: "0px 2px 4px #ffffff",
                    zIndex: 1,
                    marginTop: "16px",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                  >
                    Edit Department
                  </Box>
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                  >
                    Assign Resource
                  </Box>
                  <Box
                    sx={{ fontSize: "14px", color: "red", cursor: "pointer" }}
                  >
                    Delete Department
                  </Box>
                </Box>
              )}
            </Box>
          </ListItemSecondaryAction>
        </ListItem>
      </StyledList>
      <StyledList>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/images/avatars/1.png" alt="Alfred Copeland" />
          </ListItemAvatar>
          <div>
            <ListItemText primary="Software Development" />
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Box
                sx={{
                  mr: 3,
                  display: "flex",
                  alignItems: "center",
                  "& svg": { mr: 1, color: "warning.main" },
                }}
              >
                <Icon icon="mdi:circle" fontSize="0.625rem" />
                <Typography variant="caption">Away</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                11 minutes ago
              </Typography>
            </Box>
          </div>
          <ListItemSecondaryAction>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={handleToggleActions}
            >
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              {showActions && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "#ffffff",
                    border: "1px solid #dddddd",
                    borderRadius: "5px",
                    width: "150px",
                    padding: "10px",
                    boxShadow: "0px 2px 4px #ffffff",
                    zIndex: 1,
                    marginTop: "16px",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                  >
                    Edit Department
                  </Box>
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                  >
                    Assign Resource
                  </Box>
                  <Box
                    sx={{ fontSize: "14px", color: "red", cursor: "pointer" }}
                  >
                    Delete Department
                  </Box>
                </Box>
              )}
            </Box>
          </ListItemSecondaryAction>
        </ListItem>
      </StyledList>
      <StyledList>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/images/avatars/8.png" alt="Celia Schneider" />
          </ListItemAvatar>
          <div>
            <ListItemText primary="Data Analyst" />
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Box
                sx={{
                  mr: 3,
                  display: "flex",
                  alignItems: "center",
                  "& svg": { mr: 1, color: "secondary.main" },
                }}
              >
                <Icon icon="mdi:circle" fontSize="0.625rem" />
                <Typography variant="caption">Offline</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                9 minutes ago
              </Typography>
            </Box>
          </div>

          <ListItemSecondaryAction>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={handleToggleActions}
            >
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              {showActions && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "#ffffff",
                    border: "1px solid #dddddd",
                    borderRadius: "5px",
                    width: "150px",
                    padding: "10px",
                    boxShadow: "0px 2px 4px #ffffff",
                    zIndex: 1,
                    marginTop: "16px",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                  >
                    Edit Department
                  </Box>
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                  >
                    Assign Resource
                  </Box>
                  <Box
                    sx={{ fontSize: "14px", color: "red", cursor: "pointer" }}
                  >
                    Delete Department
                  </Box>
                </Box>
              )}
            </Box>
          </ListItemSecondaryAction>
        </ListItem>
      </StyledList>
      <StyledList>
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/images/avatars/5.png" alt="Celia Schneider" />
          </ListItemAvatar>
          <div>
            <ListItemText primary="Software Design" />
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Box
                sx={{
                  mr: 3,
                  display: "flex",
                  alignItems: "center",
                  "& svg": { mr: 1, color: "error.main" },
                }}
              >
                <Icon icon="mdi:circle" fontSize="0.625rem" />
                <Typography variant="caption">In Meeting</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                28 minutes ago
              </Typography>
            </Box>
          </div>

          <ListItemSecondaryAction>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={handleToggleActions}
            >
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#333333",
                  borderRadius: "50%",
                  marginBottom: "4px",
                }}
              />
              {showActions && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "#ffffff",
                    border: "1px solid #dddddd",
                    borderRadius: "5px",
                    width: "150px",
                    padding: "10px",
                    boxShadow: "0px 2px 4px #ffffff",
                    zIndex: 1,
                    marginTop: "16px",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                  >
                    Edit Department
                  </Box>
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                  >
                    Assign Resource
                  </Box>
                  <Box
                    sx={{ fontSize: "14px", color: "red", cursor: "pointer" }}
                  >
                    Delete Department
                  </Box>
                </Box>
              )}
            </Box>
          </ListItemSecondaryAction>
        </ListItem>
      </StyledList>
    </>
  );
};

export default ListUsers;
