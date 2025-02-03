import { useEffect, useState } from "react";
import LeftArrowFill from "../../public/LeftArrowFillDark.png";
import RightArrowFill from "../../public/RightArrowFillDark.png";
import { useScreenSize } from "../hooks";

export type PaginatorProps = {
  dataLength: number;
  limit: number;
  toPage: (pageNo: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onLimitChange: (limit: number) => void;
  disableControls: boolean;
};

const generatePages = (length: number, limit: number): number[] => {
  return [...Array(Math.ceil(length / limit)).keys()].map((k) => k + 1);
};

const generateVisiblePages = (
  totalPages: number,
  currPage: number
): (number | string)[] => {
  if (totalPages <= 7) return [...Array(totalPages)].map((_, i) => i + 1);

  if (currPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
  if (currPage >= totalPages - 3)
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];

  return [
    1,
    "...",
    currPage - 2,
    currPage - 1,
    currPage,
    currPage + 1,
    currPage + 2,
    "...",
    totalPages,
  ];
};

const Paginator = ({
  dataLength,
  limit,
  onNext,
  onPrev,
  toPage,
  onLimitChange,
  disableControls,
}: PaginatorProps) => {
  const [currLimit, setCurrLimit] = useState<number>(limit);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  const { windowSize } = useScreenSize();

  useEffect(() => {
    setPages(generatePages(dataLength, currLimit));
    console.log(currLimit);
  }, [currLimit, dataLength]);

  const visiblePages = generateVisiblePages(pages.length, currPage);

  const setPageLimit = (newLimit: number) => {
    if (currLimit !== newLimit) {
      setCurrPage(1);
      setCurrLimit(newLimit);
      onLimitChange(newLimit);
    }
  };

  const fetchNext = () => {
    if (currPage < pages.length) {
      setCurrPage((prev) => prev + 1);
      onNext();
    }
  };

  const fetchPrev = () => {
    if (currPage > 1) {
      setCurrPage((prev) => prev - 1);
      onPrev();
    }
  };

  const fetchPage = (pageNo: number) => {
    if (pageNo !== currPage) {
      setCurrPage(pageNo);
      toPage(pageNo);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button disabled={disableControls || currPage === 1} onClick={fetchPrev}>
        <img className="w-8" src={LeftArrowFill} alt="Previous" />
      </button>

      {windowSize.width > 900 && (
        <div className="flex items-center">
          {visiblePages.map((k, i) =>
            k === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={`page-${k}`}
                onClick={() => fetchPage(Number(k))}
                disabled={disableControls}
                className={`px-2 py-0 mx-2 ${
                  currPage === k
                    ? "bg-dark-bg-secondary hover:bg-dark-bg-primary"
                    : "hover:bg-gray-300 hover:text-gray-700"
                } text-center font-semibold rounded-md`}
              >
                {k}
              </button>
            )
          )}
        </div>
      )}

      <button
        disabled={disableControls || currPage === pages.length}
        onClick={fetchNext}
      >
        <img className="w-8" src={RightArrowFill} alt="Next" />
      </button>

      {/* Page No. Selection */}
      <div className="bg-dark-bg-secondary p-1 rounded-md">
        <label htmlFor="page-no-select" className="p-1 rounded-sm bg-amber-700">
          To
        </label>
        <select
          id="page-no-select"
          disabled={disableControls}
          onChange={(e) => fetchPage(parseInt(e.target.value))}
          value={currPage}
          className="bg-dark-bg-secondary"
        >
          {pages.map((k) => (
            <option key={`page-${k}`} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      {/* Limit Selection */}
      {windowSize.width > 465 && (
        <div className="bg-dark-bg-secondary p-1 rounded-md">
          <label
            htmlFor="page-limit-select"
            className="p-1 rounded-sm bg-amber-700"
          >
            Limit
          </label>
          <select
            disabled={disableControls}
            id="page-limit-select"
            onChange={(e) => setPageLimit(parseInt(e.target.value))}
            value={currLimit}
            className="bg-dark-bg-secondary"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Paginator;
