import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const StatCounter = ({ value, suffix = "", label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card p-6 text-center"
    >
      <p className="font-mono text-4xl font-bold text-accent">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </motion.div>
  );
};

export default StatCounter;
