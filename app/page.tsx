'use client'

import React from "react";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";

import readImage from "./cv";

export default function Home() {
  const [fileNames, setFileNames] = React.useState<string[]>([]);
  const [allText, setAllText] = React.useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("files") as File[];
    console.log(formData);
    const names = files.map(file => URL.createObjectURL(file));
    setFileNames(names);

    setAllText("");
    let combinedText = "";
    for (const file of files) {
      const text = await readImage(file);
      combinedText += text + " ";
    }
    setAllText(combinedText);
    console.log(combinedText);
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl  text-center justify-center">

        <div className="h-12"></div>

        <span className="font-black text-8xl">Code<span className="text-[#EF3E36]">View&nbsp;</span></span>

        <br />

        <div className="text-2xl font-semibold">
          Coding a new perspective.
        </div>
      </div>

      <div className="h-6"></div>

      <div className="text-2xl font-semibold">
        <Form onSubmit={onSubmit} className="flex flex-col items-center">
          <Input type="file" name="files" multiple className="mb-4" />
          <Button type="submit" className="self-center">Upload file(s) to continue</Button>
        </Form>
        {allText && (
          <Link
            href={`/analysis?text=${encodeURIComponent(allText)}`}
            className="mt-4"
          >
            <Button className="self-center">Go to Analysis</Button>
          </Link>
        )}
      </div>


    </section>
  );
}


