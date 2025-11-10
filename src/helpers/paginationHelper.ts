export const calculateStartRank = (currentPage: number, itemsPerPage: number): number => {
  return (currentPage - 1) * itemsPerPage + 1;
};

export const paginateArray = <T>(
  items: T[],
  page: number,
  itemsPerPage: number
): {
  paginatedItems: T[];
  totalPages: number;
  startIndex: number;
  endIndex: number;
} => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return { paginatedItems, totalPages, startIndex, endIndex };
};
