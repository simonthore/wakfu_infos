import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { ApolloError } from "apollo-server-errors";
import datasource from "../db";
import Jeton, { JetonInput } from "../entity/Jeton";

@Resolver(Jeton)
export class JetonResolver {
  // --- QUERY: récupérer tous les jetons ---
  @Query(() => [Jeton])
  async jetons(): Promise<Jeton[]> {
    return await datasource.getRepository(Jeton).find();
  }

  // --- QUERY: récupérer un jeton par ID ---
  @Query(() => Jeton, { nullable: true })
  async jeton(@Arg("id", () => Int) id: number): Promise<Jeton | null> {
    return await datasource.getRepository(Jeton).findOne({ where: { id } });
  }

  // --- MUTATION: créer un jeton ---
  @Mutation(() => Jeton)
  async createJeton(@Arg("data") data: JetonInput): Promise<Jeton> {
    const jeton = datasource.getRepository(Jeton).create(data);
    return await datasource.getRepository(Jeton).save(jeton);
  }

  // --- MUTATION: mettre à jour un jeton ---
  @Mutation(() => Jeton)
  async updateJeton(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: JetonInput
  ): Promise<Jeton> {
    const repo = datasource.getRepository(Jeton);
    const jeton = await repo.findOne({ where: { id } });
    if (!jeton) throw new ApolloError("Jeton not found", "NOT_FOUND");

    // Met à jour les champs
    Object.assign(jeton, data);
    return await repo.save(jeton);
  }

  // --- MUTATION: supprimer un jeton ---
  @Mutation(() => Boolean)
  async deleteJeton(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(Jeton).delete(id);
    if (affected === 0) throw new ApolloError("Jeton not found", "NOT_FOUND");
    return true;
  }
}
