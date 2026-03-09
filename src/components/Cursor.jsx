import { useEffect, useRef } from "react";

export default function Cursor() {
  const c = useRef();
  const d = useRef();

  useEffect(() => {
    const fn = e => {
      if (c.current) { c.current.style.left = e.clientX + "px"; c.current.style.top = e.clientY + "px"; }
      if (d.current) { d.current.style.left = e.clientX + "px"; d.current.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <>
      <div id="p3c" ref={c} />
      <div id="p3d" ref={d} />
    </>
  );
}
