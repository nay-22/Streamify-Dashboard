import { ChangeEvent, FormEvent, useState } from "react";
import { RecentStreamsQuery } from "./RecentsTable";

export type FilterFormProps = {
  onSubmit: (query: RecentStreamsQuery) => void;
};

const FilterForm = ({ onSubmit }: FilterFormProps) => {
  const [query, setQuery] = useState<RecentStreamsQuery>({
    artistOrSong: "",
    sort: undefined,
  });

  const handleSubmit = (e: FormEvent) => {
    onSubmit(query);
    e.preventDefault();
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "artistOrSong":
        setQuery((prev) => ({ ...prev, artistOrSong: e.target.value }));
        break;
      case "sort":
        setQuery((prev) => ({ ...prev, sort: e.target.value }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-dark-bg-primary rounded-2xl">
      <h3 className="bg-dark-bg-tertiary text-2xl p-4 w-full rounded-t-2xl">
        Filter/Sort
      </h3>
      <form>
        <div className="px-8 py-4">
          <div className="py-4">
            <input
              onChange={handleFormChange}
              className="outline-1 p-2 rounded-md"
              type="text"
              name="artistOrSong"
              placeholder="Search Song/Artist"
            />
          </div>
          <h4 className="text-xl">Sort By Streamed Date</h4>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center justify-start gap-2">
              <input
                onChange={handleFormChange}
                type="radio"
                name="sort"
                value="DATE_ASC"
                id="DATE_ASC"
              />
              <label htmlFor="DATE_ASC">ASC</label>
            </div>
            <div className="flex items-center justify-start gap-2">
              <input
                onChange={handleFormChange}
                type="radio"
                name="sort"
                value="DATE_DSC"
                id="DATE_DSC"
              />
              <label htmlFor="DATE_DSC">DSC</label>
            </div>
          </div>
        </div>
        <div className="px-8 py-4">
          <h4 className="text-xl">Sort By Stream Count</h4>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center justify-start gap-2">
              <input
                onChange={handleFormChange}
                type="radio"
                name="sort"
                value="STREAM_COUNT_ASC"
                id="STREAM_COUNT_ASC"
              />
              <label htmlFor="STREAM_COUNT_ASC">ASC</label>
            </div>
            <div className="flex items-center justify-start gap-2">
              <input
                onChange={handleFormChange}
                type="radio"
                name="sort"
                value="STREAM_COUNT_DSC"
                id="STREAM_COUNT_DSC"
              />
              <label htmlFor="STREAM_COUNT_DSC">DSC</label>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            className="bg-dark-bg-secondary px-4 py-2 rounded-sm outline-amber-500 outline-1"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
