import Dexie from 'dexie';

export const db = new Dexie('database');
db.version(1).stores({
	journals: '++id, date_time, score, magnitude, title, body',
});
