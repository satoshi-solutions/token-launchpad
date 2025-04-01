import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Logo from '../assets/logo.png';

const Header = ({ isScrolled }) => {
    const { address, isConnected } = useAccount();
    const { connect, connectors, error, isLoading } = useConnect();
    const { disconnect } = useDisconnect();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle wallet connection
    const handleConnect = (connector) => {
        connect({ connector }); // Simply call connect without chaining
    };

    // Use useEffect to close the modal when the connection is successful
    useEffect(() => {
        if (isConnected && isModalOpen) {
            setIsModalOpen(false); // Close the modal when the wallet is connected
        }
    }, [isConnected, isModalOpen]);

    // Handle error display (e.g., user rejected the request)
    useEffect(() => {
        if (error) {
            console.error('Connection error:', error);
            if (error.message.includes('User rejected the request')) {
                alert('You rejected the wallet connection request. Please try again and approve the connection.');
            }
        }
    }, [error]);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full h-[100px]  bg-opacity-75 z-50 ${isScrolled ? "backdrop-blur-md bg-black text-gray-700 shadow-md" : "bg-black "}`}>
                <div className={`max-w-[1200px] h-full mx-auto flex justify-between items-center transition-all duration-300 ${isScrolled ? "pt-1 pb-1" : "pt-3 pb-3"}`} style={isScrolled ? { paddingLeft: '1%', paddingRight: '2%' } : { paddingLeft: '2%', paddingRight: '3%' }}>
                    {/* Logo */}
                    <img src={Logo} className="w-40 h-10" alt="Logo" />

                    {/* Desktop Navigation - Hidden on small screens */}
                    <ul className="flex space-x-6 items-center">
                        <button
                            onClick={isConnected ? () => disconnect() : () => setIsModalOpen(true)}
                            className="flex items-center justify-center space-x-2 border border-white bg-black text-white py-[7px] px-[19px] rounded-full text-[15px] hover:bg-[#ffffff] hover:text-[#000000] transition duration-300 cursor-pointer"
                        >
                            {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
                        </button>
                    </ul>
                </div>
            </nav>
            {/* Modal for wallet selection */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 text-white rounded-lg p-6 w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Connect Wallet</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Wallet Options */}
                        <div className="space-y-3">
                            {connectors.map((connector) => (
                                <button
                                    key={connector.id}
                                    onClick={() => handleConnect(connector)}
                                    disabled={isLoading}
                                    className={`flex items-center w-full px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {/* Wallet Icon */}
                                    <img
                                        src={
                                            connector.name === 'WalletConnect'
                                                ? 'https://walletconnect.com/favicon.ico'
                                                : connector.name === 'MetaMask'
                                                    ? 'https://metamask.io/favicon.ico'
                                                    : 'https://metamask.io/favicon.ico' // Fallback for other wallets
                                        }
                                        alt={connector.name}
                                        className="w-6 h-6 mr-3"
                                    />
                                    <span>{connector.name}</span>
                                    {connector.name === 'MetaMask' && (
                                        <span className="ml-auto text-green-500 text-xs">
                                            {typeof window !== 'undefined' && window.ethereum?.isMetaMask ? 'INSTALLED' : 'NOT INSTALLED'}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 mt-4">
                                {error.message.includes('User rejected the request')
                                    ? 'You rejected the connection request. Please try again.'
                                    : error.message}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;