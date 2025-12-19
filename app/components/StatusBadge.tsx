type Status = "Open" | "In Progress" | "Resolved" | "Closed";

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  const base =
    "px-2 py-1 text-xs font-medium rounded-full";

  const styles: Record<Status, string> = {
    Open: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-slate-200 text-slate-700",
  };

  return (
    <span className={`${base} ${styles[status]}`}>
      {status}
    </span>
  );
}
