import { useEffect, useState } from "react";

export default function StatsPage() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setStats({});
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stats...</p>;
  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Dashboard Stats</h1>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          maxWidth: 900,
          marginTop: 20,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0070f3", color: "white" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Address</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Scanari</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>
              Tranzactii Noi
            </th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Transferuri</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>
              Error Transferuri
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats).map(([address, data]) => (
            <tr key={address} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ border: "1px solid #ddd", padding: 8, fontWeight: "bold" }}>
                {address}
              </td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{data.scanari}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{data.tranzactii_noi}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{data.transferuri}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{data.error_transferuri}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
