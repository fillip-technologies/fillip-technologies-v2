type HomeSectionTitleProps = {
  text: string;
  className?: string;
};

const baseTitleClass =
  "text-[32px] font-bold leading-[1.08] tracking-tight text-heading md:text-[42px] lg:text-[48px]";

function splitHighlightedWords(text: string) {
  const words = text.trim().split(/\s+/);
  const highlightCount = words.length > 3 ? 2 : 1;
  const splitIndex = Math.max(words.length - highlightCount, 1);

  return {
    lead: words.slice(0, splitIndex).join(" "),
    highlight: words.slice(splitIndex).join(" "),
  };
}

export default function HomeSectionTitle({ text, className = "" }: HomeSectionTitleProps) {
  const { lead, highlight } = splitHighlightedWords(text);

  return (
    <h2 className={`${baseTitleClass} ${className}`.trim()}>
      {lead ? `${lead} ` : null}
      <span className="highlight-text">{highlight}</span>
    </h2>
  );
}
