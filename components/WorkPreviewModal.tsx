"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { basePath, Work } from "@/data/works";
import { IconGlyph } from "./IconGlyph";
import { MagneticButton } from "./MagneticButton";
import { MockEnterpriseScreen } from "./MockEnterpriseScreen";

type WorkPreviewModalProps = {
  work: Work | null;
  onClose: () => void;
};

export function WorkPreviewModal({ work, onClose }: WorkPreviewModalProps) {
  useEffect(() => {
    if (!work) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.classList.remove("modal-open");
    };
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work ? (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.article className="case-modal" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 18 }} transition={{ duration: 0.28 }}>
            <button type="button" className="modal-close" aria-label="关闭案例预览" onClick={onClose}>
              <IconGlyph name="close" className="modal-close-icon" />
            </button>
            <div className="modal-preview">
              <MockEnterpriseScreen work={work} compact />
            </div>
            <div className="modal-copy">
              <p>{work.eyebrow}</p>
              <h3>{work.title}</h3>
              <span>{work.subtitle}</span>
              <div className="modal-tags">
                {work.tags.map((tag) => (
                  <i key={tag}>{tag}</i>
                ))}
              </div>
              <MagneticButton href={`${basePath}/#selected-works`}>进入 Demo</MagneticButton>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
