import { Sector } from "recharts";

/**
 * ActiveShape: Functional component for rendering a custom active segment in a pie chart
 * using Recharts. This component enhances the visual representation of the
 * active pie slice by drawing two overlapping sectors: the original sector
 * and a slightly larger one to create a highlight effect. It is typically
 * used to provide visual feedback when a user hovers over or selects a pie slice.
 *
 * @returns A JSX element representing two sectors: one for the original
 *          pie slice and another larger sector that provides a highlight effect
 *          when the slice is active
 */
const ActiveShape = (attrs: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    attrs;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default ActiveShape;
