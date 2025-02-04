import express, { Request, Response } from "express";
import cors from "cors";

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
const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

app.get("/dashboard/metrics", (_, res: Response) => {
  setTimeout(() => {
    res.send({
      metrics: METRICS,
    });
  }, 3000);
});

app.get("/dashboard/visuals/user-growth", (_, res: Response) => {
  setTimeout(() => {
    res.send({
      userGrowth: USER_GROWTH,
    });
  }, 1000);
});

app.get("/dashboard/visuals/revenue-distribution", (_, res: Response) => {
  setTimeout(() => {
    res.send({
      revenueDistribution: REVENUE_DISTRIBUTION,
    });
  }, 2500);
});

app.get("/dashboard/visuals/top-5-streams", (_, res: Response) => {
  setTimeout(() => {
    res.send({
      topFiveStreams: TOP_5_STREAMS,
    });
  }, 500);
});

app.get("/dashboard/recents", (req: Request, res: Response) => {
  const { page, limit, sort, artistOrSong } = req.query;

  // Filter
  let filteredData = RECENT_STREAMS.filter((item) => {
    if (artistOrSong) {
      return item["Song Name"] === artistOrSong || item.Artist === artistOrSong;
    } else {
      return item;
    }
  });

  // Sort
  if (sort) {
    switch (sort) {
      case "DATE_ASC":
        filteredData = filteredData.sort(
          (a, b) =>
            new Date(a["Date Streamed"]).getTime() -
            new Date(b["Date Streamed"]).getTime()
        );
        break;
      case "DATE_DSC":
        filteredData = filteredData.sort(
          (a, b) =>
            new Date(b["Date Streamed"]).getTime() -
            new Date(a["Date Streamed"]).getTime()
        );
        break;
      case "STREAM_COUNT_ASC":
        filteredData = filteredData.sort(
          (a, b) => a["Stream Count"] - b["Stream Count"]
        );
        break;
      case "STREAM_COUNT_DSC":
        filteredData = filteredData.sort(
          (a, b) => b["Stream Count"] - a["Stream Count"]
        );
        break;
      default:
        break;
    }
  }

  // Paginate
  if (!(page && limit)) {
    res.status(404).send({ err: "Page or/and limit missing" });
    return;
  }
  const p = Number(page),
    l = Number(limit);

  const start = (p - 1) * l;
  const end = start + l;

  const paginatedData = filteredData.slice(start, end);

  setTimeout(() => {
    res.send({
      recents: paginatedData,
      totalLength: filteredData.length,
    });
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
