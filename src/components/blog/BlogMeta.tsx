import { CalendarDays, Clock, UserRound } from "lucide-react";

type BlogMetaProps = {
  publishedAt: string;
  readingTime: string;
  author?: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogMeta({ publishedAt, readingTime, author }: BlogMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-body">
      <span className="inline-flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-primary" />
        {formatDate(publishedAt)}
      </span>
      {author ? (
        <span className="inline-flex items-center gap-2">
          <UserRound className="h-4 w-4 text-primary" />
          {author}
        </span>
      ) : null}
      <span className="inline-flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        {readingTime}
      </span>
    </div>
  );
}
