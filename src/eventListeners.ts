import { AlchemyProvider, Contract, JsonRpcApiProvider } from "ethers";

function getProvider (network: string, apiKey: string): JsonRpcApiProvider {
  return new AlchemyProvider(network, apiKey);
}

function getContract(abi : any, address: string, provider: JsonRpcApiProvider) {
  return new Contract(address, abi, provider);
}

function listenForSetEvent(contract: Contract): Promise<Contract> {
  return contract.on("SetEvent", (from, value, event)=>{
    console.log("SetEvent logged", event);
    let transferEvent ={
        from: from,
        value: value,
        eventData: event,
    }
    console.log(JSON.stringify(transferEvent, null, 4))
  })
}

function listenForRemoveEvent(contract: Contract): Promise<Contract> {
  return contract.on("RemoveEvent", (from, event)=>{
    console.log("RemoveEvent logged", event);
    let transferEvent ={
        from: from,
        eventData: event,
    }
    console.log(JSON.stringify(transferEvent, null, 4))
  })
}


export async function listen() {
    
    if (!process.env.ALCHEMY_API_KEY) {
      throw new Error("ALCHEMY_API_KEY is not set");
    }
  
    const network = process.env.NETWORK || "sepolia"  ;
    const provider = getProvider(network, process.env.ALCHEMY_API_KEY);
    
    const output = await provider.getBlockNumber();
    console.log("Block Number: ", output);
    
    const contractAddress = "0x65D9a74a333324710C1227ff3653e409199465E4";
    const ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RemoveEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"newVal","type":"uint256"}],"name":"SetEvent","type":"event"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"myMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"remove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_i","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    
    const contract = getContract(ABI, contractAddress, provider);
    console.log("Address: ", await contract.getAddress());  
    
    await listenForSetEvent(contract); 
    await listenForRemoveEvent(contract);
  }
  
