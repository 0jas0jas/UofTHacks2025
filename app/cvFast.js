// const Tesseract = require("tesseract.js");

import Tesseract from "tesseract.js";

const imagePath = "img_test.png";
import path from "path";

/*
let tesseractInstance = null;

// Function to initialize Tesseract instance (language models and core)
const initializeTesseract = () => {
  if (tesseractInstance) {
    console.log("Tesseract already initialized.");
    return Promise.resolve(tesseractInstance);
  }

  console.log("Initializing Tesseract...");
  return Tesseract.create({
    langPath: path.join(__dirname), // 'tessdata'),
    corePath: path.join(__dirname, "tesseract-core.wasm"),
  }).then((instance) => {
    tesseractInstance = instance; // Store the instance for reuse
    return tesseractInstance;
  });
};

// Function to recognize text from an image using the persistent Tesseract instance
const recognizeText = (imagePath) => {
  return initializeTesseract().then((tesseract) => {
    return tesseract
      .recognize(imagePath, "eng", {
        logger: (m) => console.log(m), // Log progress
      })
      .then(({ data: { text } }) => {
        return text;
      });
  });
};



*/

// Function to initialize the Tesseract instance
async function initializeTesseract() {
  // Path to the tesseract-core.wasm file and tessdata directory
  const corePath = process.env.PUBLIC_URL + "/core/tesseract-core.wasm";
  const langPath = process.env.PUBLIC_URL;

  // Initialize the Tesseract instance with langPath and corePath
  if (!tessInstance) {
    tessInstance = await Tesseract.create({
      langPath: langPath, // Path to tessdata directory
      corePath: corePath, // Path to tesseract-core.wasm
      logger: (m) => console.log(m), // Optional: log progress
    });
  }
  return tessInstance;
}

let tessInstance;
(async () => {
  tessInstance = await initializeTesseract();
})();

/*

// Function to reuse initialized Tesseract instance and recognize text
async function reuseTess(tesseractInstance, imagePath) {
  try {
    // Use the initialized Tesseract instance to recognize the text from the image
    const {
      data: { text },
    } = await tesseractInstance.recognize(imagePath);

    return text; // Return the recognized text
  } catch (error) {
    console.error("Error during OCR:", error);
    throw error; // Propagate error if OCR fails
  }
}

let output = "";
const promises = [];

for (let index = 0; index < 10; index++) {
  // Push each OCR task into the promises array
  promises.push(reuseTess(tessInstance, imagePath));
}

// Use Promise.all to wait for all OCR tasks to finish in parallel
const results = await Promise.all(promises);

// Concatenate all the results
for (let result of results) {
  output = output.concat(result); // Append the recognized text
}

console.log("Final Output: ", output);


*/
