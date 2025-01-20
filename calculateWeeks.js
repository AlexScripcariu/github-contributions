let currentDay = 3;
let weeks = 0;


while (currentDay < 365) {
  currentDay += 7;
  weeks++;
}

// console.log(`Total days: ${currentDay}`);
// console.log(`Total weeks: ${weeks}`);


let date = new Date();

date.setFullYear(date.getFullYear(), 0, 1);

for (let i = 0; i < 365; i++) {
  let formattedMonth = date.toLocaleString("en-GB", {
    month: "short"
  })
  console.log(`${formattedMonth}-${date.getDate()}`.toLocaleLowerCase());
  date.setDate(date.getDate() + 1);
}

