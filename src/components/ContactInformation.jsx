import React from 'react';

const ContactInformation = ({ contactInformation, setContactInformation }) => {
    return (
        <section className="flex flex-col items-center bg-[#030b15] w-full  justify-center px-[120px] max-2xl:px-[60px] max-xl:px-[30px] max-md:px-[10px]">
            <div className='w-full flex items-center justify-left'>
                <span className='text-[#00D1FF] text-[22px] max-sm:text-[18px] font-bold'>
                    Contact Information <br />
                    <span className='text-gray-400 text-[18px] max-sm:text-[14px] line-clamp-1'>
                        Enter social links to show your tokenomics
                    </span>
                </span>
            </div>
            <div className='w-full grid grid-cols-2 gap-10 items-center justify-between mt-10'>
                <label for="Website">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Website </span>
                    <input
                        type="text"
                        id="Website"
                        className='mt-0.5 placeholder:text-[20px] px-4 w-full rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        placeholder='https://yourwebsite.com'
                        onChange={(e) => setContactInformation({ ...contactInformation, website: e.target.value })}
                    />
                </label>
                <label for="Telegram">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200 '> Telegram </span>
                    <input
                        type="text"
                        id="Telegram"
                        className='mt-0.5 w-full px-4  rounded border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        placeholder='https://t.me/@'
                        onChange={(e) => setContactInformation({ ...contactInformation, telegram: e.target.value })}
                    />
                </label>
            </div>

            <div className='w-full grid grid-cols-2 gap-10 items-center  justify-between mt-10'>
                <label for="Twitter">
                    <span className='text-[16px] font-medium text-gray-700 dark:text-gray-200'> Twitter </span>
                    <input
                        type="text"
                        id="Twitter"
                        className='mt-0.5 w-full px-4 placeholder:text-[20px] rounded  border-gray-300 h-[55px] shadow-sm sm:text-[19px] dark:border-gray-600 dark:bg-gray-900 dark:text-white'
                        placeholder='https://x.com/@'
                        onChange={(e) => setContactInformation({ ...contactInformation, twitter: e.target.value })}
                    />
                </label>
            </div>
        </section>
    );
};

export default ContactInformation;
