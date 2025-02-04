import { useStreamify } from "../hooks";
import { ThemeMode } from "../types";
import RefreshDark from "/RefreshDark.png";
import RefreshLight from "/RefreshLight.png";
import { FC } from "react";

/**
 * Actions: Functional components serving as action item for GenericCard to refetch Chart data.
 * @param props props object for Actions
 * @param props.onClick Callback function to execute when action button clicked
 * @returns A JSX element with refresh button binded by onClick
 */
const Actions: FC<{ onClick: () => void }> = ({ onClick }) => {
  const { themeMode } = useStreamify();
  return (
    <>
      <button onClick={onClick} className="p-0 m-0">
        <img
          className="w-7 p-0 m-0"
          src={themeMode === ThemeMode.DARK ? RefreshDark : RefreshLight}
          alt="refresh"
        />
      </button>
    </>
  );
};

export default Actions;
