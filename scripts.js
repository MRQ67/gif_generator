// Array of speeches and their associated GIFs
const data = [
    {
      speech: "The harder you work for something, the greater you’ll feel when you achieve it.",
      gif: "gifs/just_do_it.gif"
    },
    {
      speech: "“End is not the end if fact E.N.D. Means 'Efforts Never Dies' “. – Dr. A.P.J. Abdul Kalam",
      gif: "gifs/no_way.gif"
    },
    {
      speech: "Success doesn’t just find you. You have to go out and get it.",
      gif: "https://media.giphy.com/media/1lweXxLwVT1tFu0bFj/giphy.gif"
    },
    {
      speech: "Don’t stop until you’re proud.",
      gif: "https://media.giphy.com/media/l0HlJb3m6p4rGoxGw/giphy.gif"
    },
    {
      speech: "It’s going to be hard, but hard does not mean impossible.",
      gif: "https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif"
    },
    {
      speech: "Dream it. Believe it. Build it.",
      gif: "https://media.giphy.com/media/l41lVSXLS3tcQhsx6/giphy.gif"
    }
  ];
  
  // Get HTML elements
  const speechBox = document.getElementById("speech-box");
  const gifBox = document.getElementById("gif-box");
  const generateBtn = document.getElementById("generate-btn");
  
  // Add event listener to the button
  function updateMotivation() {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * data.length);
  
    // Update the speech and the GIF
    speechBox.textContent = data[randomIndex].speech;
    speechBox.classList.add("fade-in");

    gifBox.src = data[randomIndex].gif;
    gifBox.classList.add("fade-in");
  
    // Ensure the GIF is displayed
    gifBox.style.display = "block";

    setTimeout(() => {
      speechBox.classList.remove("fade-in");
      gifBox.classList.remove("fade-in");
    }, 500);
  };

  generateBtn.addEventListener("click", updateMotivation);

  // Event listener for the Enter key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      updateMotivation();
    } 
  });
  