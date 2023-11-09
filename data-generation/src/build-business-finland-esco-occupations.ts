import { getKnownEscoCodesAsDefinedByDataspace } from "./services/DataspaceDefinitions";
import api from "./services/EscoDataServer";
import config from "./utils/config";
import { saveDataToJSONFile } from "./utils/files";

async function main() {
  console.log("> Fetching dependencies..");
  const knownEscoCodes = await getKnownEscoCodesAsDefinedByDataspace();
  console.log(`> -- found ${knownEscoCodes.length} esco codes from the definitions.`);

  console.log("> Fetching occupations..");
  const allOccupations = await api.getOccupations();
  const obsoletes: any[] = [];
  const unknowns: any[] = [];
  const occupations: any[] = [];

  for (const item of allOccupations) {
    if (item.status === "obsolete") {
      obsoletes.push(item);
    } else if (knownEscoCodes.includes(item.code)) {
      occupations.push(item);
    } else {
      unknowns.push(item);
    }
  }

  // Log counts
  console.log("> Finished fetching occupations:");
  console.log("Total of", allOccupations.length, "items");
  console.log("Goods", occupations.length);
  console.log("Obsoletes", obsoletes.length);
  console.log("Unknown", unknowns.length);
  console.log("Wanted total", knownEscoCodes.length, "items");
  if (knownEscoCodes.length === occupations.length) {
    console.log("> All good!");
  } else {
    console.log("> Counts mismatch!");
  }

  // Handle the results
  if (occupations.length > 0) {
    const packagedResults = occupations.map((item: any) => {
      return {
        escoCode: item.code,
        escoJobTitle: item.title,
        alternativeTitles: item.alternativeLabel.en instanceof Array ? item.alternativeLabel.en : [],
        escoDescription: item.description.en.mimetype === "plain/text" ? item.description.en.literal : "",
        escoIdentifier: item.uri,
      };
    });

    // Sort by notation, ascending
    packagedResults.sort((a, b) => {
      const partsA = a.escoCode.split(".");
      const partsB = b.escoCode.split(".");

      if (partsA.length !== partsB.length) {
        return partsA.length - partsB.length;
      }

      let weight = 0;
      for (let index = 0; index < partsA.length; index++) {
        const partA = parseInt(partsA[index]);
        const partB = parseInt(partsB[index]);
        if (partA < partB) {
          weight--;
        }
        if (partA > partB) {
          weight++;
        }
      }
      return weight;
    });

    const filePath = `${config.outDir}/business-finland-esco-v1_1_1-occupations.json`;
    console.log("Saving to", filePath);
    await saveDataToJSONFile(filePath, packagedResults);

    if (unknowns.length > 0) {
      console.log("Storing as debug reference to 'unknowns.json'");
      await saveDataToJSONFile("./unknowns.json", unknowns);
    }
  } else {
    console.log("No results");
  }
}

main();
