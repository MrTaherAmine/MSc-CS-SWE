export function calculateAverage(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    throw new Error('At least one score is required.');
  }

  const normalized = scores.map(Number);

  if (normalized.some(score => !Number.isFinite(score) || score < 0 || score > 100)) {
    throw new Error('Scores must be numbers between 0 and 100.');
  }

  const total = normalized.reduce((sum, score) => sum + score, 0);
  return Math.round((total / normalized.length) * 100) / 100;
}

export function getLetterGrade(average) {
  const value = Number(average);

  if (!Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error('Average must be a number between 0 and 100.');
  }

  if (value >= 90) return 'A';
  if (value >= 80) return 'B';
  if (value >= 70) return 'C';
  if (value >= 60) return 'D';
  return 'F';
}

export function getPerformanceMessage(grade) {
  const messages = {
    A: 'Excellent work!',
    B: 'Very good progress.',
    C: 'Good effort—keep improving.',
    D: 'You are close—more practice will help.',
    F: 'Keep practicing and ask for support.'
  };

  return messages[grade] ?? 'Grade unavailable.';
}
