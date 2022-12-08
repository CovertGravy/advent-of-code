import { getInputAsText } from '../utils/common'

const Rps = ['rock', 'paper', 'scissor'] as const;
const RpsCodesForElf = ['A', 'B', 'C'] as const;
const RpsCodesForYou = ['X', 'Y', 'Z'] as const;
type TRps = typeof Rps[number];
type TRpsCodeElf = typeof RpsCodesForElf[number];
type TRpsCodeYou = typeof RpsCodesForYou[number];
type TRpsValue = 1 | 2 | 3

const RPSMap = new Map<TRps, [TRpsCodeElf, TRpsCodeYou, TRpsValue]>([
  ['rock', ['A', 'X', 1]],
  ['paper', ['B', 'Y', 2]],
  ['scissor', ['C', 'Z', 3]]
])

const secretGuide = new Map<TRpsCodeYou, 0 | 3 | 6>([
  ['X', 0],
  ['Y', 3],
  ['Z', 6]
])

function isCodeElf(code: TRpsCodeElf | TRpsCodeYou): code is TRpsCodeElf {
  return ([...RpsCodesForElf] as string[]).includes(code)
} 

function getRpsType(pick: TRpsCodeElf | TRpsCodeYou) {
  const index = isCodeElf(pick) ? 0 : 1;
  return [...RPSMap.entries()].filter(([, rpsValue]) => {
    return rpsValue[index] === pick;
  })[0][0];
}

function getRpsCode(pick: TRps, type = 1) {
  return [...RPSMap.entries()].filter(([rps]) => {
    return rps === pick;
  })[0][1][type];
}

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

function getGuidePick(yourPick: TRpsCodeYou, elfPick: TRpsCodeElf) {
  const elfPickRps = getRpsType(elfPick);
  const targetResultValue = secretGuide.get(yourPick);
  let targetPick = yourPick;
  Rps.forEach(_rps => {
    const { value } = getRpsWinner(elfPickRps, _rps);
    if (value === targetResultValue) {
      targetPick = getRpsCode(_rps, 1) as TRpsCodeYou;
    }
  })
  return targetPick;
}

function getResult(elfPick: TRpsCodeElf, yourPick: TRpsCodeYou, guide = false) {
  const _yourPick = guide ? getGuidePick(yourPick, elfPick) : yourPick;
  const result = {
    elfPick,
    yourPick: _yourPick,
    elfPickRps: 'rock' as TRps,
    yourPickRps: 'rock' as TRps,
    pickValue: 0,
    gameValue: 0,
    winner: null as TRps | null
  };

  [...RPSMap.entries()].forEach(val => {
    let [rpsCodeElf, rpsCodeYou, rpsCodeValue] = val[1];
    
    if (rpsCodeYou === _yourPick) {
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
  console.table({result:{originalPick: yourPick, ...result}})
  return result;
}

async function getRpsList() {
  const input = await getInputAsText('02');
  return input.split('\n');
}

async function solve01(guide = false) {
  const RpsList = await getRpsList() as `${TRpsCodeElf} ${TRpsCodeYou}`[];
  const results = RpsList.map(match => {
    const [elfPick, yourPick] = match.split(' ') as [TRpsCodeElf, TRpsCodeYou];
    return getResult(elfPick, yourPick, guide);
  })
  return results.reduce((acc, { gameValue, pickValue }) => {
    return acc + gameValue + pickValue;
  }, 0)
}

function solve02() {
  return solve01(true)
}

export default {
  solve01,
  solve02
}