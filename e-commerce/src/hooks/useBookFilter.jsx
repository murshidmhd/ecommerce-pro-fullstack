// src/hooks/useBookFilter.js
import { useMemo } from 'react';

export const useBookFilter = (books, search, selectedType, sortBy) => {
  return useMemo(() => {
    let result = [...books];

    // Search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
      );
    }

    // Type filter
    if (selectedType !== "all") {
      result = result.filter(book => book.type === selectedType);
    }

    // Sort
    result.sort((a, b) => {
      switch(sortBy) {
        case "price-low": return (a.price || 0) - (b.price || 0);
        case "price-high": return (b.price || 0) - (a.price || 0);
        case "title": return a.title.localeCompare(b.title);
        default: return b.id - a.id; // newest first
      }
    });

    return result;
  }, [books, search, selectedType, sortBy]);
};
