import { useCallback, useMemo, useState } from "react";
import type { ListItem } from "../types/widget.types";

export const useWidgetLogic = (allItems: ListItem[]) => {
  // State

  const [isOpen, setIsOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);

  const [tempSelectedItems, setTempSelectedItems] = useState<ListItem[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTreshold, setFilterThreshold] = useState<number | null>(null);

  // Actions

  const openModal = () => {
    setTempSelectedItems(selectedItems);
    setIsOpen(true);
    setSearchTerm("");
    setFilterThreshold(null);
  };

  const save = () => {
    setSelectedItems(tempSelectedItems);
    setIsOpen(false);
  };

  const cancel = () => {
    setIsOpen(false);
  };

  const toggleSelection = useCallback((item: ListItem) => {
    setTempSelectedItems((prev) => {
      const isSelected = prev.find((prevItem) => prevItem.id === item.id);

      if (isSelected) {
        return prev.filter((selectedItem) => selectedItem.id !== item.id);
      } else {
        if (prev.length >= 3) return prev;
        return [...prev, item];
      }
    });
  }, []);

  const removeSelectedItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.filter((selectedItem) => selectedItem.id !== id),
    );
  };

  const filteredElements = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearchTerm = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilterThreshold =
        filterTreshold !== null ? item.id <= filterTreshold : true;

      return matchesSearchTerm && matchesFilterThreshold;
    });
  }, [allItems, searchTerm, filterTreshold]);

  return {
    isOpen,
    selectedItems,
    tempSelectedItems,
    searchTerm,
    setSearchTerm,
    filterTreshold,
    setFilterThreshold,
    filteredElements,
    openModal,
    save,
    cancel,
    toggleSelection,
    removeSelectedItem,
  };
};
