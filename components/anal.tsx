import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Code } from "@heroui/code";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy, dark, solarizedlight, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface AnalPageProps {
  headerText: string;
  ratingText: string;
  codeText: string;
  descriptionText: string;
  timeComplex: string;
  spaceComplex: string;
}

export default function AnalysisPageComp({
  headerText,
  ratingText,
  codeText,
  descriptionText,
  timeComplex,
  spaceComplex,
}: AnalPageProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-4 ">
      <div className="col-span-2 text-5xl font-extrabold !text-left">{headerText}</div>
      <div className="col-span-2 col-start-1 row-start-4 text-4xl font-bold border-1 border-current flex justify-center items-center rounded-lg">
        Complexity Analysis
      </div>
      <div className="col-span-2 col-start-3 row-start-1 text-5xl">{ratingText}</div>
      <div className="col-span-2 row-span-4 col-start-3 row-start-2">
        <Card className="h-96">
          <CardHeader className="!text-right">.py</CardHeader>
          <CardBody className="text-center text-md font-bold">
          <SyntaxHighlighter language="python" style={tomorrow} className="fadetogrey">
          {codeText}</SyntaxHighlighter>
          </CardBody>
        </Card>
      </div>
      <div className="col-span-2 row-span-2 col-start-1 row-start-2 ">
        <Card className="h-full p-2">
          <CardBody>
            <p>{descriptionText}</p>
          </CardBody>
        </Card>
      </div>
      <div className="row-start-5">
        <Card className="">
          <CardBody className="text-center text-3xl font-bold">
            <p>🕝 {timeComplex}</p>
          </CardBody>
        </Card>
      </div>
      <div className="row-start-5">
        <Card className="">
          <CardBody className="text-center text-3xl font-bold">
            <p>📝 {spaceComplex}</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
