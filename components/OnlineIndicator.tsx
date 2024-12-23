interface Props {
  online: boolean;
}

export function OnlineIndicator({ online }: Props) {
  const state = online ? "online" : "offline";
  const dataAttributes = {
    "data-state": state,
  };

  return <span class="onlineIndicator" {...dataAttributes} title={state}>
  </span>;
}
