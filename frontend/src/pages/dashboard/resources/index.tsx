import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import axios from "axios";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get("http://localhost:1337/api/resources", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = response.data.data;
      setUserList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    if (searchText.length > 0) {
      return userList.filter((user) => {
        const firstNameMatch = user.attributes.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        const emailMatch = user.attributes.email
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        return firstNameMatch || emailMatch;
      });
    } else {
      return userList;
    }
  }, [userList, searchText]);

  const renderUserAvatar = (user) => {
    const initials =
      user.attributes.name && user.attributes.name.length > 0
        ? user.attributes.name.charAt(0).toUpperCase()
        : "--";
    return (
      <div>{initials}</div>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "profile",
      headerName: "Profile",
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Box>{renderUserAvatar(row)}</Box>
      ),
    },
    {
      field: "UserName",
      headerName: "User Name",
      flex: 1,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
            {row.attributes.name}
          </Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography variant="body2">{row.attributes.email}</Typography>
      ),
    },
  ];

  return (
    <Card>
      <Box sx={{ p: 5, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ p: 0, whiteSpace: "nowrap" }}>
          User List
        </Typography>
      </Box>
      <Box sx={{ p: 5, pt: 0, display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ maxWidth: "100%", width: "100%" }}
          label="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Box>
      <DataGrid
        autoHeight
        rows={filteredUsers}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </Card>
  );
};

export default UserTable;
