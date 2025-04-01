import React from 'react';

const WalletDexAddress = ({ walletAddress, setWalletAddress }) => {
    return (
        <section className="flex flex-col items-center bg-[#030b15] w-full py-20 justify-center px-[120px] max-2xl:px-[60px] max-xl:px-[30px] max-md:px-[10px]">
            <div className='w-full flex items-center justify-left'>
                <span className='text-[#00D1FF] text-[22px] max-sm:text-[18px] font-bold'>
                    Wallet & Dex Address <br />
                    <span className='text-gray-400 text-[18px] max-sm:text-[14px] line-clamp-1'>
                        Let us know your wallet and dex address
                    </span>
                </span>
            </div>
            <div className='w-full grid grid-cols-2 gap-10 items-center justify-between mt-10'>
                <label for="Max Wallet">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Max Wallet </span>
                    <input
                        type="text"
                        id="MaxWallet"
                        className='mt-0.5 placeholder:text-[20px] px-4 w-full rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        disabled
                        value={`${walletAddress.maxWallet * 100}%`}
                    />
                </label>
                <label for="Marketing Wallet">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200 after:content-["*"] after:text-red-500 after:ml-1'> Marketing Wallet </span>
                    <input
                        type="text"
                        id="MarketingWallet"
                        className='mt-0.5 w-full px-4  rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        onChange={(e) => setWalletAddress({ ...walletAddress, marketingWallet: e.target.value })}
                    />
                </label>
            </div>
            <div className='w-full grid grid-cols-2 gap-10 items-center justify-between mt-10'>
                <label for="Max Transaction">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Max Transaction </span>
                    <input
                        type="text"
                        id="MaxTransaction"
                        className='mt-0.5 placeholder:text-[20px] px-4 w-full rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        disabled
                        value={`${walletAddress.maxTransaction * 100}%`}
                    />
                </label>
                <label for="Development Wallet">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Development Wallet </span>
                    <input
                        type="text"
                        id="DevelopmentWallet"
                        className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        disabled
                        value={walletAddress.developmentWallet}
                    />
                </label>
            </div>
            <div className='w-full grid grid-cols-2 gap-10 items-center  justify-between mt-10'>
                <label for="Router DEX Address">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Router DEX </span>
                    <input
                        type="text"
                        id="RouterDEXAddress"
                        className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded  border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        disabled
                        value={walletAddress.routerDEXAddress}
                    />
                </label>
            </div>
        </section>
    );
};

export default WalletDexAddress;
