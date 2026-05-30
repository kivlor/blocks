import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";

type Invoice = {
  id: number;
  customer: string;
  status: "Draft" | "Pending" | "Paid" | "Overdue";
  amount: number;
  issued: string;
};

export function DataTableDemo() {
  const currency = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  const invoices: Invoice[] = [
    {
      id: 1001,
      customer: "Northstar Studio",
      status: "Paid",
      amount: 2480,
      issued: "2026-05-03",
    },
    {
      id: 1002,
      customer: "Marble Systems",
      status: "Pending",
      amount: 1290,
      issued: "2026-05-07",
    },
    {
      id: 1003,
      customer: "Signal Ridge",
      status: "Overdue",
      amount: 875,
      issued: "2026-05-09",
    },
    {
      id: 1004,
      customer: "Koa Works",
      status: "Draft",
      amount: 3200,
      issued: "2026-05-12",
    },
    {
      id: 1005,
      customer: "Beacon Labs",
      status: "Paid",
      amount: 540,
      issued: "2026-05-15",
    },
    {
      id: 1006,
      customer: "Rivet Supply",
      status: "Pending",
      amount: 1840,
      issued: "2026-05-18",
    },
    {
      id: 1007,
      customer: "Clearwater Co.",
      status: "Paid",
      amount: 960,
      issued: "2026-05-21",
    },
    {
      id: 1008,
      customer: "Atlas Freight",
      status: "Overdue",
      amount: 4110,
      issued: "2026-05-23",
    },
    {
      id: 1009,
      customer: "Field Notes",
      status: "Draft",
      amount: 720,
      issued: "2026-05-25",
    },
    {
      id: 1010,
      customer: "Copperline",
      status: "Pending",
      amount: 1535,
      issued: "2026-05-27",
    },
    {
      id: 1011,
      customer: "Juniper Health",
      status: "Paid",
      amount: 2875,
      issued: "2026-05-28",
    },
    {
      id: 1012,
      customer: "Orbit Legal",
      status: "Pending",
      amount: 640,
      issued: "2026-05-29",
    },
  ];

  const invoiceColumns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "id",
      header: "Invoice",
      cell: ({ row }) => `#${row.original.id}`,
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="inline-flex rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "issued",
      header: "Issued",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => currency.format(row.original.amount),
    },
  ];

  return (
    <DataTable
      columns={invoiceColumns}
      data={invoices}
      editHandler={(invoice) => {
        window.alert(`Edit invoice #${invoice.id}`);
      }}
      filter={{
        allLabel: "All statuses",
        column: "status",
        label: "Status",
        options: [
          { label: "Draft", value: "Draft" },
          { label: "Pending", value: "Pending" },
          { label: "Paid", value: "Paid" },
          { label: "Overdue", value: "Overdue" },
        ],
      }}
      removeHandler={(invoice) => {
        window.alert(`Delete invoice #${invoice.id}`);
      }}
      searchBy="customer"
      searchPlaceholder="Search customers..."
    />
  );
}
