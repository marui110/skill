export function AppPageHeader({
  title,
  titleAddon,
  children,
}: {
  title: React.ReactNode;
  titleAddon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="ui-topbar flex items-center gap-3 border-b px-6 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <h1 className="ui-text-title shrink-0">{title}</h1>
        {titleAddon}
      </div>
      <span className="flex-1" />
      {children}
    </header>
  );
}
