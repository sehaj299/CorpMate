// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import CardSnippet from "src/@core/components/card-snippet";

// ** Demo Components Imports
import ListUsers from "src/views/components/list/ListUsers";

// ** Source code imports
import * as source from "src/views/components/list/ListSourceCode";

const Lists = () => {
  return (
    <Grid className="match-height" container spacing={6}>
      <Grid item sx={{ width: "100%" }}>
        <ListUsers />
      </Grid>
    </Grid>
  );
};

export default Lists;
