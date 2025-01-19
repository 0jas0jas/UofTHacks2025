import AnalPage from "@/components/anal";

import OpenAI from "openai";

interface GetAnalysisProps {
    code: string;
}

export default async function GetAnalysis({ code }: GetAnalysisProps) {
    if (!process.env.OPENAI_API) {
        throw new Error("OpenAI API key is missing");
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API });

    const instructions = `Analyze the following pseudocode. Give a short title, description, time complexity 
and space complexity, and python implementation of the code in the following string format.  RETURN THE TEXT ONLY IN THE FOLLOWING FORMAT. RESPECT IT STRICTLY AND SEPARATE BY @ SYMBOLS 
{Karatsuba Algorithm @ A divide and conquer algorithm for fast multiplication @ O(logn) @ O(n) @ python code here}`;

    code = code.concat(instructions);
    let completion;
    try {
        completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a skilled developer who will analyze input pieces of pseudocode and give feedback on it." },
                {
                    role: "user",
                    content: code,
                },
            ],
        });
    } catch (error) {
        console.error("Error fetching completion:", error);
        return <div>Error fetching analysis. Please try again later.</div>;
    }



    let answer = `${completion.choices[0].message.content}`;
    console.log(answer);
    console.log(typeof (answer));

    /*

    //answer = answer.replace(/"/g, '\\"');

    // console.log(answer);

    let answerClean = JSON.parse(answer);

    // answer = answer.replace(/n/g, '');

    console.log(answer);
    console.log(typeof (answer));


    
    //let answerClean = JSON.parse(`{ title: \"Variable Declaration\", description: \"This pseudocode initializes an integer variable x with the value 5.\", time: \"O(1)\", space: \"O(1)\", python: \"x = 5\"}`);
    

    const title = answerClean.title;
    const time = answerClean.time;
    const space = answerClean.space;
    const description = answerClean.description;
    const python = answerClean.python;
    */

    function extractInfo(answer: string) {
        const parts = answer.split("@").map((part) => part.trim());
        const title = parts[0].substring(1);
        const description = parts[1];
        const time = parts[2];
        const space = parts[3];
        const python = parts[4].substring(0, parts[4].length - 1);

        return { title, description, time, space, python };
    }

    const { title, description, time, space, python } = extractInfo(answer);

    console.log(time);
    console.log(space);


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

    const star = "⭐";
    const stars = star.repeat(rate(time, space));

    return (
        <>
            <AnalPage
                headerText={title}
                ratingText={stars}
                codeText={python}
                descriptionText={description}
                timeComplex={time}
                spaceComplex={space}
            />
        </>
    );
}