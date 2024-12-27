import { OnlineIndicator } from "./OnlineIndicator.tsx";

interface Props {
  linked: boolean;
}

export function LinkedSmartGateBadgeIndicator({ linked }: Props) {
  const state = linked ? "linked" : "unconnected";
  const dataAttributes = {
    "data-state": state,
  };

  return (
    <span class="labelSmall badge linkedBadge" {...dataAttributes}>
      <OnlineIndicator online={linked} />
      {state}
    </span>
  );
}
