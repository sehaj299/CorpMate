// ** React Import
import { ReactElement, useMemo, useState , useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import axios from "axios";
// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";
import { Button } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Link from "next/link";
import ActionsDropdown from "src/views/components/dropdowns/actionsDropdown";
// import supaBase from "libs/supabase";

interface TableBodyRowType {
  id: number;
  attributes: {
    name: string;
    email: string
  }
//   name: string
//   email: string;
//   avatarSrc?: string;
//  phone?: string;
//   status: "Active" | "Pending" | "Deactive";
//   role?: string;
//   profile_image_url?: string;
}

interface CellType {
  row: TableBodyRowType;
}

interface RoleObj {
  [key: string]: {
    icon: ReactElement;
  };
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor;
  };
}



const statusObj: StatusObj = {
  Active: { color: "success" },
  Pending: { color: "warning" },
  Deactive: { color: "secondary" },
};
const UserTable = ({ users }: any) => {
  const [userList, setUserList] = useState(users);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState<TableBodyRowType[]>([]);

  useEffect(() => {
    async function fetchRows() {
      try {
        const jwt = localStorage.getItem('jwt');
        const response = await axios.get("http://localhost:1337/api/resources", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = response.data.data;
        setRows(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRows();    
  }, []);

  const tableData = useMemo(() => {
    if (searchText.length > 0) {
      return userList.filter((row: any) => {
        const firstNameMatch = row.first_name
          ?.toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
        const lastNameMatch = row.last_name
          ?.toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
        const emailMatch = row.email
          ?.toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
        return firstNameMatch || lastNameMatch || emailMatch;
      });
    } else {
      return userList;
    }
  }, [users, userList, searchText]);
  const renderUserAvatar = (row: TableBodyRowType) => {
    let initials = null;
    if (row.attributes.name) {
      if (row.attributes.name.length >= 1) {
        const firstInitial = row.attributes.name.split("");
        initials = firstInitial[0].toUpperCase()
      }
    }
    // const filepath = row.profile_image_url;
    // const { data: userImage } = supaBase.storage
    //   .from("profile-images")
    //   .getPublicUrl(`${filepath}`);
    // if (row.profile_image_url) {
    //   return (
    //     <CustomAvatar
    //       src={userImage.publicUrl}
    //       sx={{ mr: 3, width: 34, height: 34 }}
    //     />
    //   );
    // } else {
    return (
      <CustomAvatar
        skin="filled"
        sx={{ mr: 3, width: 34, height: 34, fontSize: ".8rem" }}
      >
        {initials != null ? initials : "--"}
      </CustomAvatar>
    );
    // }
  };
  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        flex: 0.05,
        field: "profile",
        minWidth: 100,
        headerName: "profile",
        sortable: false,
        filterable: false,
        renderCell: ({ row }: CellType) => {
          return <Box> {renderUserAvatar(row)}</Box>;
        },
      },
      {
        flex: 0.15,
        field: "UserName",
        minWidth: 200,
        headerName: "UserName",
        renderCell: ({ row }: CellType) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {row.attributes.name? row.attributes.name: null}
              </Typography>
            </Box>
          );
        },
      },
      {
        flex: 0.25,
        minWidth: 250,
        field: "email",
        headerName: "Email",
        renderCell: ({ row }: CellType) => (
          <Typography variant="body2">{row.attributes.email}</Typography>
        ),
      },
      // {
      //   flex: 0.3,
      //   minWidth: 130,
      //   field: "role",
      //   headerName: "role",
      //   renderCell: ({ row }: CellType) => (
      //     <Box sx={{ display: "flex", alignItems: "center" }}>
      //       <Typography
      //         sx={{ color: "text.secondary", textTransform: "capitalize" }}
      //       >
      //         {row.role ? row.role : null}
      //       </Typography>
      //     </Box>
      //   ),
      // },
      // {
      //   flex: 0.1,
      //   minWidth: 250,
      //   field: "phone",
      //   headerName: "PhoneNumber",
      //   renderCell: ({ row }: CellType) => (
      //     <Typography variant="body2">
      //       {row.phone ? row.phone: null}
      //     </Typography>
      //   ),
      // },
      // {
      //   flex: 0.2,
      //   minWidth: 110,
      //   field: "status",
      //   headerName: "Status",
      //   renderCell: ({ row }: CellType) => (
      //     <CustomChip
      //       // skin="light"
      //       size="small"
      //       label={row.status}
      //       color={row.status ? statusObj[row.status].color : "primary"}
      //       sx={{
      //         textTransform: "capitalize",
      //         "& .MuiChip-label": {
      //           px: 2.5,
      //           lineHeight: 1.385,
      //           color: "#ffffff",
      //         },
      //       }}
      //     />
      //   ),
      // },
      {
        flex: 0.15,
        minWidth: 110,
        field: "action",
        headerName: "action",
        sortable: false,
        filterable: false,
        renderCell: ({ row }: CellType) => (
          <ActionsDropdown
          id={row.id.toString()}
          // status={row.status}
          email={row.attributes.email}
          name={row.attributes.name}
          // role={row.role}
          // phone={row.phone}
          // setUserList={setUserList}
         // is_pending={row.is_pending}
          />
        ),
      },
    ];
  }, []);

  return (
    <Card>
      <Box sx={{ p: 5, display: "flex", justifyContent: "space-between" }}>
        <CardHeader title="User List" sx={{ p: 0, whiteSpace: "nowrap" }} />
        {/* <Link href="/dashboard/create">
          <Button variant="contained">Create User</Button>
        </Link> */}
      </Box>
      <Box sx={{ p: 5, pt: 0, display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ maxWidth: "100%", width: "100%" }}
          label="Search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </Box>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
      // pageSize={pageSize}
      // disableSelectionOnClick
      // rowsPerPageOptions={[5, 10, 25, 50]}
      // onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
      />
    </Card>
  );
};

export default UserTable;
