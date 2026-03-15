import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { REGIONS, CITIES } from "./cities-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🏙️ Seeding all Israeli cities...\n");

  // Create or find regions
  const regionMap = new Map<string, string>();

  for (const regionName of REGIONS) {
    const existing = await prisma.region.findFirst({ where: { name: regionName } });
    if (existing) {
      regionMap.set(regionName, existing.id);
      console.log(`  ✓ Region exists: ${regionName}`);
    } else {
      const region = await prisma.region.create({ data: { name: regionName } });
      regionMap.set(regionName, region.id);
      console.log(`  + Region created: ${regionName}`);
    }
  }

  console.log(`\n📍 Processing ${CITIES.length} cities...\n`);

  let created = 0;
  let skipped = 0;

  for (const city of CITIES) {
    const regionId = regionMap.get(city.region);
    if (!regionId) {
      console.error(`  ✗ Region not found for city ${city.name}: ${city.region}`);
      continue;
    }

    const existing = await prisma.city.findFirst({ where: { name: city.name } });
    if (existing) {
      // Update region assignment if needed
      if (existing.regionId !== regionId) {
        await prisma.city.update({
          where: { id: existing.id },
          data: { regionId, lat: city.lat, lng: city.lng, population: city.population },
        });
        console.log(`  ↻ Updated region for: ${city.name}`);
      } else {
        skipped++;
      }
    } else {
      await prisma.city.create({
        data: {
          name: city.name,
          regionId,
          lat: city.lat,
          lng: city.lng,
          population: city.population,
        },
      });
      created++;
      console.log(`  + Created: ${city.name}`);
    }
  }

  console.log(`\n🎉 Done! Created: ${created}, Skipped (existing): ${skipped}`);

  // Print summary by region
  console.log("\n📊 Cities per region:");
  for (const regionName of REGIONS) {
    const regionId = regionMap.get(regionName)!;
    const count = await prisma.city.count({ where: { regionId } });
    console.log(`  ${regionName}: ${count} cities`);
  }

  const totalCities = await prisma.city.count();
  console.log(`\n  Total: ${totalCities} cities`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
