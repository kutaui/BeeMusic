import { server } from "../src/utils/apollo-server";

it("runs a health check", async () => {
  const result = await server.executeOperation({
    query: `query posts { title }`,
  });
  console.log(result);
});
