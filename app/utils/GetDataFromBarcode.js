import ConstructItem from "./ConstructItem";

/**
 * Gets product information from OpenFoodFacts API using scanned barcode.
 * @return the relevant product data if it is found in database, as a JSON object
 * @return undefined if not found
 * @return "error" if there is an error fetching the data
 */
export default GetDataFromBarcode = async (barcode) => {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  /**
   * OpenFoodFacts state:
   * For "READ AND SEARCH operations no authentication is required."
   * However, you have to add a User-Agent HTTP Header with the name of your app, the version,
   * system and a url (if any), not to be blocked by mistake.
   * For example: User-Agent: NameOfYourApp - Android - Version 1.0 - www.yourappwebsite.com
   */
  const userAgent = "The Pendle Fridge - Android/iOS - Version 1.0 - N/A";

  //abort the fetch if it takes longer than 20 seconds
  const controller = new AbortController();
  const signal = controller.signal;
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    let response = await fetch(url, {
      headers: { "USER-AGENT": userAgent },
      signal,
    });
    clearTimeout(timeout);

    const data = await response.json();

    //if product is found in database, extract desired data
    if (data.product) {
      const productName = data.product.product_name;
      const itemSize = data.product.quantity;
      const labels = data.product.labels;
      const ingredients = data.product.ingredients_text_en;
      const allergens = data.product.allergens;
      const traces = data.product.traces;
      const image =
        data.product.image_url !== null
          ? data.product.image_url
          : require("../assets/images/no-image.png");
      const keywords = data.product._keywords;

      //construct and return JSON object item from data for console use
      const foodItem = ConstructItem(
        barcode,
        productName,
        1,
        itemSize,
        ingredients,
        allergens,
        traces,
        image,
        keywords
      );
      return JSON.parse(foodItem);
    }
    //return undefined if product not in database
    else {
      console.log("Product not found!");
      return undefined;
    }
  } catch (error) {
    if (error.name === "AbortError") {
      return "abort error";
    } else {
      return "error";
    }
  }
};
