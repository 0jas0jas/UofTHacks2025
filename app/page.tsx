'use client'

import React from "react";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";



export default function Home() {
  const [fileNames, setFileNames] = React.useState<string[]>([]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("files") as File[];
    console.log(formData);
    const names = files.map(file => file.name);
    setFileNames(names);
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl  text-center justify-center">

        <div className="h-12"></div>

        <span className="font-black text-8xl">Code<span className="text-blue-500">View&nbsp;</span></span>

        <br />

        <div className="text-2xl font-semibold">
          Coding a new perspective.
        </div>
      </div>

      <div className="h-6"></div>

      <div className="text-2xl font-semibold">
        <Form onSubmit={onSubmit} className="flex flex-col items-center">
          <Input type="file" name="files" multiple className="mb-4" />
          <Button type="submit" className="self-center">Submit</Button>
        </Form>
        {fileNames.length > 0 && (
          <div className="mt-4">
        <h3>Uploaded Files:</h3>
        <ul>
          {fileNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
          </div>
        )}
      </div>


    </section>
  );
}


