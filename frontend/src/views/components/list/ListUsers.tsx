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

const ListUsers = ({ searchData }) => {
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
      });
  };

  const filteredDepartments = department.filter((data) =>
    (data.attributes.name ?? "").toLowerCase().includes(searchData?.toLowerCase() ?? '')
  );

  return <>{searchData ? <h1>Hello</h1> : <h1>Hii</h1>}</>;
};

export default ListUsers;
