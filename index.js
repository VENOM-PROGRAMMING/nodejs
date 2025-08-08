let stats = {
  scanari: 0,
  tranzactii_noi: 0,
  transferuri: 0,
  error_transferuri: 0,
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    for (const key in data) {
      if (stats.hasOwnProperty(key)) {
        stats[key] += data[key];
      }
    }
    res.status(200).json({ message: "Stats updated", stats });
  } else if (req.method === "GET") {
    res.status(200).json(stats);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
