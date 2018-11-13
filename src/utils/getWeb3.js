// @format
import Web3 from "web3";
import ProviderEngine from "web3-provider-engine";
import FetchSubprovider from "web3-provider-engine/subproviders/fetch";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import createLedgerSubprovider from "@ledgerhq/web3-subprovider";

const resolveWeb3 = async (
  resolve,
  initProvider,
  accountsOffset = 0,
  initPath = "44'/60'/0'/0"
) => {
  const urlParams = new URLSearchParams(window.location.search);
  const provider = urlParams.get("provider") || initProvider;
  const path = urlParams.get("path") || initPath;
  const network = urlParams.get("network") || "mainnet";

  if (provider === "metamask") {
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
    }
    resolve(web3);
  } else if (provider === "ledger") {
    const rpcUrl = `https://${network}.infura.io`;
    const networkId = 1;
    const engine = new ProviderEngine();
    const getTransport = () => TransportU2F.create();
    const ledger = createLedgerSubprovider(getTransport, {
      networkId: 4,
      accountsLength: 5,
      accountsOffset,
      path
    });
    engine.addProvider(ledger);
    engine.addProvider(new FetchSubprovider({ rpcUrl }));
    engine.start();
    resolve(new Web3(engine));
  }

  resolve(null);
};

export default (provider, accountsOffset, path) =>
  new Promise(resolve => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener(`load`, () => {
      resolveWeb3(resolve, provider, accountsOffset, path);
    });
    // If document has loaded already, try to get Web3 immediately.
    if (document.readyState === `complete`) {
      resolveWeb3(resolve, provider, accountsOffset, path);
    }
  });
