import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);
await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
        createdAt: f.date({ minDate: "2025-01-06", maxDate: "2025-04-06" }),
      },
    },
    questions: {
      count: 20,
      columns: {
        question: f.loremIpsum(),
        answer: f.loremIpsum(),
        createdAt: f.date({ minDate: "2025-05-05", maxDate: "2023-07-07" }),
      },
    },
  };
});

await sql.end();

console.log("Database seeded!");
