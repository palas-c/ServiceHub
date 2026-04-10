export const calculateFraudScore = (reviewText, rating) => {
    let score = 0;
  
    // Repetition check
    const words = reviewText.split(" ");
    const uniqueWords = new Set(words);
    if (uniqueWords.size < words.length / 2) score += 0.3;
  
    // Extreme rating
    if (rating === 1 || rating === 5) score += 0.2;
  
    return score;
  };