import React from "react";
import { Menu, Bell, Search } from "lucide-react";

export const Navbar = ({ onMenuClick, userRole }) => {
  return (
    <header className="sticky top-0 z-30 flex h-24 w-full items-center justify-between border-b-2 border-border bg-background px-4 sm:px-8">
      <div className="flex items-center gap-6">
        <button
          onClick={onMenuClick}
          className="p-2 text-foreground hover:bg-accent hover:text-black border-2 border-transparent hover:border-black transition-colors lg:hidden"
        >
          <Menu size={32} />
        </button>
        <div className="hidden lg:flex relative w-full max-w-xl items-center">
          <Search className="absolute left-0 h-8 w-8 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="SEARCH..."
            className="h-16 w-full rounded-none border-0 border-b-2 border-border bg-transparent pl-12 pr-4 text-xl font-bold uppercase tracking-tighter text-foreground transition-colors placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-foreground hover:bg-accent hover:text-black border-2 border-transparent hover:border-black transition-colors">
          <Bell size={32} />
          <span className="absolute right-2 top-2 h-3 w-3 rounded-none bg-[#DFE104] ring-2 ring-black"></span>
        </button>
        <div className="h-12 w-12 border-2 border-border bg-muted flex items-center justify-center text-foreground font-black text-xl uppercase tracking-tighter">
          {userRole === "admin" ? "AD" : "CL"}
        </div>
      </div>
    </header>
  );
};
