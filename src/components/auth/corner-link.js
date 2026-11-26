import Link from "next/link";

/* "You don't have an account ? Sign up" — top-right on desktop, below the card on mobile. */
export function CornerLink({ text, linkText, href }) {
  const content = (
    <>
      {text}{" "}
      <Link href={href} className="font-bold underline">
        {linkText}
      </Link>
    </>
  );
  return (
    <>
      <p className="absolute right-[40px] top-[60px] hidden text-[14px] text-[#FF0000] sm:block">
        {content}
      </p>
      <p className="order-last mt-6 text-[14px] text-[#FF0000] sm:hidden">{content}</p>
    </>
  );
}
