import styles from "./sacramento-skyline.module.css";

type SacramentoSkylineProps = {
  className?: string;
};

/** Sacramento skyline artwork (`public/sac.svg`). */
export function SacramentoSkyline({ className }: SacramentoSkylineProps) {
  return (
    <img
      src="/sac.svg"
      alt=""
      className={[styles.root, className].filter(Boolean).join(" ")}
      decoding="async"
      fetchPriority="high"
    />
  );
}
