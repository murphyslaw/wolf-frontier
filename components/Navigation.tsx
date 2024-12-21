const items = [
  {
    href: "/characters",
    label: "Characters",
  },
  {
    href: "/news",
    label: "News",
  },
];

export function Navigation() {
  const navElements = items.map((item) => <a href={item.href}>{item.label}</a>);

  return (
    <nav class="flex flex-row gap-10">
      {navElements}
    </nav>
  );
}
