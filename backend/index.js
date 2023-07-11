import express from "express";

const app = express();

app.get("/transactions", (request, response) => {
  console.log("GET transactions");
  response.json([{ id: 1 }]);
});

app.listen(3000, () => console.log("API iniciado no localhost:3000"));
