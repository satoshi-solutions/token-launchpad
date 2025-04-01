import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, bscTestnet } from 'wagmi/chains';
import { walletConnect, metaMask } from 'wagmi/connectors';

const projectId = '26dec469283ee31ae98465e63aeb64f8'; // Your WalletConnect project ID

export const config = createConfig({
  chains: [mainnet, sepolia, bscTestnet], // Ensure Sepolia is included
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http('https://sepolia.infura.io/v3/your-infura-project-id'), // Replace with your RPC URL
    [bscTestnet.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, showQrModal: true }),
    metaMask(),
  ],
});