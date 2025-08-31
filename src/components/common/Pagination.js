import React, { useState, useEffect }from "react";
import { connect } from 'react-redux';

const Pagination  = ({ getCurrentPage, totalItems, itemPerPage }) => {


    const [pages, setPages] = useState([]);
    const [itemsPerPage, setItemsPagePage] = useState(itemPerPage);
    const [pageCount, setpageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    // 
    
    const [maxVisiblePages, setMaxVisiblePages] = useState(3);
    const [isFirstPageEllipsed, setIsFirstPageEllipsed] = useState(false);
    const [isLastPageEllipsed, setIsLastPageEllipsed] = useState(true);
    const [hasLastPage, setHasLastPage] = useState(pageCount > 1);

    const isFirstOrLast = (number) => number !== 1 && number !== pageCount; 

    const range = ( start, end ) => {
        const results = []
        for (let i = start; i <= end; i++){
            results.push(i)
        }
        return results;
    }

    const setPage = () => {
        
        let startPage = 1;
        let endPage = Math.min(pageCount, maxVisiblePages + 2);
        const hasOverflow = pageCount > maxVisiblePages;

        const left = Math.floor(maxVisiblePages / 2);
        const right = maxVisiblePages - left;

        if (currentPage + right >= pageCount) {
            startPage = Math.max(1, pageCount - maxVisiblePages);
            endPage = Math.min(pageCount, startPage + maxVisiblePages);
        } else if (currentPage - left > startPage) {
            startPage = currentPage - left;
            endPage = Math.min(pageCount, currentPage + right);
        }
        
        setIsFirstPageEllipsed(startPage !== 1 && hasOverflow);
        setIsLastPageEllipsed(endPage !== pageCount && hasOverflow);
        setHasLastPage(pageCount > 1);

        setPages(range(startPage, endPage))
    }

    // Handle Click on Page Directly
    const handlePageClick = (e) => {
        setCurrentPage(e.target.value)
        getCurrentPage(e.target.value)
    }
    // Handle NEXT Button
    const handleNextPage = () => {
        if(currentPage < pageCount){ 
            setCurrentPage(prev => prev + 1); 
        }
    }
    // Handle PREVIOUS Button
    const handlePrevPage = () => {
        if(currentPage > 1){ setCurrentPage(prev => prev - 1) }
    }

    useEffect(() => {
        setpageCount(Math.ceil(totalItems/itemsPerPage));
        setPage()
        getCurrentPage(currentPage);
    }, [currentPage, totalItems, pageCount] )

    useEffect( ()=> {
        setCurrentPage(1)
    }, [totalItems])

    
    return(
      <div className="pagination-wrapper">
            <div className="pagination-container">

                <div className="previous-btn-container">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-prev-page btn-4"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </button>
                </div>


                <div className="numbering-container">
                    <ul className="pagination-page-selector">
                        <li onClick={handlePageClick}  
                            className={`pagination-page ${currentPage === 1 ? 'page-selector-active' : ''}`}
                            value={1}> 
                            {1} 
                        </li>
                        {
                            isFirstPageEllipsed ? <li>...</li> : null 
                        }
                        {   
                            
                            pages.filter(isFirstOrLast).map(page => { 

                                return <li onClick={handlePageClick}  
                                            className={`pagination-page ${currentPage === page ? 'page-selector-active' : ''}`}
                                            key={page} 
                                            value={page}> 
                                            {page} 
                                        </li>
                            })
                        }

                        {
                            isLastPageEllipsed ? <li>...</li> : null
                        }

                        { hasLastPage ? <li onClick={handlePageClick}  
                                            className={`pagination-page ${currentPage === pageCount ? 'page-selector-active' : ''}`}
                                            value={pageCount}> 
                                            {pageCount} 
                                        </li> : null
                        }
                    </ul>
                </div>
                <div className="next-btn-container">
                    <button onClick={handleNextPage} disabled={currentPage === pageCount} className="pagination-next-page"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
});


export default connect(mapStateToProps, { })(Pagination);