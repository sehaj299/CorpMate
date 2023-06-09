// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";

// ** Icon Imports
import Icon from "src/@core/components/icon";
import { useState } from "react";

interface TableHeaderProps {
  value: string;
  toggle: () => void;
  handleFilter: (val: string) => void;
}

const TableHeader = (props: TableHeaderProps) => {
  const [display, setDisplay] = useState(true);
  // ** Props
  const { handleFilter, toggle, value, handleViewChange } = props;
  const [searchValue, setSearchValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    handleFilter(newValue);
  };

  if (display === true) {
    handleViewChange(true);
  } else {
    handleViewChange(false);
  }

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
        <Button onClick={() => setDisplay(false)}>
          <Tab value="1" icon={<Icon icon="ic:baseline-grid-view" />} />
        </Button>
        <Button onClick={() => setDisplay(true)}>
          <Tab value="2" icon={<Icon icon="material-symbols:list" />} />
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          size="small"
          value={searchValue}
          sx={{ mr: 6, mb: 2 }}
          placeholder="Search"
          onChange={handleChange}
        />
        <Button sx={{ mb: 2 }} onClick={toggle} variant="contained">
          Add Department
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
