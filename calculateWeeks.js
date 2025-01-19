let currentDay = 3;
let weeks = 0;


while (currentDay < 365) {
  currentDay += 7;
  weeks++;
}

console.log(`Total days: ${currentDay}`);
console.log(`Total weeks: ${weeks}`);