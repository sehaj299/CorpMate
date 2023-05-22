// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import CardSnippet from "src/@core/components/card-snippet";

// ** Demo Components Imports
import ListComponent from "src/views/components/list/ListUsers";

// ** Source code imports
import * as source from "src/views/components/list/ListSourceCode";

interface UserListProps {
  search: string;
}

const UserList: React.FC<UserListProps> = ({ searchData }) => {
  return (
    <Grid className="match-height" container spacing={6}>
      <Grid item sx={{ width: "100%" }}>
        <ListComponent searchData={searchData} />
      </Grid>
    </Grid>
  );
};

export default UserList;
