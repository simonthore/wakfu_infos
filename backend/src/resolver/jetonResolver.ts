import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Jeton, { JetonInput } from "../entity/Jeton";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";

@Resolver(Jeton)
export class JetonResolver {
  @Query(() => [Jeton])
  async jetons(): Promise<Jeton[]> {
    return await datasource.getRepository(Jeton).find();
  }

  @Query(() => Jeton, { nullable: true })
  async jeton(@Arg("id", () => Int) id: number): Promise<Jeton | null> {
    return await datasource.getRepository(Jeton).findOne({ where: { id } });
  }

  @Mutation(() => Jeton)
  async createJeton(@Arg("data") data: JetonInput): Promise<Jeton> {
    return await datasource.getRepository(Jeton).save(data);
  }

  @Mutation(() => Boolean)
  async deleteJeton(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(Jeton).delete(id);
    if (affected === 0) throw new ApolloError("Jeton not found", "NOT_FOUND");
    return true;
  }

  @Mutation(() => Jeton)
  async updateJeton(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: JetonInput
  ): Promise<Jeton> {
    await datasource.getRepository(Jeton).update(id, data);
    const updated = await datasource.getRepository(Jeton).findOne({ where: { id } });
    if (!updated) throw new ApolloError("Jeton not found", "NOT_FOUND");
    return updated;
  }
}
