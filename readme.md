# MestoreumPay 

<p align="center">
        <p align="center">MestoreumPay (version 1.0.0)</p>
</p>

<p align="center">
    This application is an example of using a client and server to facilitate transfers between different addresses. This is to demonstrate the usage of Ethereum Cryptography to securely transfer money from one party to another.
</p>

<p align="center">
    The client side was built using <strong>Vite</strong> and the server side was built using <strong>Express Js</strong>
</p>


<p align="center">
    <p align="center">Application Features</p>
</p>


## Features

- Secure payment platform for swift transactions.

- Real-time view of Wallet

- Real-time transfer of any amount to and fro addresses.

- Real-time view of transactions.

- Superb notifications


## Runtime Environment

- <b>NodeJs v18.12.1</b>


## Packages

- `"ethereum-cryptography": "^2.1.2",`
- `uuid: "^9.0.0"`
- `axios: "^0.27.2"`
- `react: "^18.2.0"`
- `react-dom: "^18.2.0"`
- `react-bootstrap: "^2.8.0"`
- `bootstrap: "^5.3.1"`


## Usage

<small>Follow the instructions below:</small> 

 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node generate.js` to generate a few private keys & addresses with balances of 200
4. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

