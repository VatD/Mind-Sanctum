import axios from 'axios';
import addEntry from './addEntry';

const processEntry = async (title, body) => {
	const options = {
		method: 'POST',
		url: 'https://language.googleapis.com/v1beta2/documents:analyzeSentiment',
		params: { key: 'AIzaSyBNE2uNp8YqbYrlGXibusvUiuiZlVFgeR0' },
		data: {
			document: {
				type: 'PLAIN_TEXT',
				content: `${body}`,
			},
			encodingType: 'UTF8',
		},
	};

	try {
		const {
			data: {
				documentSentiment: { score, magnitude },
			},
		} = await axios.request(options);

		const id = await addEntry(score, magnitude, title, body);

		return [id, null];
	} catch (error) {
		return [null, error];
	}
};

export default processEntry;
