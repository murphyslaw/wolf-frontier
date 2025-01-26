import { ISql, sql } from "./db.ts";
import { DB_Type } from "./types/DatabaseTypes.ts";

export interface IType {
  id: number;
  name: string;
  image: string;
  category_name: string;
  group_name: string;
  mass: number;
  volume: number;
}

class TypeService {
  constructor(private db: ISql) {}

  public async count(): Promise<number> {
    const [result] = await this.db`
      SELECT COUNT(*)
      FROM types
    ;`;

    return result.count;
  }

  public async get(id: number): Promise<IType> {
    const [result] = await this
      .db<DB_Type[]>`
        SELECT
          t.id,
          t.name,
          t.image,
          t.category_name,
          t.group_name,
          t.mass,
          t.volume
        FROM
          types t
        WHERE TRUE
          AND t.id = ${id}
      ;`;

    return result;
  }

  public async find(query: string): Promise<IType[]> {
    const results = await this
      .db<DB_Type[]>`
        SELECT
          t.id,
          t.name,
          t.image,
          t.category_name,
          t.group_name,
          t.mass,
          t.volume
        FROM
          types t
        WHERE TRUE
          AND (
            LOWER(t.name) LIKE LOWER(${"%" + query + "%"})
            OR LOWER(t.category_name) LIKE LOWER(${"%" + query + "%"})
            OR LOWER(t.group_name) LIKE LOWER(${"%" + query + "%"})
          )
        ORDER BY
          name ASC
      ;`;

    return results;
  }

  public async findByCategory(category: string): Promise<IType[]> {
    const results = await this
      .db<DB_Type[]>`
        SELECT
          t.id,
          t.name,
          t.image,
          t.category_name,
          t.group_name,
          t.mass,
          t.volume
        FROM
          types t
        WHERE TRUE
          AND t.category_name = ${category}
        ORDER BY
          name ASC
      ;`;

    return results;
  }

  public patchName(type: IType): string {
    let name = "UNKNOWN";

    switch (type.id) {
      case 84213: {
        name = "Explorer";
        break;
      }
      case 85036: {
        name = "Forager";
        break;
      }
      case 84216: {
        name = "Gunboat";
        break;
      }
      default: {
        name = type.name;
        break;
      }
    }

    return name;
  }
}

export const typeService = new TypeService(sql);
