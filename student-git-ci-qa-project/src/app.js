import { calculateAverage, getLetterGrade, getPerformanceMessage } from './gradeCalculator.js';

const form = document.querySelector('#score-form');
const input = document.querySelector('#scores');
const result = document.querySelector('#result');

form.addEventListener('submit', event => {
  event.preventDefault();

  try {
    const scores = input.value
      .split(',')
      .map(value => value.trim())
      .filter(Boolean);

    const average = calculateAverage(scores);
    const grade = getLetterGrade(average);
    const message = getPerformanceMessage(grade);

    result.innerHTML = `
      <strong>Average:</strong> ${average}%<br>
      <strong>Grade:</strong> ${grade}<br>
      <span>${message}</span>
    `;
    result.className = 'result success';
  } catch (error) {
    result.textContent = error.message;
    result.className = 'result error';
  }
});
