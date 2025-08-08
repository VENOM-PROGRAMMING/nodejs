let stats = {}; // global object

const defaultStats = () => ({
  scanari: 0,
  tranzactii_noi: 0,
  transferuri: 0,
  error_transferuri: 0,
});

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    for (const address in data) {
      if (!stats[address]) {
        stats[address] = defaultStats();
      }
      const updates = data[address];

      for (const key in updates) {
        if (stats[address].hasOwnProperty(key)) {
          stats[address][key] += updates[key];
        }
      }
    }

    res.status(200).json({ message: "Stats updated", stats });
  } else if (req.method === "GET") {
    res.status(200).json(stats);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
