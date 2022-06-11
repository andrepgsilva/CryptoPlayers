const CryptoPlayers = artifacts.require("./CryptoPlayers.sol");

contract("CryptoPlayers", accounts => {
  let contract;

  before(async() => {
    contract = await CryptoPlayers.deployed();
  })

  it("...get deployed", async () => {
    assert.notEqual(contract, "");
  });

  it("...get minted and added", async() => {
    const result = await contract.mint("alex");

    let coder = await contract.coders(0);

    assert.equal(coder, "alex"); 
  });
});