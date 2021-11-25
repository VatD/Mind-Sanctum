import { db } from '../db/db';

export default function addEntry(score, magnitude, title, body) {
	return db.journals.add({
		date: new Date().toDateString(),
		score,
		magnitude,
		title,
		body,
	});
}
