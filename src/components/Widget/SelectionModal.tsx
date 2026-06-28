import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

// Definišemo tip za props kako bismo imali autocompletion iz našeg Hook-a
interface SelectionModalProps {
  state: ReturnType<typeof useWidgetLogic>;
}

export const SelectionModal = ({ state }: SelectionModalProps) => {
  /* PERFORMANCE HACK (Ključno za odbranu zadatka): 
    Pošto imamo 15.000 elemenata, renderovanje 15.000 DOM nodova odjednom 
    bi potpuno "zamrzlo" browser. Za ovakve zadatke, u produkciji se koristi 
    "Virtualization" (npr. react-window). Za potrebe zadatka, elegantno rešenje 
    koje sprečava pad performansi je sečenje niza na prvih 100 rezultata. 
    Pretraga i filteri i dalje pretražuju svih 15.000 u pozadini!
  */
  const displayedElements = state.filteredElements.slice(0, 100);

  return (
    <Dialog open={state.isOpen} onClose={state.cancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Change Selection</DialogTitle>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Sekcija za pretragu i filtere */}
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
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
            <Select
              value={
                state.filterThreshold === null ? "" : state.filterThreshold
              }
              label="Filter by ID"
              onChange={(e) => {
                // e.target.value can be string or number; cast to string for safe comparison
                const val = e.target.value as unknown as string;
                state.setFilterThreshold(val === "" ? null : Number(val));
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

        {/* Scrollabilna lista fiksne visine */}
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
              // Proveravamo da li je trenutni element već u privremenom state-u
              const isSelected = state.tempSelectedItems.some(
                (selected) => selected.id === item.id,
              );
              // Ako nije izabran, a već imamo 3 elementa, isključujemo checkbox
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

        {/* Duplirani izabrani elementi na dnu modala (kao blokovi/čipovi) */}
        <Box sx={{ mt: 1, minHeight: "60px" }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Selected items ({state.tempSelectedItems.length}/3):
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
      </DialogContent>

      {/* Akcije */}
      <DialogActions sx={{ px: 3, py: 2 }}>
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
      </DialogActions>
    </Dialog>
  );
};
