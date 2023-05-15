import Icon from "../../../@core/components/icon";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import Spinner from "src/@core/components/spinner";
// import supaBase from "libs/supabase";
// import { user } from "typings";
// import { User_State } from "@/@core/states/status";
// import { useAppContext } from "@/@core/auth/AclGuard";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Spinner from "@/@core/components/spinner";
// import { User_Role } from "@/@core/states/roles";
// import { Subscriber_Roles } from "@/@core/states/subscriberRoles";

function ActionsDropdown(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  if (loading) {
    return (
      <Box className="loading-overlay">
        <Box className="loading-wrapper">
          <Spinner sx={{ height: "100%" }} />
        </Box>
      </Box>
    );
  }
  return (
    <Fragment>
      {loading ? (
        <Box className="loading-overlay">
          <Box className="loading-wrapper">
            <Spinner sx={{ height: "100%" }} />
          </Box>
        </Box>
      ) : null}
      {/* <Dialog
        open={deleteConfirmation}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: 650,
            p: [2, 10],
          },
        }}
        aria-describedby="user-view-edit-description"
      >
        <DialogTitle
          id="user-view-edit"
          sx={{ textAlign: "center", fontSize: "1.5rem !important" }}
        >
          Deactivate User!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="body2"
            id="user-view-edit-description"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Are You sure you want to Deactivate this User Account?
          </DialogContentText>

          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 1 }}
              type="submit"
              onClick={handleDeactivate}
            >
              Confirm
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        open={deactivateSuccess}
        onClose={handleSecondDialogClose}
        sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: 512 } }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              "& svg": {
                mb: 14,
                color: userInput === "yes" ? "success.main" : "error.main",
              },
            }}
          >
            <Icon
              fontSize="5.5rem"
              icon={
                userInput === "yes"
                  ? "mdi:check-circle-outline"
                  : "mdi:close-circle-outline"
              }
            />
            <Typography variant="h4" sx={{ mb: 8 }}>
              {userInput === "yes" ? "Deactivated!" : "Failed"}
            </Typography>
            <Typography>
              {userInput === "yes"
                ? "User has been Deactivated."
                : "User not Deactivated :)"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSecondDialogClose}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteUserConfirmation}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: 650,
            p: [2, 10],
          },
        }}
        aria-describedby="user-view-edit-description"
      >
        <DialogTitle
          id="user-view-edit"
          sx={{ textAlign: "center", fontSize: "1.5rem !important" }}
        >
          Delete User!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="body2"
            id="user-view-edit-description"
            sx={{ textAlign: "center", mb: 3, color: "#000" }}
          >
            Are You sure you want to Delete this User Account Permanently?
            <Typography>This action will be irreversible!</Typography>
          </DialogContentText>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 1 }}
              type="submit"
              onClick={handleDelete}
            >
              Confirm
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        open={invite}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: 650,
            p: [2, 10],
          },
        }}
        aria-describedby="user-view-edit-description"
      >
        <DialogTitle
          id="user-view-edit"
          sx={{ textAlign: "center", fontSize: "1.5rem !important" }}
        >
          Reinvite User!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="body2"
            id="user-view-edit-description"
            sx={{ textAlign: "center", mb: 3, color: "#000" }}
          >
            This will send a new invite link to the users for login!
          </DialogContentText>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              type="submit"
              onClick={handleInvite}
            >
              Confirm
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        open={activeConfirmation}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: 650,
            p: [2, 10],
          },
        }}
        aria-describedby="user-view-edit-description"
      >
        <DialogTitle
          id="user-view-edit"
          sx={{ textAlign: "center", fontSize: "1.5rem !important" }}
        >
          Activate User!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="body2"
            id="user-view-edit-description"
            sx={{ textAlign: "center", mb: 3, color: "#000" }}
          >
            Are you sure you want to Activate User Account
          </DialogContentText>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 1 }}
              type="submit"
              onClick={handleActivate}
            >
              Confirm
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        open={activateSuccess}
        onClose={handleSecondDialogClose}
        sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: 512 } }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              "& svg": {
                mb: 14,
                color: userInput === "yes" ? "success.main" : "error.main",
              },
            }}
          >
            <Icon
              fontSize="5.5rem"
              icon={
                userInput === "yes"
                  ? "mdi:check-circle-outline"
                  : "mdi:close-circle-outline"
              }
            />
            <Typography variant="h4" sx={{ mb: 8 }}>
              {userInput === "yes" ? "Activated!" : "Failed"}
            </Typography>
            <Typography>
              {userInput === "yes"
                ? "User has been Activated."
                : "User is not Activated Successfully:)"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSecondDialogClose}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
      <Box>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Icon icon="mdi:dots-vertical" />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {/* <Link href={`/dashboard/user-detail/${id}`}> */}
          <MenuItem onClick={handleClose}>View</MenuItem>
          {/* </Link> */}
          {/* <Link href={`user-list/${id}`}> */}
          <MenuItem onClick={handleClose}>Update User</MenuItem>
          {/* </Link> */}
          <MenuItem onClick={handleClose}>Reinvite</MenuItem>
          <MenuItem onClick={handleClose}>Activate</MenuItem>
          <MenuItem onClick={handleClose}>Deactivate</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
          {/* {status === User_State.PENDING || is_pending ? (
          ) : null}
          {status === User_State.DEACTIVE && !is_pending ? (
          ) : null}
          {status !== User_State.DEACTIVE ? (
          ) : null}
          {role !== User_Role.ADMIN ? (
            Subscriber_Roles.includes(role) || user?.role === User_Role.ADMIN ? (
              ability && ability.can("delete", "users") ? (
              ) : null
            ) : null
          ) : null} */}
        </Menu>
      </Box>
    </Fragment>
  );
}

export default ActionsDropdown;
