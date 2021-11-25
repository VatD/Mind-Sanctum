import { db } from '../db/db';

export default function addEntry(score, magnitude, title, body) {
	return db.journals.add({
		date_time: new Date().toString(),
		score,
		magnitude,
		title,
		body,
	});
}
