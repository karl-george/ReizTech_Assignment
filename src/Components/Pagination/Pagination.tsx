import { Dispatch, SetStateAction } from 'react';
import './pagination.css';

interface Props {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }: Props) => {
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  return <div>Pagination</div>;
};

export default Pagination;
