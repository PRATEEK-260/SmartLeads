import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalLeads: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalLeads,
  limit,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startIdx = (currentPage - 1) * limit + 1;
  const endIdx = Math.min(currentPage * limit, totalLeads);

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;
    
    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="px-gutter py-4 flex items-center justify-between border-t border-outline-variant bg-surface-container-low">
      <span className="font-body-sm text-body-sm text-on-surface-variant">
        Showing {startIdx} to {endIdx} of {totalLeads} leads
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-2 text-outline">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-8 h-8 rounded-lg font-label-md text-label-md transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-on-primary'
                    : 'hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
