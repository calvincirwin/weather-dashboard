import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HISTORY_FILE = path.join(__dirname, '../../db/db.json');

// ✅ Get search history
export const getHistory = async () => {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// ✅ Save a city search
export const saveSearch = async (city: string) => {
  try {
    let history = await getHistory();
    const newEntry = { id: uuidv4(), city };
    history.push(newEntry);
    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
  } catch (err) {
    console.error("Error saving search:", err);
  }
};

// ✅ Delete a city from history
export const deleteSearch = async (id: string) => {
  try {
    let history = await getHistory();
history = history.filter((entry: { id: string }) => entry.id !== id);
    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
  } catch (err) {
    console.error("Error deleting search:", err);
  }
};
