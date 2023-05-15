// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";

// ** Icon Imports
import Icon from "src/@core/components/icon";

interface TableHeaderProps {
  value: string;
  toggle: () => void;
  handleFilter: (val: string) => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, value } = props;

  return (
    <Box
      sx={{
        p: 0,
        pb: 3,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Button>
          <Tab value="1" icon={<Icon icon="ic:baseline-grid-view" />} />
        </Button>
        <Button>
          <Tab value="2" icon={<Icon icon="material-symbols:list" />} />
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          size="small"
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder="Search User"
          onChange={(e) => handleFilter(e.target.value)}
        />

        <Button sx={{ mb: 2 }} onClick={toggle} variant="contained">
          Add Department
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
