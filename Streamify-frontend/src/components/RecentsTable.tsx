import { useFetch } from "../hooks";
import useStreamify from "../hooks/useStreamify";

const RecentsTable = () => {
  // const {data, isLoading, error} = useFetch<>();

  const { windowSize } = useStreamify();
  const { width } = windowSize;

  const generateContainerClassName = (width: number) => {
    if (width < 400) {
      return "px-4 pt-2 pb-2";
    } else if (width < 500) {
      return "px-8 pt-4 pb-4";
    } else {
      return "px-12 pt-6 pb-6";
    }
  };
  return (
    <div className={generateContainerClassName(width)}>
      <div className="bg-dark-bg-tertiary px-4 py-2 rounded-t-2xl flex items-center justify-between">
        <h3 className="text-lg">Recents</h3>
        <div>{/* pagination - sticky */}</div>
        <button>Filter</button>
      </div>
      <div className="bg-dark-bg-secondary rounded-b-2xl px-4 py-2">sdfsdf</div>
    </div>
  );
};

export default RecentsTable;
