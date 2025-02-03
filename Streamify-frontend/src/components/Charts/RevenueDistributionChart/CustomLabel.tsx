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
