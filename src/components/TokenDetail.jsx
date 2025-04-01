import React, { useEffect } from 'react';

const TokenDetail = ({ tokenDetail, setTokenDetail }) => {

    return (
        <section id="tokenDetail" className="flex flex-col mt items-center bg-[#030b15] w-full  justify-center px-[120px] max-2xl:px-[60px] max-xl:px-[30px] max-md:px-[10px]">
            <div className='w-full flex items-center mt-10 justify-left'>
                <span className='text-[#00D1FF] text-[22px] max-sm:text-[18px] font-bold'>
                    Token Details <br />
                    <span className='text-gray-400 text-[18px] max-sm:text-[14px] line-clamp-1'>
                        Enter token details and choose a network
                    </span>
                </span>
            </div>
            <div className='w-full grid grid-cols-2 gap-10 items-center justify-between mt-10'>
                <label for="Token Name">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200 after:content-["*"] after:text-red-500 after:ml-1'> Token Name </span>
                    <input
                        type="text"
                        id="TokenName"
                        className='mt-0.5 placeholder:text-[20px] px-4 w-full rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        required
                        placeholder='Enter your token name'
                        onChange={(e) => setTokenDetail({ ...tokenDetail, tokenName: e.target.value })}
                    />
                </label>
                <label for="Token Symbol">  
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200 after:content-["*"] after:text-red-500 after:ml-1'> Token Symbol </span>
                    <input
                        type="text"
                        id="TokenSymbol"
                        className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        placeholder='Enter your token symbol'
                        onChange={(e) => setTokenDetail({ ...tokenDetail, tokenSymbol: e.target.value })}
                    />
                </label>
            </div>
            <div className='w-full grid grid-cols-1 gap-10 items-center  justify-between mt-10'>
                <label for="Token Supply">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200 after:content-["*"] after:text-red-500 after:ml-1'> Token Supply </span>
                    <input
                        type="number"
                        id="TokenSupply"
                        className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded  border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        required
                        defaultValue={1}
                        onChange={(e) => setTokenDetail({ ...tokenDetail, tokenSupply: e.target.value })}
                    />
                </label>
            </div>
        </section>
    );
};

export default TokenDetail;
