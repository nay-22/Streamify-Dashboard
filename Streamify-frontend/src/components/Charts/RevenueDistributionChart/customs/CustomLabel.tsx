/**
 * CustomLabel: Functional component for rendering labels for RevenueDistributionChart.
 * It calculates the position of the label based on the provided attributes.
 * @returns A JSX element representing a text label positioned according
 *          to the calculated coordinates. If the percentage is greater than
 *          5%, it displays the percentage; otherwise, it renders nothing
 */
const CustomLabel = (attrs: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = attrs;
  const RADIAN = Math.PI / 180;
  const r1 = innerRadius + (outerRadius - innerRadius) * 0.1;
  const x1 = cx + r1 * Math.cos(-midAngle * RADIAN);
  const y1 = cy + r1 * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x1}
        y={y1}
        fill="white"
        fontWeight={"bold"}
        textAnchor={x1 > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {percent > 0.05 && `${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  );
};

export default CustomLabel;
