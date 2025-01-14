// API Endpoints and Keys
const ZEN_QUOTES_URL = "https://zenquotes.io/api/random";
const GIPHY_API_KEY = process.env.APP_API_KEY; // Replace with your Giphy API key
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs/search";

// Get HTML elements
const speechBox = document.getElementById("speech-box");
const gifBox = document.getElementById("gif-box");
const generateBtn = document.getElementById("generate-btn");

// Function to fetch a random quote
async function fetchQuote() {
  try {
    const response = await fetch(ZEN_QUOTES_URL);
    const data = await response.json();
    return data[0]?.q || "Stay motivated!"; // Default quote if none is returned
  } catch (error) {
    console.error("Error fetching quote:", error);
    return "Stay motivated!"; // Default quote in case of an error
  }
}

// Function to fetch a GIF based on a keyword
async function fetchGif(keyword) {
  try {
    const response = await fetch(
      `${GIPHY_BASE_URL}?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=1`
    );
    const data = await response.json();
    return data?.data[0]?.images?.original?.url || ""; // Default empty string if no GIF found
  } catch (error) {
    console.error("Error fetching GIF:", error);
    return ""; // Default empty string in case of an error
  }
}

// Function to update the motivation
async function updateMotivation() {
  // Fetch the random quote
  const quote = await fetchQuote();
  speechBox.textContent = quote;
  speechBox.classList.add("fade-in");

  // Fetch the GIF based on the first word of the quote
  const keyword = quote.split(" ")[0]; // Use the first word as the keyword
  const gifUrl = await fetchGif(keyword);
  if (gifUrl) {
    gifBox.src = gifUrl;
    gifBox.style.display = "block";
    gifBox.classList.add("fade-in");
  } else {
    gifBox.style.display = "none"; // Hide the GIF if not found
  }

  // Remove animation classes after a delay
  setTimeout(() => {
    speechBox.classList.remove("fade-in");
    gifBox.classList.remove("fade-in");
  }, 500);
}

// Add event listener to the button
generateBtn.addEventListener("click", updateMotivation);

// Event listener for the Enter key
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateMotivation();
  }
});
