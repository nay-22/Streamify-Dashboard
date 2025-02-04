import { RefObject } from "react";
import { RecentStreams } from "../../types/ApiContractTypes";
import withLoaderAndError, {
  WithLoaderAndErrorProps,
} from "../../hoc/withLoaderAndError";

export interface DataTableProps extends WithLoaderAndErrorProps {
  data?: RecentStreams | undefined;
  tableRef: RefObject<HTMLTableElement>;
}

const DataTable = ({ data, tableRef }: DataTableProps) => {
  return (
    data &&
    data.recents &&
    data.recents.length > 0 && (
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
                <td className="text-center p-1.5" key={`${key}-${detail}`}>
                  {detail}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default withLoaderAndError(DataTable);
