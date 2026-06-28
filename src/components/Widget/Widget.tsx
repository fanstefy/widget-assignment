import { Box, Button, Chip, Typography, Paper } from "@mui/material";
import { useWidgetLogic } from "../../hooks/useWidgetLogic";
import { generateMockData } from "../../utils/mockData";
import { SelectionModal } from "./SelectionModal";

const MOCK_ITEMS = generateMockData(15000);

export const Widget = () => {
  const widgetState = useWidgetLogic(MOCK_ITEMS);

  console.log("widgetState: ", widgetState);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 500,
        width: "100%",
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Selected Items
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          mb: 3,
          minHeight: 40,
          alignItems: "center",
        }}
      >
        {widgetState.selectedItems.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No items selected.
          </Typography>
        ) : (
          widgetState.selectedItems.map((item) => (
            <Chip
              key={item.id}
              label={item.name}
              onDelete={() => widgetState.removeSelectedItem(item.id)}
              color="primary"
              variant="outlined"
            />
          ))
        )}
      </Box>

      <Button
        variant="contained"
        disableElevation
        onClick={widgetState.openModal}
        sx={{ textTransform: "none", fontWeight: "bold" }}
      >
        Change my choice
      </Button>

      <SelectionModal state={widgetState} />
    </Paper>
  );
};
