import { Dispatch, SetStateAction } from 'react';
import './pagination.css';

interface Props {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }: Props) => {
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const pageNumberList = pageNumbers.map((pageNumber) => (
    <li key={pageNumber}>
      <a
        href='#'
        onClick={() => setCurrentPage(pageNumber)}
        className={`page-number ${currentPage == pageNumber ? 'active' : ``}`}
      >
        {pageNumber}
      </a>
    </li>
  ));

  const prevPage = (): void => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (): void => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <ul className='pagination'>
        <li className='page-item'>
          <a href='#' onClick={prevPage} className='prev page-number'>
            ←
          </a>
        </li>
        {pageNumberList}
        <li className='page-item'>
          <a href='#' onClick={nextPage} className='next page-number'>
            →
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
