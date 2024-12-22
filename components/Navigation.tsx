const items = [
  {
    href: "/characters",
    label: "Characters",
  },
  {
    href: "/tribes",
    label: "Tribes",
  },
  {
    href: "/killmails",
    label: "Killmails",
  },
  {
    href: "/solarsystems",
    label: "Solar Systems",
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
