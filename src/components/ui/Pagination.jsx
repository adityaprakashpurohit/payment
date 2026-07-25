import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          PREV
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          NEXT
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xl font-bold uppercase tracking-tighter text-muted-foreground">
            PAGE <span className="text-foreground">{currentPage}</span> OF{" "}
            <span className="text-foreground">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-6 py-4 text-foreground border-2 border-border hover:bg-foreground hover:text-black focus:z-20 disabled:opacity-50 uppercase font-bold tracking-tighter transition-colors"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-6 py-4 text-foreground border-2 border-border hover:bg-foreground hover:text-black focus:z-20 disabled:opacity-50 uppercase font-bold tracking-tighter transition-colors"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
