// GET HTML Elements as Objects
const shortenBtn = document.getElementById("shortenBtn");
const outputArea = document.getElementById("outputArea");
const longURLInput = document.getElementById("longURLInput");

// Create Copy Output Link Button Object
const copyUrlBtn = document.createElement("button");
copyUrlBtn.id = "copyUrlBtn";

// Create Feedback Element for Copy Output Link Action
const copyURLFeedback = document.createElement("p");
copyURLFeedback.classList.add("output");
copyURLFeedback.textContent = "Link Copied";

// Create Feedback Element for Invalid URL Input
const invalidURLFeedback = document.createElement("p");
invalidURLFeedback.classList.add("output");
invalidURLFeedback.textContent = "Invalid URL Provided!";

const apiEndpoint = "http://localhost:3000/petite-url/";
let shortURL = "";

// FUNCTIONS
async function outputShortURL() {
  const longURL = { long_url: longURLInput.value.trim() };

  // Make HTTP Request to server
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(longURL),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);

    shortURL = "http://localhost:3000/petite-url/" + data.shortCode;

    const outputDiv = document.createElement("div");
    outputDiv.classList.add("output");
    outputDiv.textContent = "Short URL:";

    // Short URL Link
    const shortLink = document.createElement("a");
    shortLink.textContent = shortURL;
    shortLink.href = shortURL;
    shortLink.target = "_blank";

    outputDiv.append(shortLink);
    outputDiv.append(copyUrlBtn);

    outputArea.innerHTML = "";
    outputArea.append(outputDiv);
  } catch (error) {
    console.error("Error caught:", error);
    outputArea.innerHTML = "";
    outputArea.append(invalidURLFeedback);
  }
}

function copyShortURL() {
  navigator.clipboard.writeText(shortURL); //copy to clipboard
  outputArea.append(copyURLFeedback);
}

// EVENTS
shortenBtn.addEventListener("click", outputShortURL);
copyUrlBtn.addEventListener("click", copyShortURL);
