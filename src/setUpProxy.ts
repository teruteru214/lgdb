import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app: Application) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3000", // バックエンドのサーバーURLを指定
      changeOrigin: true,
    })
  );
}
