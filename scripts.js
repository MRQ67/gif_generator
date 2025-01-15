// API Endpoints and Keys
const ZEN_QUOTES_URL = "https://zenquotes.io/api/random";
const GIPHY_API_KEY = "hvE8EfwlGB35uQ3m0uNWLqO3PkmnMQ7i"; // Replace with your Giphy API key
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs/search";

// Get HTML elements
const speechBox = document.getElementById("speech-box");
const gifBox = document.getElementById("gif-box");
const generateBtn = document.getElementById("generate-btn");

// Fetch a random quote from ZenQuotes
async function fetchQuote() {
  try {
      const response = await fetch("https://quotes-api-8qjm.onrender.com/quote");
      if (!response.ok) {
          throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      const quote = data[0].q;
      const author = data[0].a;
      return `${quote} — ${author}`;
  } catch (error) {
      console.error("Error fetching quote:", error);
      return "Could not fetch a quote at the moment. Please try again later.";
  }
}


// Fetch a random GIF from Giphy based on a keyword
async function fetchGif(keyword) { // Replace with your Giphy API key
  try {
    const response = await fetch(
      `${GIPHY_BASE_URL}?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
        keyword
      )}&limit=1&rating=g`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.data.length > 0) {
      return data.data[0].images.original.url;
    } else {
      throw new Error("No GIF found for the keyword.");
    }
  } catch (error) {
    console.error("Failed to fetch the GIF:", error);
    return "";
  }
}

// Update the motivational speech and GIF
async function updateMotivation() {
  // Fetch quote and GIF in parallel
  const quotePromise = fetchQuote();
  const gifPromise = fetchGif("motivation"); // Change keyword as needed

  const [quote, gifUrl] = await Promise.all([quotePromise, gifPromise]);

  // Update the quote box
  speechBox.textContent = `${quote.text} — ${quote.author}`;
  speechBox.classList.add("fade-in");

  // Update the GIF
  if (gifUrl) {
    gifBox.src = gifUrl;
    gifBox.style.display = "block";
    gifBox.classList.add("fade-in");
  } else {
    gifBox.style.display = "none";
  }

  // Remove fade-in animation after it plays
  setTimeout(() => {
    speechBox.classList.remove("fade-in");
    gifBox.classList.remove("fade-in");
  }, 500);
}

// Add event listeners
generateBtn.addEventListener("click", updateMotivation);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateMotivation();
  }
});

