import api from "./services/escoApi";
import config from "./utils/config";
import { saveDataToJSONFile } from "./utils/files";
import { omitObjectKeysNotIn } from "./utils/helpers";

async function main() {
  const results = await api.getSkills();
  // Handle the results
  if (results.length > 0) {
    console.log("Retrieved", results.length, "items");
    const packagedResults = results
      .filter((item: any) => item.status === "released")
      .map((item: any) => {
        return {
          uri: item.uri,
          prefLabel: omitObjectKeysNotIn(item.preferredLabel, ["en", "fi", "sv"]),
        };
      });
    console.log("Filtered and packaged", packagedResults.length, "items");

    const filePath = `${config.outDir}/skills.json`;
    console.log("Saving to", filePath);
    await saveDataToJSONFile(filePath, packagedResults);
  } else {
    console.log("No results");
  }
}

main();
