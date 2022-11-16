const Web3 = require('web3');
import './style.css';

let appEl = document.createElement('div');
appEl.setAttribute('id', 'app')
document.body.appendChild(appEl);

let app = document.getElementById('app')!;

let balanceEl = document.createElement('h2');
balanceEl.setAttribute('id', 'balance');
balanceEl.innerText = '0 ETH';
app.appendChild(balanceEl);

let inputEl = document.createElement('input');
inputEl.setAttribute('type', 'text');
inputEl.setAttribute('id', 'address-input');
inputEl.setAttribute('name', 'address-input');
inputEl.setAttribute('placeholder', 'Wallet Address');
app.appendChild(inputEl);


let submitEl = document.createElement('button');
submitEl.setAttribute('id', 'submit-btn');
submitEl.innerText = 'Get Balance';
app.appendChild(submitEl);

const getBalance = async () => {
  submitEl.innerText = 'Loading...';
  submitEl.style.pointerEvents = 'none';
  const infura = 'https://goerli.infura.io/v3/your-api-key';
  const web3 = new Web3(new Web3.providers.HttpProvider(infura));
  let addressValue = (document.getElementById('address-input') as HTMLFormElement).value;
  let balance = await web3.eth.getBalance(addressValue);
  balance = web3.utils.fromWei(balance, 'ether');
  balanceEl.innerText = balance + ' ETH';
  submitEl.innerText = 'Get Balance';
  submitEl.style.pointerEvents = 'auto';
};

(document.getElementById('submit-btn') as HTMLFormElement).onclick = (e) => {
  e.preventDefault();
  getBalance();
};