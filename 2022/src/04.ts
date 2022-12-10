import { getInputAsText } from "../utils/common";

async function getAssignmentPairList() {
  const input = await getInputAsText('04');
  return input.split('\n');
}

async function solve01() {
  const assignmentPairList = await getAssignmentPairList();
  let fullyContainedPairCount = 0;
  assignmentPairList.forEach(pairs => {
    const [pair1, pair2] = pairs.split(',');
    let [
      [pair1Left, pair1Right],
      [pair2Left, pair2Right]
    ] = [pair1, pair2].map(pair => pair.split('-').map(Number));
    if (pair1Left - pair2Left > 0) {
      [pair1Left, pair2Left] = [pair2Left, pair1Left];
      [pair1Right, pair2Right] = [pair2Right, pair1Right];
    } else if (pair1Left - pair2Left === 0) {
      if (pair1Right - pair2Right < 0) {
        [pair1Right, pair2Right] = [pair2Right, pair1Right]
      }
    }
    if (pair1Right >= pair2Right) {
      fullyContainedPairCount++;
    }
  })
  return fullyContainedPairCount;
}

async function solve02() { }

export default {
  solve01,
  solve02
}
