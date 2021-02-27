# Centralia-Coin
Super basic cryptocurrency I build to learn more about the subject - runs in the browser.

[**Check out the demo**](https://dunky11.github.io/centralia-coin/)

[<img src="/.github/gifs/showcase.gif">](https://dunky11.github.io/centralia-coin/ "Go to demo website")

### Features
- Create wallets
- Mine coins
- Check how many coins a wallet holds
- Send coins from one wallet to another

### The project
The project is split into two branches: The frontend and the backend branch. The frontend is build using React and the backend branch runs an express server and MongoDB to store the last state of the blockchain.

Each time a new block is mined, it's full blockchain is send to the backend. The backend first checks if the blockchain is valid and if it is, it will compare it to it's last saved blockchain. The chain which contains more blocks will be saved (simplified proof of work).
