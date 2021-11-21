import './App.css';
import { useState, useEffect } from 'react';
import web3 from './web3';
import lottery from './lottery';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    async function getManager() {
      const manager = await lottery.methods.manager().call();
      setManager(manager);

      const players = await lottery.methods.getPlayers().call();
      setPlayers(players);

      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(balance);
    }
    getManager();
  });

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}.</p>
      <p>There are currently {players.length} people competing to win {web3.utils.fromWei(balance, 'ether')} ether!</p>
    </div>
  );
}

export default App;
