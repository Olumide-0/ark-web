/*
 * 1 — 2 — 3 progress indicator. `current` is 1-based.
 * Per the design: only the current circle is solid red, and only the line
 * leading out of the current step is red (on the last step, the line leading
 * into it); everything else is pale.
 */
export function Stepper({ current, total = 3 }) {
  const redLine = current < total ? current : total - 1;
  return (
    <ol className="flex items-center" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        return (
          <li key={step} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden
                className={`h-[3px] w-[103px] ${i === redLine ? "bg-[#FF0000]" : "bg-[#FFD1D1]"}`}
              />
            )}
            <span
              aria-current={step === current ? "step" : undefined}
              className={`flex h-[44px] w-[44px] items-center justify-center rounded-full text-[15px] font-semibold text-white ${
                step === current ? "bg-[#FF0000]" : "bg-[#FFA8A8]"
              }`}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
