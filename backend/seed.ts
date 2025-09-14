import datasource from "./src/db";
import Jeton from "./src/entity/Jeton";

const seed = async () => {
  await datasource.initialize();

  const jetons = [
    { nom: "Fer Luisant", description: "Un jeton rare", lieuObtention: "Amakna", lieuEchange: "Astrub", rarete: "Epic" },
    { nom: "Pierre Mystique", description: "Très rare", lieuObtention: "Bonta", lieuEchange: "Brâkmar", rarete: "Legendary" },
  ];

  const repo = datasource.getRepository(Jeton);
  for (const j of jetons) {
    const jeton = repo.create(j);
    await repo.save(jeton);
  }

  console.log("✅ Données ajoutées !");
  process.exit(0);
};

seed().catch(console.error);
