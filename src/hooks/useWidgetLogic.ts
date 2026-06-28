import { useCallback, useMemo, useState } from "react";
import type { ListItem } from "../types/widget.types";
import { useDebounce } from "./useDebounce";

export const useWidgetLogic = (allItems: ListItem[]) => {
  // State

  const [isOpen, setIsOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);

  const [tempSelectedItems, setTempSelectedItems] = useState<ListItem[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterThreshold, setFilterThreshold] = useState<number | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
        .includes(debouncedSearchTerm.toLowerCase());

      const matchesFilterThreshold =
        filterThreshold !== null ? item.id > filterThreshold : true;

      return matchesSearchTerm && matchesFilterThreshold;
    });
  }, [allItems, debouncedSearchTerm, filterThreshold]);

  return {
    isOpen,
    selectedItems,
    tempSelectedItems,
    searchTerm,
    setSearchTerm,
    filterThreshold,
    setFilterThreshold,
    filteredElements,
    openModal,
    save,
    cancel,
    toggleSelection,
    removeSelectedItem,
  };
};
