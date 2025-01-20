// filepath: /home/f1shf1sh/Documents/UofTHacks2025/app/analysis/page.tsx
'use client';

import AnalysisPageComp from "@/components/anal";

import React, { useEffect, useState, Suspense } from 'react';
import OpenAI from 'openai';
import { useSearchParams } from 'next/navigation';
import { saveAs } from 'file-saver';
import { Button } from "@heroui/button";

interface AnalPageProps {
  code: string;
}

const AnalPage: React.FC<AnalPageProps> = ({ code }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
        throw new Error('OpenAI API key is missing');
      }
      const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

      const instructions = `Analyze the following pseudocode. Give a short title, description, time complexity 
      and space complexity, and python implementation (with new line characters at the right places) of the code in the following string format. RETURN THE TEXT ONLY IN THE FOLLOWING FORMAT. RESPECT IT STRICTLY AND SEPARATE BY @ SYMBOLS 
      {Karatsuba Algorithm @ A divide and conquer algorithm for fast multiplication @ O(logn) @ O(n) @ def karatsuba(x, y):\n    if x < 10 or y < 10:\n        return x * y\n    n = max(len(str(x)), len(str(y)))\n    m = n // 2\n    xh, xl = divmod(x, 10**m)\n    yh, yl = divmod(y, 10**m)\n    s1 = karatsuba(xh, yh)\n    s2 = karatsuba(xl, yl)\n    s3 = karatsuba(xh + xl, yh + yl) - s1 - s2\n    return s1 * 10**(2*m) + s3 * 10**m + s2"}`;

      const fullCode = code.concat(instructions);
      let completion;
      try {
        completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a skilled developer who will analyze input pieces of pseudocode and give feedback on it.' },
            { role: 'user', content: fullCode },
          ],
        });
        setAnalysis(completion.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching completion:', error);
        setAnalysis('Error fetching analysis. Please try again later.');
      }
    };

    if (code) {
      fetchAnalysis();
    }
  }, [code]);


  // let answer = analysis;

  function extractInfo(answer: string) {
    const parts = answer.split("@").map((part) => part.trim());
    const title = parts[0].substring(1); // remove beginning comma
    const description = parts[1];
    const time = parts[2];
    const space = parts[3];
    const python = parts[4].substring(0, parts[4].length - 1); // remove end comma

    return { title, description, time, space, python };
}

function rate(time: string, space: string): number {
  let score: number = 0;
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

let { title, description, time, space, python } = analysis ? extractInfo(analysis) : { title: '', description: '', time: '', space: '', python: '' };
const star = "⭐";
const stars = star.repeat(rate(time, space));

const createHtmlFile = (title: string, description: string, time: string, space: string, python: string, stars: string) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-[#f0f0f0] p-16">
    <div class="grid grid-cols-4 grid-rows-5 gap-4">
        <div class="col-span-2 text-5xl font-extrabold text-left" id="headerText">${title}</div>
        <div class="col-span-2 col-start-1 row-start-4 text-4xl font-bold border border-current flex justify-center items-center rounded-lg">
            Complexity Analysis
        </div>
        <div class="col-span-2 col-start-3 row-start-1 text-5xl" id="ratingText">${stars}</div>
        <div class="col-span-2 row-span-4 col-start-3 row-start-2">
            <div class="h-96 border rounded-lg">
                <div class="text-right p-2 border-b">.py</div>
                <div class="text-center text-3xl font-bold p-4" id="codeText">${python}</div>
            </div>
        </div>
        <div class="col-span-2 row-span-2 col-start-1 row-start-2">
            <div class="h-full p-2 border rounded-lg">
                <div class="p-4" id="descriptionText">${description}</div>
            </div>
        </div>
        <div class="row-start-5">
            <div class="border rounded-lg p-4 text-center text-3xl font-bold" id="timeComplex">${time}</div>
        </div>
        <div class="row-start-5">
            <div class="border rounded-lg p-4 text-center text-3xl font-bold" id="spaceComplex">${space}</div>
        </div>
    </div>
</body>
</html>
  `;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  saveAs(blob, `${title}.html`);
};

  return (
    <div>
      {analysis ? (
        <div>
          
          <AnalysisPageComp
                          headerText={title}
                          ratingText={stars}
                          codeText={python}
                          descriptionText={description}
                          timeComplex={time}
                          spaceComplex={space}
                      />
                      <Button onPress={() => {
                        createHtmlFile(title, description, time, space, python, stars);
                        saveAs(title+'.html', title+'.html');
                        }}>
                          Save analysis
                      </Button>
        </div>
      ) : (
        <p>Loading analysis...</p>
      )}
    </div>
  );
};

const AnalysisPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('text') || '';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalPage code={searchText} />
    </Suspense>
  );
};

export default AnalysisPage;