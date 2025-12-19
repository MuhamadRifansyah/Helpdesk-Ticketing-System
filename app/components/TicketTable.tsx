import StatusBadge from "./StatusBadge";

type Ticket = {
  id: number;
  title: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
};

export default function TicketTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <table className="w-full">
        <thead className="border-b text-sm text-slate-500">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="text-left">Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr
              key={t.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="p-4">#{t.id}</td>
              <td>{t.title}</td>
              <td>
                <StatusBadge status={t.status} />
              </td>
              <td>{t.priority}</td>
              <td>{t.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
