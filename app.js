document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchQuery = document.getElementById("searchQuery");
    const searchResults = document.getElementById("searchResults");
    const voiceSearchButton = document.getElementById("voiceSearch");
    const uploadForm = document.getElementById("uploadForm");
    const photoInput = document.getElementById("photoInput");
    const customLabels = document.getElementById("customLabels");
    const uploadButton = document.getElementById("uploadButton");

    // Function to initialize AWS SDK and create the API Gateway client
    function initializeApiClient() {
        // Replace with your AWS credentials and API details
        return apigClientFactory.newClient({
            region: 'us-east-1',
            apiKey: 'ocr39AD7cu5mmvnuQjJ0namFn71sOuUa5h9Hfd0g',
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        });
    }

    // Initialize the AWS API Gateway client
    const apiClient = initializeApiClient();

   // Function to handle the file upload using the API Gateway client
    function handleFileUpload(apiClient) {
        uploadButton.addEventListener('click', () => {
            const customLabelsValue = customLabels.value;

            // Make sure a file is selected
            if (!photoInput.files[0]) {
                alert('Please select a file to upload.');
                return;
            }

            const reader = new FileReader();

            reader.onload = function () {
                const base64Image = reader.result.split(',')[1]; // Extracting the base64 string

                console.log(base64Image)

                // Make a PUT request to your API Gateway endpoint for file upload
                apiClient.uploadBucketKeyPut(
                    {
                        key: photoInput.files[0].name,
                        bucket: "saguirregaray.b2",
                        'x-amz-meta-CustomLabels': customLabelsValue,
                        'Content-Type':  'text/base64',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Origin-Headers': '*',
                        'Access-Control-Allow-Methods': '*'
                    },
                    base64Image, // Pass the base64 string instead of FormData
                    {}
                )
                .then(function (response) {
                    if (response.status === 200) {
                        alert('Upload successful!');
                    } else {
                        alert('Upload failed. Please try again.');
                    }
                })
                .catch(function (error) {
                    console.error('An error occurred:', error);
                    console.log(error)
                    alert('Upload failed. Please try again.');
                });
            };

            // Read the file as a data URL and trigger the onload event
            reader.readAsDataURL(photoInput.files[0]);
        });
    }


    // Event listener for search form submission
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const query = searchQuery.value;

        // Clear existing images before adding new ones
        searchResults.innerHTML = "";

        // Make a GET request to the /search endpoint
        try {
            const response = await fetch(`/v1/search?q=${query}`);
            if (response.ok) {
                const data = await response.json();

                if (data && data.results && data.results.length > 0) {
                    const resultGrid = document.createElement("div");
                    resultGrid.classList.add("result-grid");

                    data.results.forEach((result) => {
                        const img = document.createElement("img");
                        img.src = result.url;
                        resultGrid.appendChild(img);
                    });

                    searchResults.appendChild(resultGrid);
                } else {
                    alert("No results found.");
                }
            } else {
                alert("Search request failed. Please try again.");

                // Display 5 default images when the search request fails
                const resultGrid = document.createElement("div");
                resultGrid.classList.add("result-grid");

                for (let i = 1; i <= 5; i++) {
                    const img = document.createElement("img");
                    img.src = `./images/dog${i}.png`;
                    resultGrid.appendChild(img);
                }

                searchResults.appendChild(resultGrid);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Search request failed. Please try again.");

            // Display 5 default images when the search request fails
            const resultGrid = document.createElement("div");
            resultGrid.classList.add("result-grid");

            for (let i = 1; i <= 5; i++) {
                const img = document.createElement("img");
                img.src = `./images/dog${i}.png`;
                resultGrid.appendChild(img);
            }

            searchResults.appendChild(resultGrid);
        }
    });

    // Voice Search
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();

        voiceSearchButton.addEventListener('click', () => {
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchQuery.value = transcript;
        };
    }

    // Call the function to handle file upload using the API Gateway client
    handleFileUpload(apiClient);
});

// Reference your CSS file
const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "styles.css";
document.head.appendChild(link);
