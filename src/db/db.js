import Dexie from 'dexie';

export const db = new Dexie('database');
db.version(1).stores({
	journals: '++id, date, score, magnitude, title, body',
});
