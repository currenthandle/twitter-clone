export function Container({
  children,
  classNames = "",
}: {
  classNames?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`m-auto max-w-xl bg-slate-200 ${classNames}`}>
      {children}
    </div>
  );
}
