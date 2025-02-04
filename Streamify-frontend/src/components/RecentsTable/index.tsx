import { FC, useEffect, useRef, useState } from "react";
import { RECENTS_URL } from "../../constants";
import { useFetch, useTheme } from "../../hooks";
import useStreamify from "../../hooks/useStreamify";
import { RecentStreams } from "../../types/ApiContractTypes";
import Paginator from "../Paginator";

import FilterFill from "/FilterFill.png";
import FilterForm from "../forms/FilterForm";
import Modal from "../Modal";
import { RecentStreamsQuery } from "../../types";
import DataTable from "./DataTable";

/**
 * RecentsTable: Functional component that fetches and displays detailed information on the
 * recent streams in a tabular format.
 *
 * It provides support for pagination as well as filtration/sorting criteria for fetching the
 * records.
 * @returns A JSX element representing the Recent Streams section of the Streamify Dashboard.
 */
const RecentsTable: FC = () => {
  const { data, query, updateQuery, addQuery, isLoading, error } = useFetch<
    RecentStreams,
    RecentStreamsQuery
  >(RECENTS_URL, {
    page: 1,
    limit: 5,
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const { windowSize } = useStreamify();
  const { width } = windowSize;

  const theme = useTheme();

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const lastHeightRef = useRef<number>(0);

  useEffect(() => {
    if (tableContainerRef.current && tableRef.current) {
      const tableHeight = tableRef.current.clientHeight;

      if (tableHeight > 0) {
        lastHeightRef.current = tableHeight;
      }

      tableContainerRef.current.style.minHeight = `${lastHeightRef.current}px`;
    }
  }, [data]);

  const fetchNext = () => {
    if (query && query.page && data) {
      updateQuery("page", query.page + 1);
    }
  };

  const fetchPrev = () => {
    if (query && query.page && data) {
      updateQuery("page", query.page - 1);
    }
  };

  const fetchPage = (pageNo: number) => {
    if (query && data) {
      updateQuery("page", pageNo);
    }
  };

  const setPageLimit = (limit: number) => {
    updateQuery("page", 1);
    updateQuery("limit", limit);
  };

  const generateContainerClassName = (width: number) => {
    if (width < 400) {
      return "px-4 pt-2 pb-2";
    } else if (width < 500) {
      return "px-8 pt-4 pb-4";
    } else {
      return "px-12 pt-6 pb-6";
    }
  };

  const handleFilter = () => {
    setShowModal(false);
  };

  return (
    <div className={generateContainerClassName(width)}>
      <div
        className={`${theme.background?.tertiary} px-4 py-2 rounded-t-2xl flex items-center justify-between`}
      >
        <h3 className="text-lg font-semibold">Recents</h3>
        {data && (
          <Paginator
            disableControls={isLoading}
            dataLength={data.totalLength}
            limit={5}
            onNext={fetchNext}
            onPrev={fetchPrev}
            toPage={fetchPage}
            onLimitChange={setPageLimit}
          />
        )}
        <button onClick={() => setShowModal(true)}>
          <img className="w-8" src={FilterFill} alt="Filter" />
        </button>
      </div>
      <div
        ref={tableContainerRef}
        style={{
          minHeight: `${
            lastHeightRef.current === 0 ? 50 : lastHeightRef.current
          }px`,
          overflow: "auto",
        }}
        className={`${theme.background?.secondary} rounded-b-2xl p-0.5 relative`}
      >
        <DataTable
          data={data}
          isLoading={isLoading}
          error={error}
          tableRef={tableRef}
        />
        <Modal isOpen={showModal} onClose={handleFilter}>
          <FilterForm
            onSubmit={(query) => {
              addQuery(query);
              setShowModal(false);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default RecentsTable;
