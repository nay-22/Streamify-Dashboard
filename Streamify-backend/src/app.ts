import express, { Request, Response } from "express";

import {
  METRICS,
  RECENT_STREAMS,
  REVENUE_DISTRIBUTION,
  TOP_5_STREAMS,
  USER_GROWTH,
} from "./constants";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

app.get("/dashboard/metrics", (_, res: Response) => {
  res.send({
    metrics: METRICS,
  });
});

app.get("/dashboard/visuals/user-growth", (_, res: Response) => {
  res.send({
    userGrowth: USER_GROWTH,
  });
});

app.get("/dashboard/visuals/revenue-distribution", (_, res: Response) => {
  res.send({
    revenueDistribution: REVENUE_DISTRIBUTION,
  });
});

app.get("/dashboard/visuals/top-5-streams", (_, res: Response) => {
  res.send({
    topFiveStreams: TOP_5_STREAMS,
  });
});

app.get("/dashboard/recents", (req: Request, res: Response) => {
  const { page, limit } = req.query;
  if (!(page && limit)) {
    res.status(404).send({ err: "Page or/and limit missing" });
    return;
  }
  const p = Number(page),
    l = Number(limit);

  const start = (p - 1) * l;
  const end = start + l;

  const paginatedData = RECENT_STREAMS.slice(start, end);

  res.send({
    recents: paginatedData,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
