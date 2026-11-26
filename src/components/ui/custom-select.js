"use client";

import { useEffect, useId, useRef, useState } from "react";

/*
 * Custom single-select dropdown (WAI-ARIA "select-only combobox" pattern).
 * Focus stays on the trigger; the highlighted option is exposed via
 * aria-activedescendant. Works as a controlled input: pass `value` + `onChange`
 * (e.g. from react-hook-form's <Controller />).
 *
 * options: string[] | { value: string, label: string }[]
 */
export function CustomSelect({
  id,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "",
  error,
  ref,
  "aria-describedby": describedBy,
}) {
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const selectedIndex = items.findIndex((o) => o.value === value);
  const selected = items[selectedIndex];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const typeahead = useRef({ text: "", timer: null });
  const listId = useId();
  const optionId = (i) => `${listId}-opt-${i}`;

  function openList() {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function closeList() {
    setOpen(false);
  }

  function choose(i) {
    onChange?.(items[i].value);
    closeList();
  }

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e) {
      if (!rootRef.current?.contains(e.target)) closeList();
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function jumpTo(char) {
    const t = typeahead.current;
    clearTimeout(t.timer);
    t.text += char.toLowerCase();
    t.timer = setTimeout(() => (t.text = ""), 500);
    const start = open ? active : selectedIndex;
    const order = [...items.keys()].map((k) => (k + start + 1) % items.length);
    const match =
      order.find((k) => items[k].label.toLowerCase().startsWith(t.text)) ??
      order.find((k) => items[k].label.toLowerCase().startsWith(char.toLowerCase()));
    if (match === undefined) return;
    if (open) setActive(match);
    else onChange?.(items[match].value);
  }

  function onKeyDown(e) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      } else if (e.key.length === 1 && /\S/.test(e.key)) {
        jumpTo(e.key);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, items.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(items.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (active >= 0) choose(active);
        break;
      case "Escape":
        e.preventDefault();
        closeList();
        break;
      case "Tab":
        closeList();
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) jumpTo(e.key);
    }
  }

  return (
    <div ref={rootRef} className="relative mt-[8px]">
      <button
        ref={ref}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
        onClick={() => (open ? closeList() : openList())}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={`flex h-[40px] w-full items-center justify-between rounded-[4px] border bg-white pl-[26px] pr-[14px] text-left text-[12px] outline-none transition focus:border-[#FF0000] ${
          error ? "border-[#FF0000]" : open ? "border-[#FF0000]" : "border-[#E4E4E7]"
        }`}
      >
        <span className={`truncate ${selected ? "text-black" : "text-[#8A8A8A]"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          aria-hidden
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#555"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        hidden={!open}
        className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-[240px] overflow-auto rounded-[4px] border border-[#E4E4E7] bg-white py-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      >
        {items.map((item, i) => {
          const isSelected = i === selectedIndex;
          return (
            <li
              key={item.value}
              id={optionId(i)}
              data-index={i}
              role="option"
              aria-selected={isSelected}
              // Keep focus on the trigger so it doesn't blur mid-selection.
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between px-[26px] py-[10px] text-[12px] leading-[16px] ${
                i === active ? "bg-[#FFF1F1]" : ""
              } ${isSelected ? "font-medium text-[#FF0000]" : "text-black"}`}
            >
              {item.label}
              {isSelected && (
                <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L19 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
