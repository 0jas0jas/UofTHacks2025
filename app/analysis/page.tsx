
import AnalPage from "@/components/anal";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});



export default function Analysis() {
  return (
    <AnalPage 
      headerText={"What this code does"}
      ratingText={"⭐⭐⭐⭐⭐"}
      codeText={"Bunch o code"}
      descriptionText={"This is the description of this code, we should probably add something here"}
      timeComplex={"O(log n)"}
      spaceComplex={"O(n^3)"}
      />
  );
}
