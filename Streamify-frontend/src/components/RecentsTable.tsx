import { FC, useEffect, useRef, useState } from "react";
import { RECENTS_URL } from "../constants";
import { useFetch } from "../hooks";
import useStreamify from "../hooks/useStreamify";
import { RecentStreams } from "../types/ApiContractTypes";
import Paginator from "./Paginator";

import FilterFill from "../../public/FilterFill.png";
import FilterForm from "./FilterForm";
import Modal from "./Modal";
import { RecentStreamsQuery } from "../types";

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
    limit: 10,
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const { windowSize } = useStreamify();
  const { width } = windowSize;

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
    console.log(data?.recents);
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
      <div className="bg-dark-bg-tertiary px-4 py-2 rounded-t-2xl flex items-center justify-between">
        <h3 className="text-lg">Recents</h3>
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
        className="bg-dark-bg-secondary rounded-b-2xl p-0.5 relative"
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-bg-secondary p-4">
            Loading...
          </div>
        ) : data && data.recents && data.recents.length > 0 ? (
          <>
            <table
              ref={tableRef}
              className="w-full outline-1 outline-slate-400 rounded-b-2xl border-collapse overflow-auto"
            >
              <thead>
                <tr>
                  {Object.keys(data.recents[0]).map((key) => (
                    <th className="p-1.5" key={key}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recents.map((item, i) => (
                  <tr
                    className="outline-1 outline-slate-400 last:rounded-b-2xl"
                    key={`${i}-${item["Song Name"]}-${item["User ID"]}`}
                  >
                    {Object.entries(item).map(([key, detail]) => (
                      <td
                        className="text-center p-1.5"
                        key={`${key}-${detail}`}
                      >
                        {detail}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal isOpen={showModal} onClose={handleFilter}>
              <FilterForm
                onSubmit={(query) => {
                  addQuery(query);
                  setShowModal(false);
                }}
              />
            </Modal>
          </>
        ) : (
          error && <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default RecentsTable;
