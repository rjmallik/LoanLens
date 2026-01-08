import Card from "./Card";

export default function EmptyState({
  title,
  body
}: {
  title: string;
  body: string;
}) {
  return (
    <Card title={title}>
      <p className="text-sm text-slate-700">{body}</p>
    </Card>
  );
}
