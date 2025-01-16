// API Endpoints and Keys
const RENDER_API_URL = "https://quotes-api-8qjm.onrender.com/quote"
const GIPHY_API_KEY = "hvE8EfwlGB35uQ3m0uNWLqO3PkmnMQ7i"; // Replace with your Giphy API key
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs/search";
const loading_gif = "https://media.giphy.com/media/4EFt4UAegpqTy3nVce/giphy.gif"

// Get HTML elements
const speechBox = document.getElementById("speech-box");
const gifBox = document.getElementById("gif-box");
const generateBtn = document.getElementById("generate-btn");

// Fetch a random quote from ZenQuotes
async function fetchQuote() {
  try {
      const response = await fetch(RENDER_API_URL);
      if (!response.ok) {
          throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      const quote = data.quote;
    const author = data.author;
    return { quote, author };
  } catch (error) {
      console.error("Error fetching quote:", error);
      return { quote: "Could not fetch a quote at the moment.", author: "" };
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
  try {
    // Show loading indicators
    speechBox.textContent = "Loading quote...";
    gifBox.src = loading_gif; 
    gifBox.style.display = "block";
    gifBox.classList.add("fade-in");

    // Fetch quote
    const quoteData = await fetchQuote();

    // Extract a keyword from the quote
    const words = quoteData.quote.split(" ");
    const stopwords = ["the", "and", "is", "of", "a", "to", "in", "for", "on", "with", "as", "by", "an"];
    const meaningfulWords = words.filter(word => !stopwords.includes(word.toLowerCase()));
    const keyword = meaningfulWords.length > 0
      ? meaningfulWords[Math.floor(Math.random() * meaningfulWords.length)]
      : words[Math.floor(Math.random() * words.length)];

    // Fetch GIF using the extracted keyword
    const gifUrl = await fetchGif(keyword);

    // Update the quote box
    speechBox.textContent = `${quoteData.quote} — ${quoteData.author}`;
    speechBox.classList.add("fade-in");

    // Update the GIF
    if (gifUrl) {
      gifBox.src = gifUrl;
    } else {
      gifBox.style.display = "none";
    }

    // Remove fade-in animation after it plays
    setTimeout(() => {
      speechBox.classList.remove("fade-in");
      gifBox.classList.remove("fade-in");
    }, 500);
  } catch (error) {
    console.error("Error updating motivation:", error);
    speechBox.textContent = "Could not fetch a quote or GIF. Please try again later.";
    gifBox.style.display = "none";
  }
}




// Add event listeners
generateBtn.addEventListener("click", updateMotivation);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateMotivation();
  }
});

