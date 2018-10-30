// @format
import Web3 from "web3";
import ProviderEngine from "web3-provider-engine";
import RpcSubprovider from "web3-provider-engine/subproviders/rpc";
import LedgerWalletSubproviderFactory from "ledger-wallet-provider";

const resolveWeb3 = async resolve => {
  const urlParams = new URLSearchParams(window.location.search);
  const provider = urlParams.get("provider");

  if (provider === "metamask" || !provider) {
    let { web3 } = window;
    const localProvider = `http://localhost:9545`;

    if (window.ethereum) {
      web3 = new Web3(ethereum);
      try {
        window.ethereum.enable().then(() => resolve(web3));
      } catch (err) {
        alert(err);
      }
    } else if (window.web3) {
      web3 = new Web3(web3.currentProvider);
    } else {
      const provider = new Web3.providers.HttpProvider(localProvider);
      web3 = new Web3(provider);
      resolve(web3);
    }
  } else if (provider === "ledger") {
    var engine = new ProviderEngine();
    var web3 = new Web3(engine);

    var ledgerWalletSubProvider = await LedgerWalletSubproviderFactory();
    engine.addProvider(ledgerWalletSubProvider);
    engine.addProvider(
      new RpcSubprovider({ rpcUrl: "https://mainnet.infura.io" })
    );
    engine.start();
    resolve(web3);
  }

  resolve(null);
};

export default () =>
  new Promise(resolve => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener(`load`, () => {
      resolveWeb3(resolve);
    });
    // If document has loaded already, try to get Web3 immediately.
    if (document.readyState === `complete`) {
      resolveWeb3(resolve);
    }
  });
