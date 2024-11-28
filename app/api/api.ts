// Define a function to fetch data from the API
export const fetchData = () => {
    return fetch('http://localhost:4001/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the received data
            return data; // Return the data for further use
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        });
};