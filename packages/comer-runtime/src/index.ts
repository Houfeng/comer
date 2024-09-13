import { resolve } from "path";
import { ComerApp } from "../binary/Comer.Runtime";

export * from "../binary/Comer.Runtime";

process.chdir(resolve(__dirname, "../binary"));

ComerApp.run = () => {
  ComerApp.tick();
  setImmediate(ComerApp.run);
};
