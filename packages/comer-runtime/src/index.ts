import { resolve } from "path";
import { Application } from "../binary/Comer.Runtime";

export * from "../binary/Comer.Runtime";

process.chdir(resolve(__dirname, "../binary"));

Application.run = () => {
  Application.tick();
  setImmediate(Application.run);
};
