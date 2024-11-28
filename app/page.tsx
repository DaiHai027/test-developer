"use client";
import Image from "next/image";
import BaseText from "@/components/Custom/BaseText";
import { FONT_SIZE, COLORS } from "@/components/Custom/enum";
import Table from "@/components/Table/table";
import { useState, useEffect } from "react";

// Types
interface DataItem {
  fullName: string;
  specialties: string[];
  dayRate: number;
  availability: boolean;
}

// Constants
const TABLE_COLUMNS = ["fullName", "specialties", "dayRate", "availability"] as const;

// Custom Hooks
function useDataFetching() {
  const [data, setData] = useState<DataItem[]>([]);
  const [originalData, setOriginalData] = useState<DataItem[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const users = await response.json();
      setData(users);
      setOriginalData(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { data, setData, originalData };
}

// Data Handler Hook
function useDataHandlers(data: DataItem[], setData: React.Dispatch<React.SetStateAction<DataItem[]>>, originalData: DataItem[]) {
  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setData(originalData);
      return;
    }

    const normalizedTerm = term.toLowerCase();
    const filteredData = originalData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(normalizedTerm)
      )
    );
    setData(filteredData);
  };

  const handleSort = (column: keyof DataItem, direction: "asc" | "desc") => {
    const sortedData = [...data].sort((a, b) => {
      const compareResult =
        a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
      return direction === "asc" ? compareResult : -compareResult;
    });
    setData(sortedData);
  };

  return { handleSearch, handleSort };
}

// Component Definitions
function HeaderSection() {
  return (
    <header className="flex flex-col items-start justify-start gap-2 w-full ">
      <BaseText
        title="Home"
        lineHeight="1.5"
        fontSize={FONT_SIZE.PX_40}
        textColor={COLORS.BLACK}
        textAlign="center"
        fontWeight="font-bold"
      />
      <BaseText
        title="Lorem ipsum dolor sit amet consectetur. Lacus semper convallis non et vel nec sit proin."
        lineHeight="1.5"
        fontSize={FONT_SIZE.PX_16}
        textColor={COLORS.GRAY}
        textAlign="center"
      />
    </header>
  );
}

function BackgroundLayers() {
  return (
    <>
      <div className="h-[43vh] w-full bg-white absolute top-0"></div>
      <div className="h-[43vh] w-full bg-[#F2F1FF] absolute top-[43vh]"></div>
    </>
  );
}

// Main Component
export default function Home() {
  const { data, setData, originalData } = useDataFetching();
  const { handleSearch, handleSort } = useDataHandlers(data, setData, originalData);

  return (
    <main className="flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center justify-center gap-2 mx-auto z-10 pt-20 w-[1200px] ">
        <HeaderSection />
        
        <section className="flex flex-col items-center justify-center gap-2 w-full">
          <Table 
            data={data} 
            columns={TABLE_COLUMNS as unknown as string[]}
            onSearch={handleSearch} 
            onSort={(column, direction) => handleSort(column as keyof DataItem, direction)} 
          />
        </section>
      </div>
      
      <BackgroundLayers />
    </main>
  );
}
