import { getInputAsText } from '../utils/common'

const RpsCodesForElf = ['A', 'B', 'C'] as const;
const RpsCodesForYou = ['X', 'Y', 'Z'] as const;
type TRps = 'rock' | 'paper' | 'scissor';
type TRpsCodeElf = typeof RpsCodesForElf[number];
type TRpsCodeYou = typeof RpsCodesForYou[number];
type TRpsValue = 1 | 2 | 3

const RPSMap = new Map<TRps, [TRpsCodeElf, TRpsCodeYou, TRpsValue]>([
  ['rock', ['A', 'X', 1]],
  ['paper', ['B', 'Y', 2]],
  ['scissor', ['C', 'Z', 3]]
])



function getRpsWinner(elf: TRps, you: TRps) {
  if (elf === you) return { winner: null, value: 3 };
  if (you === 'rock') {
    if (elf === 'paper') return { winner: elf, value: 0 };
    return { winner: you, value: 6 };
  } else if (you === 'paper') {
    if (elf === 'scissor') return { winner: elf, value: 0 };
    return { winner: you, value: 6 };
  } else {
    if (elf === 'rock') return { winner: elf, value: 0 };
    return { winner: you, value: 6 };
  } 
}

function getResult(elfPick: TRpsCodeElf, yourPick: TRpsCodeYou) {
  const result = {
    elfPick,
    yourPick,
    elfPickRps: 'rock' as TRps,
    yourPickRps: 'rock' as TRps,
    pickValue: 0,
    gameValue: 0,
    winner: null as TRps | null
  };
  [...RPSMap.entries()].forEach(val => {
    const [rpsCodeElf, rpsCodeYou, rpsCodeValue] = val[1];
    if (rpsCodeYou === yourPick) {
      result.pickValue = rpsCodeValue;
      result.yourPickRps = val[0];
    }

    if (rpsCodeElf === elfPick) {
      result.elfPickRps = val[0]
    }
  })
  const { winner, value } = getRpsWinner(result.elfPickRps, result.yourPickRps);
  result.winner = winner;
  result.gameValue = value;
  return result;
}

async function getRpsList() {
  const input = await getInputAsText('02');
  return input.split('\n');
}

async function solve01() {
  const RpsList = await getRpsList() as `${TRpsCodeElf} ${TRpsCodeYou}`[];
  const results = RpsList.map(match => {
    const [elfPick, yourPick] = match.split(' ') as [TRpsCodeElf, TRpsCodeYou];
    return getResult(elfPick, yourPick);
  })
  return results.reduce((acc, { gameValue, pickValue }) => {
    return acc + gameValue + pickValue;
  }, 0)
}
async function solve02() {}

export default {
  solve01,
  solve02
}