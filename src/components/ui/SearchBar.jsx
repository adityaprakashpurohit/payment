import React from "react";
import { Search } from "lucide-react";
import { Input } from "./Input";

export const SearchBar = ({ placeholder = "Search...", onChange, value, className }) => {
  return (
    <div className={className}>
      <Input
        icon={Search}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
