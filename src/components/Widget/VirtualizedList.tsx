import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Box,
  Typography,
  ListItem,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import type { ListItem as Item } from "../../types/widget.types";

interface VirtualizedListProps {
  filteredElements: Item[];
  tempSelectedItems: Item[];
  toggleSelection: (item: Item) => void;
}

const Row = ({
  index,
  style,
  data,
}: {
  index: number;
  style: React.CSSProperties;
  data: VirtualizedListProps;
}) => {
  const { filteredElements, tempSelectedItems, toggleSelection } = data;
  const item = filteredElements[index];

  if (!item) return null;

  const isSelected = tempSelectedItems.some(
    (selected: Item) => selected.id === item.id,
  );
  const isDisabled = !isSelected && tempSelectedItems.length >= 3;

  return (
    <ListItem style={style} key={item.id} disablePadding>
      <ListItemButton
        onClick={() => toggleSelection(item)}
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
};

export const VirtualizedList = ({
  filteredElements,
  tempSelectedItems,
  toggleSelection,
}: VirtualizedListProps) => {
  if (filteredElements.length === 0) {
    return (
      <Typography sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
        No items found. Try adjusting your search or filter.
      </Typography>
    );
  }

  const itemData = { filteredElements, tempSelectedItems, toggleSelection };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        bgcolor: "background.paper",
        height: 300,
      }}
    >
      <FixedSizeList
        height={300}
        width="100%"
        itemSize={48}
        itemCount={filteredElements.length}
        itemData={itemData}
      >
        {Row}
      </FixedSizeList>
    </Box>
  );
};
