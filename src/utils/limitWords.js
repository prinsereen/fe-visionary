export const limitWords = (text, wordLimit) => {
    // Split the text into an array of words
    const words = text.split(' ');
  
    // Check if the number of words is greater than the limit
    if (words.length > wordLimit) {
      // Truncate the array to the specified word limit
      const truncatedWords = words.slice(0, wordLimit);
  
      // Join the truncated words back into a string
      const truncatedText = truncatedWords.join(' ');
  
      // Add ellipsis (...) to indicate that the text has been truncated
      return truncatedText + '...';
    }
  
    // If the number of words is within the limit, return the original text
    return text;
  };

