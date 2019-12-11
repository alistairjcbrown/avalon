import generate from 'project-name-generator';

function generateGameId() {
  const gameName = generate().dashed;
  const gameRandom = Math.random()
    .toString(36)
    .substr(2, 5);
  return `${gameName}-${gameRandom}`;
}

function isValidGameId(id) {
  return typeof id === 'string' && id.split('-').length === 3;
}

export default generateGameId;
export const isValid = isValidGameId;
