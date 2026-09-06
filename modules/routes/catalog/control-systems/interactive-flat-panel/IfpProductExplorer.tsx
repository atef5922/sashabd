"use client";

import { useRef, useState } from "react";
import { interactiveFlatPanelCatalog } from "./catalog";
import IfpIcon from "./IfpIcon";
import IfpHomeProductCard from "./IfpHomeProductCard";
import styles from "./ifp.module.css";

const brands = [...new Set(interactiveFlatPanelCatalog.map((panel) => panel.brand))];
const sizes = [...new Set(interactiveFlatPanelCatalog.map((panel) => panel.sizeInch))].sort((a, b) => a - b);
const initialCount = 6;

export default function IfpProductExplorer() {
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const expandedModels = useRef<HTMLDetailsElement>(null);
  const panels = interactiveFlatPanelCatalog.filter((panel) => (!brand || panel.brand === brand) && (!size || String(panel.sizeInch) === size));
  const reset = () => { setBrand(""); setSize(""); };
  return (
    <div data-ifp-explorer>
      <div className={styles.filterBar}>
        <div className={styles.filterFields}>
          <label>Brand<select value={brand} onChange={(event) => setBrand(event.target.value)}><option value="">All brands</option>{brands.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label>Screen size<select value={size} onChange={(event) => setSize(event.target.value)}><option value="">All sizes</option>{sizes.map((item) => <option key={item} value={item}>{item} inch</option>)}</select></label>
          <button className={styles.resetButton} type="button" disabled={!brand && !size} onClick={reset}>Clear filters</button>
        </div>
        <p role="status" aria-live="polite" aria-atomic="true">{panels.length} matching {panels.length === 1 ? "model" : "models"}</p>
      </div>
      <div className={styles.grid3}>{panels.slice(0, initialCount).map((panel) => <IfpHomeProductCard key={panel.slug} panel={panel} />)}</div>
      {panels.length > initialCount ? (
        <details className={styles.moreModels} key={`${brand}-${size}`} ref={expandedModels}>
          <summary><span className={styles.showMore}>View All {panels.length} Models</span><span className={styles.showLess}>Show Fewer Models</span><IfpIcon name="arrow" /></summary>
          <div className={styles.grid3}>{panels.slice(initialCount).map((panel) => <IfpHomeProductCard key={panel.slug} panel={panel} />)}</div>
          <button type="button" className={styles.collapseModels} onClick={() => {
            const details = expandedModels.current;
            if (!details) return;
            details.open = false;
            const summary = details.querySelector("summary");
            summary?.focus({ preventScroll: true });
            summary?.scrollIntoView({ block: "center", behavior: "auto" });
          }}>Show Fewer Models <IfpIcon name="arrow" /></button>
        </details>
      ) : null}
      {panels.length === 0 ? <div className={styles.emptyState}><IfpIcon name="screen" /><h3>No matching panel in this selection</h3><p>Try another brand or screen size, or ask us for a suitable configuration.</p><button type="button" className={styles.outlineButton} onClick={reset}>View all models</button></div> : null}
      <p className={styles.note}>Features, operating system and OPS compatibility vary by model. Confirm the exact specification, availability and installation scope before ordering.</p>
    </div>
  );
}
