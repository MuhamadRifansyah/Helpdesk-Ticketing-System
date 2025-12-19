import "./globals.css";
import "./components/Dashboard.css"; // ✅ DI SINI SAJA

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
