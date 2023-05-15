// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import { Box, Dialog, Menu, Badge, Avatar, Divider, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomAvatar from "src/@core/components/mui/avatar";
// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Type Imports
import { Settings } from "src/@core/context/settingsContext";


interface Props {
  settings: Settings;
}
interface UserProps {
  username: string
  email: string
  companyName: string
}

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props;
  const [loading, setLoading] = useState<boolean>(false);
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  // const [userName, setUserName] = useState<string>('')
  // const [email, setEmail] = useState<string>('')
  // const [companyName, setCompanyName] = useState<string>('')
  // ** Hooks
  const router = useRouter();
  // ** Vars
  const { direction } = settings;
  const user: any = localStorage.getItem('user')
  const userData = JSON.parse(user)

  const userName = userData?.username;
  const companyName = userData?.companyName;
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user')
    router.push('/login')
  }
  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <CustomAvatar
          sx={{ width: 40, height: 40 }}

          onClick={handleDropdownOpen}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <CustomAvatar

                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>
            <Box
              sx={{
                display: "flex",
                ml: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}> {companyName}</Typography>

              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {userName}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: "0 !important" }} />
        <MenuItem
          sx={{
            py: 2,
            "& svg": { mr: 2, fontSize: "1.375rem", color: "text.primary" },
          }}

        >
          <Icon icon="mdi:account-outline" />
          Profile Management
        </MenuItem>


        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 2,
            "& svg": { mr: 2, fontSize: "1.375rem", color: "text.primary" },
          }}
        >
          <Icon icon="mdi:logout-variant" />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
