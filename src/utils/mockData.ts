import type { ListItem } from "../types/widget.types";

export const generateMockData = (count: number): ListItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Element ${index + 1}`,
  }));
};
