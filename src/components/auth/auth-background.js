import { ArkMark } from "@/components/ark-mark";

/*
 * Large faded ARK mark behind the auth card. Each screen positions it
 * differently in Figma, so pages pass their own placement (px values).
 */
const DEFAULT = { left: -243, top: -167, width: 1022 };

export function AuthBackground({ left, top, width } = DEFAULT) {
  const w = width ?? DEFAULT.width;
  return (
    <ArkMark
      className="pointer-events-none absolute -z-10 select-none"
      style={{
        color: "#FF0000",
        opacity: 0.1,
        left: left ?? DEFAULT.left,
        top: top ?? DEFAULT.top,
        width: w,
        height: (w * 853) / 800,
      }}
    />
  );
}
