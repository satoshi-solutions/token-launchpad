import React, { useState, useEffect } from 'react';
import LandingPageImage from '../assets/background.png';
import Down from '../assets/down.svg';
import { useAccount } from 'wagmi';
import TokenDetail from './TokenDetail';
import WalletDexAddress from './WalletDexAddress';
import ContactInformation from './ContactInformation';
import Tax from './Tax';
import { Link } from 'react-scroll';

const LandingPage = () => {
    const { isConnected, address } = useAccount();

    const [tokenDetail, setTokenDetail] = useState({
        tokenName: '',
        tokenSymbol: '',
        tokenSupply: 1
    });
    const [walletAddress, setWalletAddress] = useState({
        maxWallet: 0.02,
        marketingWallet: '',
        maxTransaction: 0.02,
        developmentWallet: address,
        routerDEXAddress: '0x66c390A468e79661e426F210DE6Cb83AC556093F'
    });
    const [contactInformation, setContactInformation] = useState({
        website: '',
        telegram: '',
        twitter: '',
    });

    useEffect(() => {
        setTokenDetail({
            tokenName: '',
            tokenSymbol: '',
            tokenSupply: 1
        });
        setWalletAddress({
            maxWallet: 0.02,
            marketingWallet: '',
            maxTransaction: 0.02,
            developmentWallet: address,
            routerDEXAddress: '0x66c390A468e79661e426F210DE6Cb83AC556093F'
        });
        setContactInformation({
            website: '',
            telegram: '',
            twitter: ''
        });
    }, [isConnected]);


    return (
        <div className="mx-auto  z-0 overflow-hidden">
            <section className='bg-[#030b15] mt-[100px]'>
                <div className="absolute top-0 left-0 w-full h-[100px] bg-[#030b15]" />
                <img
                    src={LandingPageImage}
                    alt="Landing Page"
                    className="w-full h-[540px] object-cover absolute left-0 z-0"
                />
                <div className="relative mt-10 z-20 h-[540px] w-full flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-white text-6xl font-bold mt-[100px] max-lg:text-5xl max-md:text-4xl max-sm:text-2xl">
                        Create Your <span className="text-[#00D1FF]">ERC20</span> Token
                    </h1>
                    <p className="text-white text-[18px] max-w-[800px] max-sm:text-[14px] mt-10 max-md:text-[16px]">
                        Easily Deploy Smart Contract For An ERC20 Token On Ethereum. Between Several Features
                        Like Mintable, Deflationary, Taxable, And Others, Giving Your Token Its Unique Identity.
                        <br />Login. No Setup. No Coding Required.
                    </p>
                </div>
            </section>
            <section id="dropDown" className="flex flex-col items-center  bg-[#030b15] w-full  justify-start">
                <div className='w-full flex items-center justify-center'>
                    <span class="h-[1px] 2xl:ml-[120px] opacity-40 flex-1 bg-gray-300 dark:bg-gray-600"></span>
                    <Link
                        to="dropDown"
                        smooth={true}
                        duration={500}
                    >
                        <img src={Down} alt="Landing Page" className=" w-[80px] h-[80px] cursor-pointer" />
                    </Link>
                    <span class="h-[1px] 2xl:mr-[120px] opacity-40 flex-1 bg-gray-300 dark:bg-gray-600"></span>
                </div>
            </section>
            {
                isConnected ?
                    <>
                        {/* Token Details */}
                        <TokenDetail tokenDetail={tokenDetail} setTokenDetail={setTokenDetail} />

                        {/* Wallet & Dex Address */}
                        <WalletDexAddress walletAddress={walletAddress} setWalletAddress={setWalletAddress} />

                        {/* Contact Information */}
                        <ContactInformation contactInformation={contactInformation} setContactInformation={setContactInformation} />

                        {/* Tax */}
                        <Tax tokenDetail={tokenDetail} walletAddress={walletAddress} contactInformation={contactInformation} />
                    </>
                    :
                    <section className="flex flex-col items-center h-[21vh] bg-[#030b15] w-full ">
                        <div className='w-full flex items-center justify-center'>
                            <h1 className='text-[#00D1FF] text-[20px] font-bold mt-[40px]'>
                                You must connect wallet to create token.
                            </h1>
                        </div>
                    </section>
            }
        </div>
    );
};

export default LandingPage;
