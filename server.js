// Express mit ES6 import syntax importieren
import express from "express";

// cors importieren
import cors from "cors";

// Express App erstellen
const app = express();

// cors middleware hinzufügen
app.use(cors()); // ohne spezifische Konfiguration heißt das, dass alle Anfragen von allen Quellen erlaubt sind

// express.json middleware hinzufügen
app.use(express.json());

// Port definieren
const PORT = 3002;

// GET Route für die Startseite (http://localhost:3002/)

const responseFunction = (req, res) => {
  res.json({ message: "Hello Server!" });
};

app.get("/", responseFunction);

// POST Route
app.post("/api/users", (req, res) => {
  const userData = req.body;
  console.log('Received data:', userData);

  res.status(201).json({ message: 'User created successfully', user: userData });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port http://localhost:${PORT}`);
});
