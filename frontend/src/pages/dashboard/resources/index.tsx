// ** React Import
import { ReactElement, useMemo, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

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
  user_name: string
  email: string;
  avatarSrc?: string;
  phone_number?: string;
  status: "Active" | "Pending" | "Deactive";
  role?: string;
  profile_image_url?: string;
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

const roleObj: RoleObj = {
  Admin: {
    icon: (
      <Box
        component="span"
        sx={{ display: "flex", mr: 2, color: "error.main" }}
      >
        <Icon icon="mdi:laptop" />
      </Box>
    ),
  },
  "Finance Manager": {
    icon: (
      <Box
        component="span"
        sx={{ display: "flex", mr: 2, color: "warning.main" }}
      >
        <Icon icon="mdi:cog" />
      </Box>
    ),
  },
  "Support Manager": {
    icon: (
      <Box
        component="span"
        sx={{ display: "flex", mr: 2, color: "success.main" }}
      >
        <Icon icon="mdi:chart-donut" />
      </Box>
    ),
  },
  "Support Specialist": {
    icon: (
      <Box component="span" sx={{ display: "flex", mr: 2, color: "info.main" }}>
        <Icon icon="mdi:pencil-outline" />
      </Box>
    ),
  },
  Subscriber: {
    icon: (
      <Box
        component="span"
        sx={{ display: "flex", mr: 2, color: "primary.main" }}
      >
        <Icon icon="mdi:account-outline" />
      </Box>
    ),
  },
  "Basic Subscriber": {
    icon: (
      <Box
        component="span"
        sx={{ display: "flex", mr: 2, color: "primary.main" }}
      >
        <Icon icon="mdi:account-outline" />
      </Box>
    ),
  },
  "Standard Subscriber": {
    icon: (
      <Box
        component="span"
        sx={{ display: "flex", mr: 2, color: "primary.main" }}
      >
        <Icon icon="mdi:account-outline" />
      </Box>
    ),
  },
  "Premium Subscriber": {
    icon: (
      <Box
        component="span"
        sx={{ display: "flex", mr: 2, color: "primary.main" }}
      >
        <Icon icon="mdi:account-outline" />
      </Box>
    ),
  },
};

const statusObj: StatusObj = {
  Active: { color: "success" },
  Pending: { color: "warning" },
  Deactive: { color: "secondary" },
};
const rows: TableBodyRowType[] = [
  {
    id: 1,
    role: 'Admin',
    status: 'Pending',
    user_name: '@jstevenson5c',
    email: 'susanna.Lind57@gmail.com',
    avatarSrc: '/images/avatars/1.png'
  },
  {
    id: 2,
    role: 'editor',
    status: 'Active',
    user_name: '@rcrawford1d',
    avatarSrc: '/images/avatars/3.png',
    email: 'estelle.Bailey10@gmail.com'
  },
  {
    id: 3,
    role: 'author',
    status: 'Deactive',
    user_name: '@lreese3b',
    email: 'milo86@hotmail.com',
    avatarSrc: '/images/avatars/2.png'
  },
  {
    id: 4,
    role: 'editor',
    status: 'Pending',
    user_name: '@rsims6f',
    email: 'lonnie35@hotmail.com',
    avatarSrc: '/images/avatars/5.png'
  },
  {
    id: 5,
    status: 'Active',
    role: 'maintainer',
    user_name: '@lyoung4a',
    email: 'ahmad_Collins@yahoo.com',
    avatarSrc: '/images/avatars/4.png'
  },
  {
    id: 6,
    role: 'editor',
    status: 'Pending',
    user_name: '@ffrank7e',
    avatarSrc: '/images/avatars/7.png',
    email: 'tillman.Gleason68@hotmail.com'
  },
  {
    id: 7,
    role: 'subscriber',
    status: 'Deactive',
    email: 'otho21@gmail.com',
    user_name: '@ppatterson2g',
    avatarSrc: '/images/avatars/8.png'
  },
  {
    id: 8,
    status: 'Active',
    role: 'subscriber',
    user_name: '@cunderwood8h',
    avatarSrc: '/images/avatars/3.png',
    email: 'florencio.Little@hotmail.com'
  }
]
const UserTable = ({ users }: any) => {
  const [userList, setUserList] = useState(users);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState("");

  // const tableData = useMemo(() => {
  //   if (searchText.length > 0) {
  //     return userList.filter((row: any) => {
  //       const firstNameMatch = row.first_name
  //         ?.toLocaleLowerCase()
  //         .includes(searchText.toLocaleLowerCase());
  //       const lastNameMatch = row.last_name
  //         ?.toLocaleLowerCase()
  //         .includes(searchText.toLocaleLowerCase());
  //       const emailMatch = row.email
  //         ?.toLocaleLowerCase()
  //         .includes(searchText.toLocaleLowerCase());
  //       return firstNameMatch || lastNameMatch || emailMatch;
  //     });
  //   } else {
  //     return userList;
  //   }
  // }, [users, userList, searchText]);
  const renderUserAvatar = (row: TableBodyRowType) => {
    let initials = null;
    if (row.user_name) {
      if (row.user_name.length >= 1) {
        const firstInitial = row.user_name.split("");
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
        skin="light"
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
        sortable: false,
        renderCell: ({ row }: CellType) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {row.user_name ? row.user_name : null}
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
          <Typography variant="body2">{row.email}</Typography>
        ),
      },
      {
        flex: 0.3,
        minWidth: 130,
        field: "role",
        headerName: "role",
        renderCell: ({ row }: CellType) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{ color: "text.secondary", textTransform: "capitalize" }}
            >
              {row.role ? row.role : null}
            </Typography>
          </Box>
        ),
      },
      {
        flex: 0.1,
        minWidth: 250,
        field: "phone",
        headerName: "PhoneNumber",
        renderCell: ({ row }: CellType) => (
          <Typography variant="body2">
            {row.phone_number ? row.phone_number : null}
          </Typography>
        ),
      },
      {
        flex: 0.2,
        minWidth: 110,
        field: "status",
        headerName: "Status",
        renderCell: ({ row }: CellType) => (
          <CustomChip
            skin="light"
            size="small"
            label={row.status}
            color={row.status ? statusObj[row.status].color : "primary"}
            sx={{
              textTransform: "capitalize",
              "& .MuiChip-label": {
                px: 2.5,
                lineHeight: 1.385,
                color: "#ffffff",
              },
            }}
          />
        ),
      },
      {
        flex: 0.15,
        minWidth: 110,
        field: "action",
        headerName: "action",
        sortable: false,
        filterable: false,
        renderCell: ({ row }: CellType) => (
          <ActionsDropdown
          // id={row.id.toString()}
          // status={row.status}
          // email={row.email}
          // first_name={row.first_name}
          // last_name={row.last_name}
          // role={row.role}
          // phone_number={row.phone_number}
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
