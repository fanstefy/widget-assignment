import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import { useWidgetLogic } from "../../hooks/useWidgetLogic";
import { VirtualizedList } from "./VirtualizedList";

interface SelectionSectionProps {
  state: ReturnType<typeof useWidgetLogic>;
}

export const SelectionSection = ({ state }: SelectionSectionProps) => {
  const {
    filteredElements,
    tempSelectedItems,
    toggleSelection,
    setSearchTerm,
    setFilterThreshold,
    cancel,
    save,
    searchTerm,
    filterThreshold,
  } = state;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {/* Search and filters */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Search elements..."
          variant="outlined"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Filter by ID</InputLabel>
          <Select<number | "">
            value={filterThreshold === null ? "" : filterThreshold}
            label="Filter by ID"
            onChange={(e) => {
              const val = e.target.value;
              setFilterThreshold(val === "" ? null : Number(val));
            }}
          >
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value={100}>{"> 100"}</MenuItem>
            <MenuItem value={2500}>{"> 2500"}</MenuItem>
            <MenuItem value={10000}>{"> 10000"}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Virtualized list */}
      <VirtualizedList
        filteredElements={filteredElements}
        tempSelectedItems={tempSelectedItems}
        toggleSelection={toggleSelection}
      />

      {/* Currently selected items */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#f9f9f9",
          borderRadius: 1,
          border: "1px dashed #ccc",
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Currently selected items ({tempSelectedItems.length}/3):
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", minHeight: 32 }}>
          {tempSelectedItems.map((item) => (
            <Chip
              key={item.id}
              label={item.name}
              onDelete={() => toggleSelection(item)}
              color="primary"
            />
          ))}
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 1 }}>
        <Button onClick={cancel} color="inherit" sx={{ fontWeight: "bold" }}>
          Cancel
        </Button>
        <Button
          onClick={save}
          variant="contained"
          disableElevation
          sx={{ fontWeight: "bold" }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
