import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function AreaChartCustom({ data, title, multiSelectValues, area }) {
  const [opacity, setOpacity] = React.useState({
    uv: 0.7,
    pv: 0.7,
    amt: 0.7,
  });
  const [activeSeries, setActiveSeries] = React.useState([]);
  const handleLegendClick = (o) => {
    const { dataKey } = o;

    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey));
    } else {
      setActiveSeries((prev) => [...prev, dataKey]);
    }
  };
  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.7 }));
  };
  console.log(data, area);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={
          data &&
          data.filter((item) =>
            area && area.length > 0 ? area.includes(item.name) : true
          )
        }
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          interval={0}
          tickFormatter={(value, index) => {
            // Show every other label, starting with the first one
            return multiSelectValues.length === 0
              ? value
              : multiSelectValues.includes(value)
              ? value
              : "";
          }}
        />
        <YAxis />
        <Tooltip />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleLegendClick}
          layout="horizontal"
          verticalAlign="top"
          align="center"
          iconType="circle"
          iconSize={14}
          wrapperStyle={{ paddingBottom: "20px" }}
        />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
          strokeOpacity={opacity.uv}
          fillOpacity={opacity.uv}
          hide={activeSeries.includes("uv")}
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
          strokeOpacity={opacity.pv}
          fillOpacity={opacity.pv}
          hide={activeSeries.includes("pv")}
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
          strokeOpacity={opacity.amt}
          fillOpacity={opacity.amt}
          hide={activeSeries.includes("amt")}
        />
      </AreaChart>
      <h5 className="text-xs text-yellow-950 italic">{title}</h5>
    </ResponsiveContainer>
  );
}
