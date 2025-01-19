const Tesseract = require("tesseract.js");
const imagePath = "img_test.png";
const path = require("path");

// below code works well
/*
function readImage(imagePath) {
  if (!imagePath) {
    throw new Error("Image path is required");
  } else {
    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m), // track progress
    }).then(({ data: { text } }) => {
      console.log(text); // output extracted text
    });
  }
}

const result = readImage(imagePath);
console.log(result);
*/

function readImage(imagePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      imagePath,
      "eng", // Language set to English
      {
        logger: (m) => console.log(m), // Logging progress
      }
    )
      // handling Tesseract errors
      .then(({ data: { text } }) => {
        console.log(text);
        resolve(text); // Return the extracted text
      })
      .catch((error) => {
        console.error("Error processing image:", error);
        reject(error); // Return error if OCR fails
      });
  });
}

module.exports = readImage;

/*
const result = readImage(imagePath);
console.log(result);
*/
