import Dexie from 'dexie';

export const db = new Dexie('database');
db.version(1).stores({
  journal: "++id ,date_time, score , magnitude , title, body", 
});