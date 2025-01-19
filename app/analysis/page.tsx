// filepath: /home/f1shf1sh/Documents/UofTHacks2025/app/analysis/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { useSearchParams } from 'next/navigation';

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
      and space complexity, and python implementation of the code in the following string format. RETURN THE TEXT ONLY IN THE FOLLOWING FORMAT. RESPECT IT STRICTLY AND SEPARATE BY @ SYMBOLS 
      {Karatsuba Algorithm @ A divide and conquer algorithm for fast multiplication @ O(logn) @ O(n) @ python code here}`;

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

  return (
    <div>
      {analysis ? (
        <div>
          <h3>Analysis Result:</h3>
          <p>{analysis}</p>
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

  return <AnalPage code={searchText} />;
};

export default AnalysisPage;