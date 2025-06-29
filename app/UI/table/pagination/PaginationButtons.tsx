// import { Icons } from '../../../assets/icons/Icons.js';
// import SimpleDropdownMenu from '../SimpleDropdownMenu.jsx';
//
// import React from 'react';
//
// export const PaginationButtons = ({
//     numberOfPages,
//     currentPageNumber = 1,
//     setCurrentPageNumber,
//     className,
// }) => {
//     const menuItemStyle = `flex z-50 h-max w-12 flex-row items-center gap-3   ui-active:font-medium   p-0 text-sm text-[#222122]`;
//
//     const options = Array.from(Array(numberOfPages).keys()).map((o, i) => {
//         return {
//             label: (
//                 <div className={menuItemStyle}>
//                     <div> {i + 1} </div>
//                 </div>
//             ),
//             action: i + 1,
//             text: i + 1,
//         };
//     });
//
//     const chosenOptionText = currentPageNumber;
//
//     const setPageHandler = (page) => {
//         setCurrentPageNumber(page);
//     };
//
//     const increaseHandler = (ev) => {
//         changePage(currentPageNumber + 1);
//     };
//     const changePage = (pagesChange) => {
//         if (pagesChange < 1 || pagesChange > numberOfPages) {
//             return;
//         }
//         setPageHandler(pagesChange);
//     };
//     const decreaseHandler = (ev) => {
//         changePage(currentPageNumber - 1);
//     };
//     const clickHandler = (op, ev) => {
//         changePage(op);
//     };
//     return (
//         <div id={'select-time-filter-root'} className={'flex flex-col'}>
//             <div className={'font-satoshi flex flex-row gap-0'}>
//                 <button
//                     onClick={decreaseHandler}
//                     className={
//                         'flex flex-row items-center gap-0 rounded-sm px-2 text-sm font-normal text-[#656466] hover:bg-[#E9E9F1]'
//                     }
//                 >
//                     {' '}
//                     <div className={'max-h-2 rotate-90 scale-75 p-0'}>
//                         <Icons.GreyDownArrow />
//                     </div>{' '}
//                 </button>
//                 <div
//                     id={'Time-Selector-Dropdown-wrapper'}
//                     className={className || ''}
//                 >
//                     <div
//                         className={`relative flex flex-row items-center justify-center   gap-2`}
//                     >
//                         <div className={'relative'}>
//                             <SimpleDropdownMenu
//                                 className={'relative z-20 w-16 '}
//                                 optionClicked={clickHandler}
//                                 menuClassName={
//                                     'absolute top-8' +
//                                     ' -top-2 transform -translate-y-full absolute right-0 origin-top-right bg-surfaceHigh divide-y divide-secondary rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
//                                 }
//                                 list={options}
//                                 itemClassName={'min-w-8'}
//                                 buttonElement={
//                                     <div
//                                         className={`relative w-16 rounded-sm bg-[#F2F0F5] px-3 py-1 text-[#00000] focus-within:bg-[#E9E9F1] hover:bg-[#E9E9F1]`}
//                                     >
//                                         <span
//                                             className={
//                                                 'flex flex-row justify-between align-middle text-sm'
//                                             }
//                                         >
//                                             {chosenOptionText}
//                                             <span
//                                                 className={
//                                                     'flex flex-col justify-center align-middle '
//                                                 }
//                                             >
//                                                 <Icons.GreyDownArrow />
//                                             </span>
//                                         </span>
//                                     </div>
//                                 }
//                             ></SimpleDropdownMenu>
//                         </div>
//                         <div className={'px-2 text-[#A8A7AA]'}>
//                             Of {numberOfPages}
//                         </div>
//                     </div>
//                 </div>
//                 <button
//                     onClick={increaseHandler}
//                     className={
//                         'flex flex-row items-center gap-0 rounded-sm px-2 text-sm font-normal text-[#656466] hover:bg-[#E9E9F1]'
//                     }
//                 >
//                     {' '}
//                     <div className={'max-h-2 -rotate-90 scale-75 p-0'}>
//                         <Icons.GreyDownArrow />
//                     </div>{' '}
//                 </button>
//             </div>
//         </div>
//     );
// };
