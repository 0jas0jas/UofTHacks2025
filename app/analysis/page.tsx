import AnalPage from "@/components/anal";


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
