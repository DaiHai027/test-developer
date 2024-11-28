"use client";
import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import BaseText from "@/components/Custom/BaseText";
import { FONT_SIZE, COLORS } from "@/components/Custom/enum";

// Types and Interfaces
interface TableData {
  [key: string]: any;
}

interface TableProps {
  data: TableData[];
  onSearch: (term: string) => void;
  onSort: (column: string, direction: "asc" | "desc") => void;
  columns: string[];
}

// Component
function Table({ data, onSearch, onSort, columns }: TableProps) {
  // State Management
  const { searchState, selectionState, sortingState, filterState, mountState } =
    useTableState(data);

  // Event Handlers
  const eventHandlers = useTableEventHandlers({
    data,
    onSearch,
    onSort,
    ...searchState,
    ...selectionState,
    ...sortingState,
    ...filterState,
  });

  // Render Components
  const renderComponents = {
    SearchBar: () => <SearchBar {...searchState} {...eventHandlers} />,
    FilterModal: () => <FilterModal {...filterState} {...eventHandlers} />,
    TableHeader: () => (
      <TableHeader
        {...sortingState}
        {...selectionState}
        {...eventHandlers}
        columns={columns}
        data={data}
      />
    ),
    TableBody: () => (
      <TableBody
        data={data}
        columns={columns}
        {...selectionState}
        {...eventHandlers}
      />
    ),
  };

  // Main Render
  return (
    <div className="container mx-auto w-full max-w-screen-xl overflow-x-auto rounded-lg shadow-lg bg-white py-5">
      <div className="flex justify-between items-center mb-4 gap-4 p-5 w-full">
        <renderComponents.SearchBar />
        <button
          onClick={eventHandlers.toggleFilterModal}
          className="bg-[#F9F9F8] px-6 rounded-md hover:bg-gray-100 transition-colors duration-150 whitespace-nowrap py-4 flex items-center gap-2 text-gray-500"
        >
          Filters
          <HiAdjustmentsVertical size={24} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse">
          <renderComponents.TableHeader />
          <renderComponents.TableBody />
        </table>
      </div>

      <renderComponents.FilterModal />
    </div>
  );
}

// Custom Hooks
function useTableState(data: TableData[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      setSelectedRows([]);
    }
  }, [data]);

  return {
    searchState: { searchTerm, setSearchTerm },
    selectionState: { selectedRows, setSelectedRows },
    sortingState: {
      sortColumn,
      setSortColumn,
      sortDirection,
      setSortDirection,
    },
    filterState: { showFilterModal, setShowFilterModal },
    mountState: { mounted, setMounted },
  };
}

function useTableEventHandlers({
  data,
  onSearch,
  onSort,
  searchTerm,
  setSearchTerm,
  selectedRows,
  setSelectedRows,
  sortColumn,
  setSortColumn,
  sortDirection,
  setSortDirection,
  showFilterModal,
  setShowFilterModal,
}: {
  data: TableData[];
  onSearch: (term: string) => void;
  onSort: (column: string, direction: "asc" | "desc") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
  sortColumn: string | null;
  setSortColumn: (column: string | null) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  showFilterModal: boolean;
  setShowFilterModal: (show: boolean) => void;
}) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Debounce search to avoid too many re-renders
    const timeoutId = setTimeout(() => {
      onSearch(term); // Use term directly instead of searchTerm to avoid closure issues
    }, 300);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedRows(
      selectedRows.includes(index)
        ? selectedRows.filter((i: number) => i !== index)
        : [...selectedRows, index]
    );
  };

  const handleSort = (column: string) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort(column, newDirection);
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === data.length
        ? []
        : data.map((_, index: number) => index)
    );
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  return {
    handleSearch,
    handleCheckboxChange,
    handleSort,
    handleSelectAll,
    toggleFilterModal,
  };
}

// Component Definitions
function SearchBar({
  searchTerm,
  handleSearch,
}: {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus the input when the component mounts
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative bg-[#F9F9F8] flex items-center w-full focus-within:border focus-within:border-gray-300 rounded-md py-4">
      <input
        ref={inputRef} // Attach the ref to the input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search ... "
        className="bg-transparent pl-12 border-none outline-none w-full"
      />
      <IoIosSearch size={24} className="absolute left-4 text-gray-500" />
    </div>
  );
}

function FilterModal({
  showFilterModal,
  toggleFilterModal,
}: {
  showFilterModal: boolean;
  toggleFilterModal: () => void;
}) {
  if (!showFilterModal) return null;

  return (
    <div
      className={`fixed inset-0 bg-black transition-opacity duration-2000 ease-in-out ${
        showFilterModal ? "bg-opacity-50" : "bg-opacity-0"
      } flex items-center justify-center z-50`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-xl w-[500px] transition-all duration-2000 ease-in-out ${
          showFilterModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <BaseText
          title="Type Something"
          fontSize={FONT_SIZE.PX_20}
          textColor="text-[#999999]"
          textAlign="left"
          lineHeight="1.5"
        />
        <BaseText
          title="recommended"
          fontSize={FONT_SIZE.PX_16}
          textColor="text-[#999999]"
          textAlign="left"
          lineHeight="1.5"
          className="mt-4"
        />
        <ul className="mt-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <li key={index} className="flex items-center justify-start gap-2 p-2 hover:bg-gray-100 transition-colors duration-150 rounded-md cursor-pointer">
              <BaseText
                title="Title goes here"
                fontSize={FONT_SIZE.PX_14}
                textColor="text-[#555555]"
                textAlign="left"
                lineHeight="1.5"
              />
            </li>
          ))}
        </ul>
        {/* Add your filter controls here */}
        <div className="flex justify-end mt-4">
          <button
            onClick={toggleFilterModal}
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function TableHeader({
  columns,
  data,
  selectedRows,
  sortColumn,
  sortDirection,
  handleSort,
  handleSelectAll,
}: {
  columns: string[];
  data: TableData[];
  selectedRows: number[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  handleSort: (column: string) => void;
  handleSelectAll: () => void;
}) {
  return (
    <thead className="align-middle">
      <tr>
        <th className="text-center p-3">
          <input
            type="checkbox"
            checked={
              selectedRows.length > 0 && selectedRows.length === data.length
            }
            onChange={handleSelectAll}
            className="hover:cursor-pointer w-4 h-4"
          />
        </th>
        {columns.map((key, i) => (
          <th
            key={i}
            onClick={() => handleSort(key)}
            className="cursor-pointer hover:bg-gray-100 p-3 text-center font-semibold"
          >
            <div className="flex items-center justify-center gap-2">
              {key}
              {sortColumn === key ? (
                sortDirection === "asc" ? (
                  <FaSortUp className="text-black" />
                ) : (
                  <FaSortDown className="text-black" />
                )
              ) : (
                <FaSort className="text-black" />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({
  data,
  columns,
  selectedRows,
  handleCheckboxChange,
}: {
  data: TableData[];
  columns: string[];
  selectedRows: number[];
  handleCheckboxChange: (index: number) => void;
}) {
  return (
    <tbody className="align-middle">
      {data.map((row, index) => (
        <tr
          key={index}
          className={`
            ${
              selectedRows.includes(index)
                ? "bg-[#377FE9]"
                : "hover:bg-gray-50 transition-colors duration-150"
            }
          `}
        >
          <td className="text-center p-3">
            <input
              type="checkbox"
              checked={selectedRows.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className="hover:cursor-pointer w-4 h-4"
            />
          </td>
          {columns.map((key, i) => (
            <td key={i} className="p-3 text-center">
              {key === "fullName" ? (
                <div className="flex items-center justify-center gap-2 w-[100%]">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                    <div
                      className="w-full h-full flex items-center justify-center text-white"
                      style={{ backgroundColor: row.color || "#000000" }}
                    >
                      {row[key].charAt(0)}
                    </div>
                  </div>
                  <span className="text-left whitespace-nowrap w-1/3">
                    {row[key]}
                  </span>
                </div>
              ) : key === "specialties" ? (
                <div className="w-[100%] flex flex-row items-center justify-center gap-2">
                  <div className="flex flex-wrap gap-1">
                    {String(row[key])
                      .split(",")
                      .map((specialty, index, array) => {
                        if (index < 2) {
                          return (
                            <div
                              key={index}
                              className="bg-[#F3F3F3] text-[#5E5E5E] px-2 py-1 rounded-md"
                            >
                              {specialty}
                            </div>
                          );
                        } else if (index === 2) {
                          return (
                            <div
                              key={index}
                              className="bg-[#F3F3F3] text-[#5E5E5E] px-2 py-1 rounded-md"
                            >
                              +{array.length - 2} more
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                </div>
              ) : key === "availability" ? (
                <div className="w-[100%]">{row[key] ? "Yes" : "No"}</div>
              ) : key === "dayRate" ? (
                <div className="w-[100%]">${String(row[key])}</div>
              ) : (
                String(row[key])
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default Table;
