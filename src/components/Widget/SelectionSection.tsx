import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import { useWidgetLogic } from "../../hooks/useWidgetLogic";

interface SelectionSectionProps {
  state: ReturnType<typeof useWidgetLogic>;
}

export const SelectionSection = ({ state }: SelectionSectionProps) => {
  const displayedElements = state.filteredElements.slice(0, 100);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Search elements..."
          variant="outlined"
          fullWidth
          size="small"
          value={state.searchTerm}
          onChange={(e) => state.setSearchTerm(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Filter by ID</InputLabel>
          <Select<number | "">
            value={state.filterThreshold === null ? "" : state.filterThreshold}
            label="Filter by ID"
            onChange={(e) => {
              const val = e.target.value;
              state.setFilterThreshold(val === "" ? null : val);
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

      <List
        sx={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          bgcolor: "background.paper",
        }}
      >
        {displayedElements.length === 0 ? (
          <Typography
            sx={{ p: 3, textAlign: "center", color: "text.secondary" }}
          >
            No items found. Try adjusting your search or filter.
          </Typography>
        ) : (
          displayedElements.map((item) => {
            const isSelected = state.tempSelectedItems.some(
              (selected) => selected.id === item.id,
            );
            const isDisabled =
              !isSelected && state.tempSelectedItems.length >= 3;

            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => state.toggleSelection(item)}
                  disabled={isDisabled}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSelected}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>
      <Box
        sx={{
          p: 2,
          bgcolor: "#f9f9f9",
          borderRadius: 1,
          border: "1px dashed #ccc",
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Selected items ({state.tempSelectedItems.length}/3):
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", minHeight: 32 }}>
          {state.tempSelectedItems.map((item) => (
            <Chip
              key={item.id}
              label={item.name}
              onDelete={() => state.toggleSelection(item)}
              color="primary"
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 1 }}>
        <Button
          onClick={state.cancel}
          color="inherit"
          sx={{ fontWeight: "bold" }}
        >
          Cancel
        </Button>
        <Button
          onClick={state.save}
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
