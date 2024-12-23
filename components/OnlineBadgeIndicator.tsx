import { OnlineIndicator } from "./OnlineIndicator.tsx";

interface Props {
  online: boolean;
}

export function OnlineBadgeIndicator({ online }: Props) {
  const state = online ? "online" : "offline";
  const dataAttributes = {
    "data-state": state,
  };

  return (
    <span class="labelSmall badge onlineBadge" {...dataAttributes}>
      <OnlineIndicator online={online} />
      {state}
    </span>
  );
}
