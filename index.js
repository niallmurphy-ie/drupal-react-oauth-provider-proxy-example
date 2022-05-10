// Express app that runs on port 789 and listens to a json endpoint "/oauth"
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
// Parse body
app.use(bodyParser.json());
app.use(cors());

app.use('/oauth', async (req, res) => {
	const { username, password } = req.body;

	// These could be environmental variables and there could be multiple endpoints.
	const client_id = '5e6c8415-9a1f-4d8b-9249-72b9dc6f7494';
	const client_secret = 'client_secret_simple_oauth';
	const grant_type = 'password';
	const scope = 'consumer';

	const formData = new URLSearchParams();
	formData.append('grant_type', grant_type);
	formData.append('client_id', client_id);
	formData.append('client_secret', client_secret);
	formData.append('scope', scope);
	formData.append('username', username);
	formData.append('password', password);

	try {
		const response = await axios.post(
			'https://d9-testing.niallmurphy.dev/oauth/token',
			formData
		);
		res.send(response.data);
	} catch (error) {
		res.status(500).send(error.response.data);
	}
});

// Start app
app.listen(789, () => {
	console.log('Listening on port 789');
});
