import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);
await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
        createdAt: f.date({ minDate: "2022-01-01", maxDate: "2023-01-01" }),
      },
    },
    questions: {
      count: 40,
      columns: {
        question: f.loremIpsum(),
        answer: f.loremIpsum(),
        createdAt: f.date({ minDate: "2022-01-01", maxDate: "2023-01-01" }),
      },
    },
  };
});

await sql.end();

console.log("Database seeded!");
