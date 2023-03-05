export const saveGameToStorage = ({ board, turn }) => {
  // Guardamos la partida en el localStorage
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
};
