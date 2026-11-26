/*
 * Selectable card used in onboarding (business type, plan).
 * Renders a visually hidden radio + the red square selector from the design.
 */
export function OptionCard({ value, registration, className = "", children }) {
  return (
    <label
      className={`relative block cursor-pointer rounded-[4px] border border-[#E4E4E7] bg-white pl-[57px] transition hover:border-[#FFA8A8] has-checked:border-[#FF6B6B] has-focus-visible:ring-2 has-focus-visible:ring-[#FF0000]/30 ${className}`}
    >
      <input type="radio" value={value} className="peer sr-only" {...registration} />
      <span
        aria-hidden
        className="absolute left-[27px] top-[31px] h-[15px] w-[15px] rounded-[3px] border border-[#E4E4E7] bg-white peer-checked:border-[#FF0000] peer-checked:bg-[#FF0000]"
      />
      {children}
    </label>
  );
}

export function OptionError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-[12px] text-[12px] text-[#FF0000]">
      {message}
    </p>
  );
}
