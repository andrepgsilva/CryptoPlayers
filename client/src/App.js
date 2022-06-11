import React, { Component, useEffect, useState } from "react";
import CryptoPlayers from "./contracts/CryptoPlayers.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

const App = () => {

  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [coders, setCoders] = useState([]);
  const [mintText, setMintText] = useState("");

  const loadNfts = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();

    let nfts = [];

    for (let i = 0; i < totalSupply; i++) {
      let coder = await contract.methods.coders(i).call();

      nfts.push(coder);
    }

    setCoders(nfts);
  }

  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();

    if (accounts) {
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoPlayers.networks[networkId];

    if (networkData) {
      const abi = CryptoPlayers.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);

      setContract(contract);

      return contract;
    }
  };

  // Load WEB3 contract from Metamask
  // Load the contract
  // Load all the NTFS
  useEffect(async () => {
    const web3 = await getWeb3();

    await loadWeb3Account(web3);
    let contract = await loadWeb3Contract(web3);
    await loadNfts(contract);
  })

  const mint = async () => {
    contract.methods.mint(mintText).send({ from: account }, (error) => {
      if (! error) {
        setCoders([...coders, mintText]);
        setMintText("");
      }
    });
  }

  return <div>
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Crypto Codersss</a>

        <span>
          {account}
        </span>
      </div>
    </nav>

    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col d-flex flex-column align-items-center">
          <img className="mb-4" src="https://avatars.dicebear.com/api/pixel-art/naz.svg" width="72" />
          <h1 className="display-5 fw-bold">Crypto Coders</h1>

          <div className="col-6 text-center">
            <p className="lead text-center">
              These are some of the most highly motivated coders in the world!
              We are to learn coding and apply it to the betterment of humanity.
              We are inventors, innovators, and creators.
            </p>

            <div>
              <input
                type="text"
                placeholder="e.g. Naz"
                className="form-control mb-2"
                value={mintText}
                onChange={(event) => setMintText(event.target.value)}
              />

              <button onClick={mint} className="btn btn-primary">Mint</button>
            </div>
          </div>

          <div className="col-8 d-flex justify-content-center flex-wrap">
            {coders.map((coder, key) => <div key={key} className="d-flex flex-column align-items-center">
              <img width="150" src={`https://avatars.dicebear.com/api/pixel-art/${coder}.svg`} />
              <span> {coder} </span>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default App;