import { FreshContext } from "$fresh/server.ts";
import Type from "../../components/Type.tsx";
import Ship from "../../components/types/Ship.tsx";
import { typeService } from "../../utils/TypeService.ts";

export default async function TypeDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const typeId = Number(ctx.params.id);
  const type = await typeService.get(typeId);

  if (!type) {
    return ctx.renderNotFound();
  }

  const Component = type.category_name === "Ship" ? Ship : Type;

  return (
    <>
      <Component type={type} />
    </>
  );
}
