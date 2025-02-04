import { useTheme } from "../../hooks";
import { GenericCardProps } from "../../types";

/**
 * GenericCard: Functional component to wrap a component and provide structure
 * @param props props object for ChartCard
 * @param props.title Title string value
 * @param props.actions ReactNode actions component
 * @param props.children ReactNode children
 * @returns A JSX element with serving as a container/wrapper for the chart component
 */
const GenericCard = ({ title, actions, children }: GenericCardProps) => {
  const theme = useTheme();

  return (
    <div className={`${theme.background?.secondary} rounded-2xl w-full`}>
      <div className={`flex items-center justify-between ${theme.background?.tertiary} px-4 py-2 rounded-t-2xl`}>
        <h4 className={`text-lg font-semibold grow-0 ${theme.text?.primary}`}>
          {title}
        </h4>
        <div className="p-0 m-0 flex items-center justify-between">
          {actions && actions}
        </div>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default GenericCard;
