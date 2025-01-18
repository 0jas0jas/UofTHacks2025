const readImage = require("./cv"); // Adjust the path if needed

async function processAndUseText(imagePath) {
  try {
    // Call the processImage function and await its result
    const extractedText = await readImage(imagePath);

    // Use the extracted text for further processing (e.g., count words)
    console.log("Extracted Text:", extractedText);

    const wordCount = extractedText.split(" ").length;
    console.log("Word Count:", wordCount);

    return { extractedText, wordCount };
  } catch (error) {
    console.error("Error in processing the image:", error);
  }
}

// stress test
const imagePath = "img_test.png";

async function stressTest(imagePath) {
  try {
    let output = "";
    for (let index = 0; index < 10; index++) {
      const result = await processAndUseText(imagePath);
      output = output.concat(result.extractedText);
    }

    console.log(output);
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

stressTest(imagePath);

/*
processAndUseText(imagePath).then((result) => {
        console.log("Final Result:", result);
      }); 
*/
