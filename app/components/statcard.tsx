export default function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        minWidth: 220,
      }}
    >
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#475569",
          marginBottom: 6,
        }}
      >
        {title}
      </p>

      <p
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: color, // 🔥 WARNA ANGKA
        }}
      >
        {value}
      </p>
    </div>
  );
}
