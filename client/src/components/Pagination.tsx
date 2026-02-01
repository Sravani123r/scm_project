import { Button } from '@heroui/react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button size="sm" variant="bordered" isDisabled={page === 0} onPress={() => onPageChange(page - 1)}>
        Prev
      </Button>

      <span className="text-sm font-medium">
        Page {page + 1} of {totalPages}
      </span>

      <Button size="sm" variant="bordered" isDisabled={page + 1 === totalPages} onPress={() => onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
