import { sumReducer, sortCompareFn } from '../utils/common'

async function getCalorieList() {
  const input = await fetch('../inputs/01.txt').then(r => r.text());
  const calorieList = input.split('\n');
  return calorieList;
}

const solve01 = async () => {
  const calorieList = await getCalorieList();
  let maxCalorie = 0;
  let sumCalorie = 0;
  calorieList.forEach(calorie => {
    if (calorie === '') {
      maxCalorie = sumCalorie > maxCalorie ? sumCalorie : maxCalorie;
      sumCalorie = 0;
    } else {
      sumCalorie += Number(calorie);
    }
  })
  return maxCalorie;
}

const solve02 = async () => {
  const calorieList = await getCalorieList();
  let bag: number[] = [];
  let elfBags: number[][] = [];
  calorieList.forEach((calorie, index) => {
    if (calorie === '' || index === calorieList.length - 1) {
      elfBags = [...elfBags, [...bag]]
      bag = []
    } else {
      bag.push(Number(calorie))
    }
  });

  const top3ElfBags = elfBags.map(bag => {
    const sum = bag.reduce(sumReducer, 0);
    return sum;
  }).sort(sortCompareFn).splice(0, 3);

  const sumOfTop3ElfBags = top3ElfBags.reduce(sumReducer, 0);
  return sumOfTop3ElfBags;
}

export default {
  solve01,
  solve02
}