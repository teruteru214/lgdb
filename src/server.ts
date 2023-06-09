import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/v4",
  createProxyMiddleware({
    target: "https://api.igdb.com",
    changeOrigin: true,
    pathRewrite: {
      "^/v4": "/v4",
    },
  })
);

app.listen(3000, () => {
  console.log("Proxy server is running at http://localhost:3000");
});
