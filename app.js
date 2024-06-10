async function getAuthorizationToken() {
  console.log('Getting authorization token...');
  const url = 'http://localhost:3000/oauth/token';
  const clientId = 'sb-2e85ec25-d573-42ee-a70c-727970c7b01e!b291997|dar-std-trial!b40577';
  const clientSecret = '9ff1d377-2553-4fe1-99ff-a9d5284c4572$pAwEoU4KqyVTwdLL3CewsXbIBbCYoQlkJJoXhjXf4lg=';

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));

  const body = new URLSearchParams();
  body.append('grant_type', 'client_credentials');

  const options = {
    method: 'POST',
    headers: headers,
    body: body
  };

  try {
    const response = await fetch(url, options);
    console.log('Authorization response status:', response.status);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log('Authorization token received:', data);
    return data.access_token; // Adjust based on the actual response structure
  } catch (error) {
    console.error('Error fetching authorization token:', error);
    return null;
  }
}

async function fetchDatasetSchemas() {
  const statusElement = document.getElementById('upload-status');
  const responseOutput = document.getElementById('response-output');
  statusElement.textContent = 'Fetching dataset schemas...';

  const token = await getAuthorizationToken();
  if (!token) {
    statusElement.textContent = 'Error fetching authorization token';
    return;
  }

  const url = 'http://localhost:3000/datasetSchemas';
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    console.log('Dataset schemas response status:', response.status);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    console.log('Dataset schemas received:', data);
    statusElement.textContent = 'Fetched dataset schemas successfully!';
    responseOutput.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    statusElement.textContent = 'Error fetching dataset schemas: ' + error.message;
    console.error('Error fetching dataset schemas:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fetch-schemas-button').addEventListener('click', fetchDatasetSchemas);
});
