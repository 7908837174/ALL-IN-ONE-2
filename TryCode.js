// Fixed callback function - now actually calls the callback
function fetchData(callBack){
    setTimeout(() => {
        console.log("Data fetched successfully");
        if (callBack && typeof callBack === 'function') {
            callBack("Sample data");
        }
    }, 3000);
}

// Fixed promise with proper variable definitions
const promise = new Promise((resolve, reject) => {
    const success = true; // Define success variable
    const value = "Promise resolved successfully"; // Define value
    const error = new Error("Promise rejected"); // Define error

    if(success){
        resolve(value);
    } else {
        reject(error);
    }
});

// Fixed and uncommented getData promise
const getData = new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        if (success) {
            resolve("Data retrieved successfully");
        } else {
            reject(new Error("Failed to get data"));
        }
    }, 2000);
});

// Fixed promise chain with proper handling
getData
.then(response => {
    console.log(response);
    return "Next task completed";
})
.then(next => {
    console.log(next);
    return "Final task";
})
.catch(error => {
    console.error("Error in promise chain:", error);
});

// Fixed fetch with proper URL and error handling
fetch('https://jsonplaceholder.typicode.com/users')
.then(res => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
})
.then(users => console.log("Users:", users))
.catch(error => console.error("Fetch error:", error));

// Fixed async function with proper error handling
async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Async data:", data);
        return data;
    } catch (error) {
        console.error("Async fetch error:", error);
        throw error;
    }
}

// Example usage of the fixed functions
console.log("Starting demo...");

// Test callback function
fetchData((data) => {
    console.log("Callback received:", data);
});

// Test promise
promise
.then(result => console.log("Promise result:", result))
.catch(error => console.error("Promise error:", error));

// Test async function
fetchData()
.then(data => console.log("Async function completed with data length:", data.length))
.catch(error => console.error("Async function failed:", error));