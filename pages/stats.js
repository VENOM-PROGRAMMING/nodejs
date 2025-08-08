export default function StatsPage() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api");
        if (!res.ok) {
          // Dacă statusul nu este 200 OK, setează eroare
          setError(true);
          setStats({});
        } else {
          const data = await res.json();
          // Dacă datele sunt goale (fără proprietăți), considerăm 404
          if (Object.keys(data).length === 0) {
            setError(true);
          } else {
            setStats(data);
            setError(false);
          }
        }
      } catch {
        setError(true);
        setStats({});
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;

  if (error) return <p style={{ color: "red" }}>404 - Nu s-au găsit date</p>;

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
            <th style={{ border: "1px solid #ddd", padding: 8 }} scope="col">Address</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }} scope="col">Scanari</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }} scope="col">
              Tranzactii Noi
            </th>
            <th style={{ border: "1px solid #ddd", padding: 8 }} scope="col">Transferuri</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }} scope="col">
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
