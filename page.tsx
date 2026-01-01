import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 콘솔 출력 완전 비활성화
if (process.env.NODE_ENV === 'production' || true) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.trace = () => {};
  console.table = () => {};
  console.group = () => {};
  console.groupEnd = () => {};
  console.groupCollapsed = () => {};
  console.time = () => {};
  console.timeEnd = () => {};
  console.count = () => {};
  console.assert = () => {};
  console.clear = () => {};
  console.dir = () => {};
  console.dirxml = () => {};
}

createRoot(document.getElementById("root")!).render(<App />);
