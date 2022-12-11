import { getInputAsText } from '../utils/common';
import { UpperCaseCharacter } from '../utils/common.types';

type TCommand = {
  commandType: string,
  stackIndexStart: number,
  stackIndexEnd: number,
  crateCount: number
}

async function getCratesData() {
  const lines = (await getInputAsText('05')).split('\n');
  const cratesData: UpperCaseCharacter[][] = [['I', 'N', 'D', 'E', 'X', 'Z', 'E', 'R', 'O']];
  const crateWidth = 3;
  let totalStacks;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(!line.trim() || line.startsWith(' 1')) break;
    const lineItems = line.split('').filter((_, i) => (i+1) % 4);
    console.log({line, lineItems});
    if (i === 0) {
      totalStacks = lineItems.length / crateWidth;
      const stacks = Array.from({length: totalStacks}, _ => new Array());
      cratesData.push(...stacks);
    }
    lineItems.forEach((item, index) => {
      const isItemCrateId = item.trim() && ![...'[]'].includes(item);
      if (isItemCrateId) {
        const stackIndex = (index + crateWidth - 1) / crateWidth;
        cratesData[stackIndex].push(item as UpperCaseCharacter);
      }
    })
  }
  return cratesData.map(data => data.reverse());
}

async function getCommands() {
  const lines = (await getInputAsText('05')).split('\n');
  const commands: TCommand[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if(line.startsWith('move')) {
      const [commandType, _crateCount, , _stackIndexStart, ,_stackIndexEnd ] = line.split(' ');
      const command: TCommand = {
        commandType,
        crateCount: +_crateCount,
        stackIndexStart: +_stackIndexStart,
        stackIndexEnd: +_stackIndexEnd,
      }
      commands.push(command);
    }
  }
  return commands;
}

function processCommands(commands: TCommand[], cratesData: UpperCaseCharacter[][], crateMover = 9000) {
  commands.forEach(command => {
    const { commandType, crateCount, stackIndexStart, stackIndexEnd } = command;
    if (commandType === 'move') {
      let i = crateCount;
      const poppedItems: UpperCaseCharacter[] = []
      while(i) {
        poppedItems.push(cratesData[stackIndexStart].pop()!);
        i--;
      }
      if (crateMover === 9001) poppedItems.reverse();
      cratesData[stackIndexEnd].push(...poppedItems);
    }
  })
}

async function solve01() {
  const cratesData =  await getCratesData();
  const commands = await getCommands();
  processCommands(commands, cratesData);
  const topCratesInEachStack = cratesData
    .filter((_, index) => index !== 0)
    .map((stack) => {
      return stack[stack.length - 1];
    })
  return topCratesInEachStack.join('');
}

async function solve02() {
  const cratesData =  await getCratesData();
  const commands = await getCommands();
  processCommands(commands, cratesData, 9001);
  const topCratesInEachStack = cratesData
    .filter((_, index) => index !== 0)
    .map((stack) => {
      return stack[stack.length - 1];
    })
  return topCratesInEachStack.join('');
}

export default {
  solve01,
  solve02
}