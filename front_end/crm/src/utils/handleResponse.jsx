export default function handleResponse(res) {
	if (res.ok) { return res.json() }
	else {
		let error = new Error(res.statusText);
		error.response = res;
		throw error;
	}
}