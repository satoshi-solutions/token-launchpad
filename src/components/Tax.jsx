import React, { useState, useRef, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi'; // Use useWalletClient instead of useSigner
import { BrowserProvider, Contract, parseEther, parseUnits } from 'ethers'; // Update import and add parseEther and parseUnits
import ABI from './abi.json';

const Tax = ({ tokenDetail, walletAddress }) => {
    const { isConnected } = useAccount();
    const { data: walletClient, isError, isLoading } = useWalletClient(); // Use useWalletClient

    const [notification, setNotification] = useState({
        show: false,
        message: ''
    });

    const [tax, setTax] = useState({
        initialTax: {
            marketing: 0,
            development: 0,
            liquidity: 0,
        },
        finalTax: {
            marketing: 0,
            development: 0,
            liquidity: 0,
        }
    });

    // Refs for scrolling
    const tokenNameRef = useRef(null);
    const tokenSymbolRef = useRef(null);
    const tokenSupplyRef = useRef(null);
    const marketingWalletRef = useRef(null);

    const scrollToField = (ref) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        if (ref.current) {
            ref.current.classList.add('ring-2', 'ring-red-500');
            setTimeout(() => {
                ref.current.classList.remove('ring-2', 'ring-red-500');
            }, 3000);
        }
    };

    const validateFields = () => {
        if (!tokenDetail.tokenName) {
            scrollToField(tokenNameRef);
            return 'Please enter your token name!';
        }
        if (!tokenDetail.tokenSymbol) {
            scrollToField(tokenSymbolRef);
            return 'Please enter your token symbol!';
        }
        if (!tokenDetail.tokenSupply) {
            scrollToField(tokenSupplyRef);
            return 'Please enter your token supply!';
        }
        if (!walletAddress.marketingWallet) {
            scrollToField(marketingWalletRef);
            return 'Please enter valid marketing wallet address!';
        }
        return null;
    };

    const createToken = async () => {
        if (isLoading) {
            setNotification({ show: true, message: 'Loading wallet client, please wait...' });
            setTimeout(() => setNotification({ show: false, message: '' }), 3000);
            return;
        }

        if (isError) {
            setNotification({ show: true, message: 'Error loading wallet. Please check your wallet connection.' });
            setTimeout(() => setNotification({ show: false, message: '' }), 3000);
            return;
        }

        if (!walletClient) {
            setNotification({ show: true, message: 'Please connect your wallet!' });
            setTimeout(() => setNotification({ show: false, message: '' }), 3000);
            return;
        }

        const validationError = validateFields();
        if (validationError) {
            setNotification({ show: true, message: validationError });
            setTimeout(() => setNotification({ show: false, message: '' }), 3000);
            return;
        }

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const factoryAddress = "0x4b4bC46c128e8F380ca0a96a6cAb5813cb93e84C"; // Your deployed factory address
            const contract = new Contract(factoryAddress, ABI, signer);

            const launchParams = {
                name: tokenDetail.tokenName,
                symbol: tokenDetail.tokenSymbol,
                totalSupply: parseUnits(tokenDetail.tokenSupply.toString(), 18),
                _maxWallet: parseUnits(walletAddress.maxWallet.toString(), 18),
                _marketingWallet: walletAddress.marketingWallet,
                _maxTransaction: parseUnits(walletAddress.maxTransaction.toString(), 18),
                _developmentWallet: walletAddress.developmentWallet,
                _liquidityPool: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
                _router: walletAddress.routerDEXAddress,
            };

            const taxParams = {
                initialMarketingTax: tax.initialTax.marketing * 100, // Convert percentage to basis points
                initialDevelopmentTax: tax.initialTax.development * 100,
                initialLiquidityTax: tax.initialTax.liquidity * 100,
                finalMarketingTax: tax.finalTax.marketing * 100,
                finalDevelopmentTax: tax.finalTax.development * 100,
                finalLiquidityTax: tax.finalTax.liquidity * 100,
            };

            // Check if signer has enough ETH for gas and value
            const balance = await provider.getBalance(await signer.getAddress());
            const requiredValue = parseEther("0.1");
            if (balance < BigInt(requiredValue.toString())) {
                throw new Error("Insufficient ETH for transaction. Please fund your wallet with Sepolia ETH.");
            }

            // Check network
            const chainId = await provider.getNetwork().then(net => net.chainId);
            if (chainId !== 11155111n) { // Sepolia chain ID
                throw new Error("Please switch to Sepolia Testnet in your wallet.");
            }

            const tx = await contract.createToken(launchParams, taxParams, {
                value: parseEther("0.1")
            });

            await tx.wait();
            setNotification({ show: true, message: 'Token created successfully!', type: 'success' });
            setTimeout(() => setNotification({ show: false, message: '' }), 3000);

        } catch (error) {
            console.error("Error creating token:", error);
            setNotification({
                show: true,
                message: `Failed to create token: ${error.message || error.toString()}`,
            });
            setTimeout(() => setNotification({ show: false, message: '' }), 3000);
        }
    };

    useEffect(() => {
        setTax({
            initialTax: { marketing: 0, development: 0, liquidity: 0 },
            finalTax: { marketing: 0, development: 0, liquidity: 0 }
        });
    }, [isConnected]);

    return (
        <section className="flex flex-col items-center bg-[#030b15] w-full py-20 justify-center px-[120px] max-2xl:px-[60px] max-xl:px-[30px] max-md:px-[10px] relative">
            {/* Notification */}
            {notification.show && (
                <div className="fixed top-5 bg-red-500 text-white px-6 py-3 rounded-[12px] shadow-lg z-50 animate-fade-in-down">
                    <p className="font-medium">{notification.message}</p>
                </div>
            )}

            <div className='w-full flex items-center justify-left'>
                <span className='text-[#00D1FF] text-[22px] max-sm:text-[18px] font-bold'>
                    Tax <br />
                    <span className='text-gray-400 text-[18px] max-sm:text-[14px] line-clamp-1'>
                        Set the initial & final Tax you want
                    </span>
                </span>
            </div>
            <div className="border w-full border-gray-600 rounded-lg lg:px-10 py-4 px-4 mt-10  text-white ">
                {/* Title */}
                <p className="font-semibold text-lg">Initial Tax</p>
                <div className='w-full grid grid-cols-3 max-sm:grid-cols-1 gap-10 items-center justify-between mt-10'>
                    <label for="Marketing">
                        <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Marketing </span>
                        <input
                            type="number"
                            id="Marketing"
                            className='mt-0.5 placeholder:text-[20px] px-4 w-full rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                            defaultValue={0}
                            max={15}
                            value={tax.initialTax.marketing}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                if (value > 15) value = 15; // Restrict to max value
                                if (value < 0) value = 0; // Optional: Prevent negative values
                                setTax({ ...tax, initialTax: { ...tax.initialTax, marketing: value } });
                            }}
                        />
                    </label>
                    <label for="Development">
                        <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Development </span>
                        <input
                            type="number"
                            id="Development"
                            className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                            defaultValue={0}
                            max={15}
                            value={tax.initialTax.development}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                if (value > 15) value = 15; // Restrict to max value
                                if (value < 0) value = 0; // Optional: Prevent negative values
                                setTax({ ...tax, initialTax: { ...tax.initialTax, development: value } });
                            }}
                        />
                    </label>
                    <label for="Liquidity Pool">
                        <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Liquidity Pool </span>
                        <input
                            type="number"
                            id="LiquidityPool"
                            className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                            defaultValue={0}
                            max={15}
                            value={tax.initialTax.liquidity}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                if (value > 15) value = 15; // Restrict to max value
                                if (value < 0) value = 0; // Optional: Prevent negative values
                                setTax({ ...tax, initialTax: { ...tax.initialTax, liquidity: value } });
                            }}
                        />
                    </label>
                </div>
                <p className='text-gray-400 text-[18px] max-sm:text-[14px] mt-5'> Initial Tax cannot be greater than 15%. </p>
            </div>

            <div className="border w-full border-gray-600 rounded-lg lg:px-10 py-4 px-4 mt-10  text-white ">
                {/* Title */}
                <p className="font-semibold text-lg">Final Tax</p>
                <div className='w-full grid grid-cols-3 max-sm:grid-cols-1 gap-10 items-center justify-between mt-10'>
                    <label for="Marketing2">
                        <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Marketing </span>
                        <input
                            type="number"
                            id="Marketing2"
                            className='mt-0.5 placeholder:text-[20px] px-4 w-full rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                            defaultValue={0}
                            value={tax.finalTax.marketing}
                            max={5}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                if (value > 5) value = 5; // Restrict to max value
                                if (value < 0) value = 0; // Optional: Prevent negative values
                                setTax({ ...tax, finalTax: { ...tax.finalTax, marketing: value } });
                            }}
                        />
                    </label>
                    <label for="Development2">
                        <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Development </span>
                        <input
                            type="number"
                            id="Development2"
                            className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                            defaultValue={0}
                            value={tax.finalTax.development}
                            max={5}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                if (value > 5) value = 5; // Restrict to max value
                                if (value < 0) value = 0; // Optional: Prevent negative values
                                setTax({ ...tax, finalTax: { ...tax.finalTax, development: value } });
                            }}
                        />
                    </label>
                    <label for="Liquidity Pool2">
                        <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Liquidity Pool </span>
                        <input
                            type="number"
                            id="LiquidityPool2"
                            className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                            defaultValue={0}
                            value={tax.finalTax.liquidity}
                            max={5}
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                if (value > 5) value = 5; // Restrict to max value
                                if (value < 0) value = 0; // Optional: Prevent negative values
                                setTax({ ...tax, finalTax: { ...tax.finalTax, liquidity: value } });
                            }}
                        />
                    </label>
                </div>
                <p className='text-gray-400 text-[18px] max-sm:text-[14px] mt-5'> Final Tax cannot be greater than 5%. </p>
            </div>
            <span className='text-gray-400 text-[18px] max-sm:text-[14px] mt-5 font-semibold'>
                A fixed 0.1ETH will be charged for creating the token. Please make sure you have enough ETH to cover the fee + gas cost.
            </span>

            <div className='w-full flex items-center justify-center mt-10'>
                <button
                    onClick={createToken}
                    className='bg-[#00D1FF] text-[20px] text-white px-8 py-3 hover:bg-[#00D1FF]/80 hover:scale-105 transition-all duration-300 rounded-full'
                >
                    Create Token
                </button>
            </div>

        </section>
    );
};

export default Tax;
