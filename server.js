// Express mit ES6 import syntax importieren
import express from "express";

// cors importieren
import cors from "cors";

// importieren fs (file system) Modul
import fs from "fs";

// importieren nanoid Modul
import { nanoid } from "nanoid";

// fs.writeFileSync("test.txt", "Hello World!");

// Variablen für Dateiname und initialen Datenwert definieren
const dateiName = "daten.json";
const initialData = { users: [] };

const nachrichtFn = () => {
  console.log("Daten erfolgreich geschrieben")
}

// Funktion um Daten in einer Datei zu lesen
const datenLesen = (dateiName) => {
  try {
    if(fs.existsSync(dateiName)) {
      const data = fs.readFileSync(dateiName);
      return JSON.parse(data);
    } else {
      return initialData;
    }
  } catch (error) {
    console.error("Fehler beim Lesen der Datei:", error);
  }
}

// Funktion um Daten in einer Datei zu schreiben
const datenSchreiben = (dateiName, neuDaten, nachrichtFn) => {
  try {
    // Lese die Datei
    const alteDaten = datenLesen(dateiName);

    if(Array.isArray(alteDaten.users)){
      alteDaten.users.push(neuDaten);
    } else {
      alteDaten.users = [neuDaten];
    }

    // Schreibe die Daten in die Datei
    fs.writeFileSync(dateiName, JSON.stringify(alteDaten, null, 2));
    nachrichtFn();

  } catch (error) {
    // Fehler ausgeben
    console.error("Fehler beim Schreiben der Datei:", error);
  }
}


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
  const neuDaten = { id: nanoid(), ...userData };
  // Daten in Datei schreiben
  datenSchreiben(dateiName, neuDaten, nachrichtFn);
  console.log('Received data:', neuDaten);

  res.json({ message: 'User created successfully', user: userData });
});

// GET Route für alle Benutzer
app.get("/api/users", (req, res) => {
  const data = datenLesen(dateiName);
  res.json(data);
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port http://localhost:${PORT}`);
});
