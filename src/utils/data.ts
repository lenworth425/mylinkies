export const userData = [
    {
      username: "techNinja42",
      email: "tech.ninja@example.com",
      thoughts: [
        "The best code is no code at all.",
        "Coffee is just bean soup.",
        "Why do programmers prefer dark mode? Because light attracts bugs!"
      ]
    },
    {
      username: "cosmicCoder",
      email: "cosmic.coder@example.com",
      thoughts: [
        "Space: the final debugging frontier",
        "Time is an illusion. Lunchtime doubly so.",
        "I'm not lazy, I'm in energy-saving mode."
      ]
    },
    {
      username: "pixelPirate",
      email: "pixel.pirate@example.com",
      thoughts: [
        "Design is not just what it looks like, design is how it works.",
        "Why did the web developer go broke? Because he lost his domain!",
        "Life is short, use Python."
      ]
    },
    {
      username: "dataWhisperer",
      email: "data.whisperer@example.com",
      thoughts: [
        "In a world of data, be a storyteller.",
        "Big data is like teenage sex: everyone talks about it, nobody really knows how to do it.",
        "Data is the new bacon."
      ]
    },
    {
      username: "quantumQuester",
      email: "quantum.quester@example.com",
      thoughts: [
        "Schrödinger's cat walks into a bar. And doesn't.",
        "Why do programmers always mix up Halloween and Christmas? Because Oct 31 = Dec 25!",
        "The cloud is just someone else's computer."
      ]
    },
    {
      username: "byteBouncer",
      email: "byte.bouncer@example.com",
      thoughts: [
        "To be or not to be, that is the boolean.",
        "There are 10 types of people in the world: those who understand binary and those who don't.",
        "Keep calm and code on."
      ]
    },
    {
      username: "algorithmAce",
      email: "algorithm.ace@example.com",
      thoughts: [
        "Life is like a recursive function - it's complicated until you find the base case.",
        "The best thing about a boolean is even if you're wrong, you're only off by a bit.",
        "Debugging: Removing the bugs you added while fixing the bugs you noticed."
      ]
    },
    {
      username: "synthSage",
      email: "synth.sage@example.com",
      thoughts: [
        "Music is the space between the notes.",
        "The only bad workout is the one that didn't happen.",
        "Dreams don't work unless you do."
      ]
    },
    {
      username: "webWizard",
      email: "web.wizard@example.com",
      thoughts: [
        "CSS is awesome... when it works.",
        "404: Sleep not found.",
        "There's no place like 127.0.0.1"
      ]
    },
    {
      username: "cryptoCrafter",
      email: "crypto.crafter@example.com",
      thoughts: [
        "Trust the hash, not the cache.",
        "Blockchain is just a very slow database.",
        "Mining is not just for diamonds anymore."
      ]
    }
  ];
  
  export const reactionData = [
    "This is brilliant! 🌟",
    "Couldn't agree more! 👍",
    "You've got a point there 🤔",
    "Mind = Blown 🤯",
    "This deserves more attention 📢",
    "Thanks for sharing! 🙏",
    "Interesting perspective 🔍",
    "Made my day! 😊",
    "This is the way 🚀",
    "Revolutionary thinking! 💡",
    "Well said! 👏",
    "Can't stop thinking about this 🤓",
    "Pure genius! ⭐",
    "You're onto something here 🎯",
    "This changed my perspective 🌅"
  ];
  
  // Helper function to get random items from an array
  export const getRandomItems = (array: any[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  // Helper function to get a random reaction
  export const getRandomReaction = () => {
    return reactionData[Math.floor(Math.random() * reactionData.length)];
  };