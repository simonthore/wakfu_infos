import { AppDataSource } from '../data-source';
import Jeton from '../entities/Jeton';

export const jetonResolver = {
  Query: {
    jetons: async () => {
      const repo = AppDataSource.getRepository(Jeton);
      return repo.find();
    },
    jeton: async (_: any, { id }: { id: number }) => {
      const repo = AppDataSource.getRepository(Jeton);
      return repo.findOneBy({ id });
    },
  },
  Mutation: {
    createJeton: async (_: any, { input }: { input: Partial<Jeton> }) => {
      const repo = AppDataSource.getRepository(Jeton);
      const newJeton = repo.create(input);
      return repo.save(newJeton);
    },
    updateJeton: async (_: any, { id, input }: { id: number, input: Partial<Jeton> }) => {
      const repo = AppDataSource.getRepository(Jeton);
      await repo.update(id, input);
      return repo.findOneBy({ id });
    },
    deleteJeton: async (_: any, { id }: { id: number }) => {
      const repo = AppDataSource.getRepository(Jeton);
      const jeton = await repo.findOneBy({ id });
      if (jeton) await repo.remove(jeton);
      return jeton;
    },
  },
};
