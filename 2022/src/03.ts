import { getInputAsText, sumReducer } from "../utils/common";
import { TCharacter } from "../utils/common.types";

async function getRucksackList() {
  const input = await getInputAsText('03');
  return input.split('\n');
}

function getItemPriority(item: TCharacter) {
  const isUpperCase = item === item.toUpperCase();
  const diff = isUpperCase ? 38 : 96;
  return item.charCodeAt(0) - diff;
}

function halfIt(line: string) {
  const { length } = line;
  const halfIndex = Math.floor(length / 2);
  const firstHalf = [...line].splice(0, halfIndex);
  const secondHalf = [...line].splice(halfIndex)
  return [firstHalf, secondHalf];
}

function getCommonItem2(line1: string[], line2: string[]) {
  let commonItem = '';
  line1.forEach(char => {
    if (line2.includes(char)) commonItem = char;
  })
  return commonItem as TCharacter | null;
}

function getCommonItem3(line1: string[], line2: string[], line3: string[]) {
  let commonItem = '';
  line1.forEach(char => {
    if (line2.includes(char)) commonItem += char;
  });
  line3.forEach(char => {
    if (commonItem.includes(char)) commonItem = char;
  })
  return commonItem as TCharacter | null;
}

async function solve01() {
  const ruckSackList = await getRucksackList();
  const commonItemList = ruckSackList.map(ruckSack => {
    const [firstHalf, secondHalf] = halfIt(ruckSack)
    const commonItem = getCommonItem2(firstHalf, secondHalf);
    return commonItem;
  })
  const commonItemPriorityList = commonItemList.map(char => {
    return char ? getItemPriority(char) : 0;
  });
  return commonItemPriorityList.reduce(sumReducer);
}

async function solve02() {
  const ruckSackList = await getRucksackList();
  const commonItemList = ruckSackList
    .map((ruckSack, index) => {
      if (index % 3) return null;
      const group = [ruckSack, ruckSackList[index + 1], ruckSackList[index + 2]];
      const commonItem = getCommonItem3(
        [...group[0]],
        [...group[1]],
        [...group[2]],
      );
      return commonItem;
    });
  const commonItemPriorityList = commonItemList.map(char => {
    return char ? getItemPriority(char) : 0;
  });
  return commonItemPriorityList.reduce(sumReducer);
}

export default {
  solve01,
  solve02
}