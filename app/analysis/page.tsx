import AnalPage from "@/components/anal";
import { annotateDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API});

let code = `function fn(arr, target):
    left = 0
    right = length of arr - 1

    while left <= right:
        mid = (left + right) / 2

        if arr[mid] == target:
            return mid  
        else if arr[mid] < target:
            left = mid + 1  
        else:
            right = mid - 1  

    return -1 `;

const instructions = `Analyze the following pseudocode. Give a short title, description, time complexity 
and space complexity of the code in the following dictionary format. ONLY RETURN THE JSON OBJECT, NOTHING ELSE
{ title: "Karatsuba's Algorithm", description: "A divide and conquer algorithm for fast multiplication", time: "O(logn)", space: "O(n)" }`;

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


answer = answer.replace(/"/g, '\\"');

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
 

export default function Analysis() {
  return (
    <AnalPage 
      headerText={title}
      ratingText={"⭐⭐⭐⭐⭐"}
      codeText={"Bunch o code"}
      descriptionText={description}
      timeComplex={time}
      spaceComplex={space}
      />
  );
}