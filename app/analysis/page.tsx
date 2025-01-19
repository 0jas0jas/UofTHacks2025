import AnalPage from "@/components/anal";
import { annotateDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API});

let code = `function func(arr): 
                x = 5 `;

const instructions = `Analyze the following pseudocode. Give a short title, description, time complexity 
and space complexity, and python implementation of the code in the following dictionary format.  ONLY RETURN THE JSON OBJECT, NOTHING ELSE
{ title: "Karatsuba's Algorithm", description: "A divide and conquer algorithm for fast multiplication", time: "O(logn)", space: "O(n)" , python: "python code here"}`;

code = code.concat(instructions);

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a skilled developer who will analyze input peices of pseudocode and give feedback on it." },
        {
            role: "user",
            content: code,
        },
    ],
});



let answer = `${completion.choices[0].message.content}`;
console.log(answer);
console.log(typeof(answer));


let answerClean = JSON.parse(answer);


// answer = answer.replace(/"/g, '\\"');

// answer = answer.replace(/n/g, '');

console.log(answer);
console.log(typeof(answer));


/*
let answerClean = JSON.parse(`{
  "title": "Merge Sort",
  "description": "A divide and conquer algorithm that sorts an array by recursively splitting it into halves, sorting each half, and then merging the sorted halves back together.",
  "time": "O(n log n)",
  "space": "O(n)"
}`);
*/

const title = answerClean.title;
const time = answerClean.time;
const space = answerClean.space;
const description = answerClean.description;
const python = answerClean.python;

function rate(time : string, space : string) : number {
  let score : number = 0;
  switch (time) {
    case "O(1)": // same logic as logn so move on to that case
    case "O(log n)":
      score += 5;
      break;
    case "O(n)":
      score += 4;
      break;
    case "O(n log n)":
      score += 3;
      break;
    case "O(n^2)":
      score += 2;
      break;
    default:
      score += 1;
  }

  switch (space) {
    case "O(1)": // same logic as logn so move on to that case
    case "O(log n)":
      score += 5;
      break;
    case "O(n)":
      score += 4;
      break;
    case "O(n log n)":
      score += 3;
      break;
    case "O(n^2)":
      score += 2;
      break;
    default:
      score += 1;
  }  
  

  return Math.floor(score / 2);;
}

const star = "⭐";
const stars = star.repeat(rate(time, space));

export default function Analysis() {
  return (
    <AnalPage 
      headerText={title}
      ratingText={stars}
      codeText={python}
      descriptionText={description}
      timeComplex={time}
      spaceComplex={space}
     // pythonCode={python}
      />
  );
}