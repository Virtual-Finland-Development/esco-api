export async function getKnownEscoCodesAsDefinedByDataspace(): Promise<string[]> {
  const definitionUrl = "https://raw.githubusercontent.com/Virtual-Finland/definitions/main/DataProducts/Employment/EscoOccupations_v1.0.json";
  const response = await fetch(definitionUrl);
  const responseData = await response.json();
  const escoCodes = responseData["components"]["schemas"]["EscoCode"]["enum"];
  if (!(escoCodes instanceof Array)) {
    throw new Error("Invalid definition response");
  }
  return escoCodes;
}
