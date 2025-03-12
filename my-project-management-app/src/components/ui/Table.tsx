import { FC, ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

interface TableCellProps extends TableProps {
  colSpan?: number;
  className?: string;
}

export const Table: FC<TableProps> = ({ children }) => (
  <table className="min-w-full border-collapse bg-white">{children}</table>
);

export const TableHead: FC<TableProps> = ({ children }) => (
  <thead className="bg-gray-800 text-white">{children}</thead>
);

export const TableBody: FC<TableProps> = ({ children }) => (
  <tbody>{children}</tbody>
);

export const TableRow: FC<TableProps> = ({ children }) => (
  <tr className="border-b">{children}</tr>
);

export const TableHeader: FC<TableProps> = ({ children }) => (
  <th className="p-4 border bg-gray-900 text-white">{children}</th>
);

export const TableCell: FC<TableCellProps> = ({
  children,
  colSpan,
  className,
}) => (
  <td colSpan={colSpan} className={`p-4 border ${className || ''}`}>
    {children}
  </td>
);
