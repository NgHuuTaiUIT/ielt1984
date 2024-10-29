import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import React from "react";
import Box from "./components/Box";
import useFetch from "./hooks/useFetch";
import { Blank, DragWord, Question } from "./type";
function App() {
  let index = 0;

  const { data, isFetched, isLoading } = useFetch<{ question: Question }>({
    url: "/backend.json"
  });
  const [paragraph, setParagraph] = React.useState<string[]>([]);
  const [blank, setBlank] = React.useState<Blank[]>([]);
  const [dragWords, setDragWords] = React.useState<DragWord[]>([]);
  const inputRefs = React.useRef<HTMLInputElement[]>([]);

  const [result, setResult] = React.useState<{
    correct: boolean;
    message: string;
  }>();
  function onSubmit() {
    let i = 0;
    const message = paragraph
      .map((p) => {
        if (p === "[_input]") {
          return inputRefs.current[i++].value;
        }
        return p;
      })
      .join("");
    if (
      inputRefs.current.every(
        (input) => input.value !== "" && input.id === input.value
      )
    ) {
      setResult({
        correct: true,
        message
      });
    } else {
      setResult({
        correct: false,
        message
      });
    }
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.textContent = e.target.value;
    }
  }
  React.useEffect(() => {
    if (data) {
      const _paragraph = data?.question?.paragraph.split(/(\[_input\])/);
      setParagraph(_paragraph);
      setBlank(data?.question?.blanks);
      setDragWords(data?.question?.dragWords);
    }
  }, [data]);
  return (
    <main className="flex flex-col items-center h-dvh">
      {isLoading && <p className="read-the-docs">Loading...</p>}
      {isFetched && (
        <div className="flex flex-col justify-between w-2/3 gap-4 p-4 h-[200px] m-auto border rounded-xl">
          <Alert className="p-2 font-bold read-the-docs w-fit">
            <Terminal className="w-4 h-4" />
            <AlertTitle>Question!</AlertTitle>
            <AlertDescription>
              {paragraph.map((p, i) => {
                if (p === "[_input]") {
                  return (
                    <div
                      className="relative inline-block h-6 border-b-2 min-w-8"
                      key={i}>
                      <input
                        ref={(ref) => ref && inputRefs.current.push(ref)}
                        type="text"
                        size={1}
                        id={blank[index++]?.correctAnswer}
                        onChange={onChange}
                        className="absolute left-0 w-full text-transparent bg-transparent outline-none"
                      />
                      <span className="text-primary"></span>
                    </div>
                  );
                }
                return (
                  <span key={i}>
                    {<span dangerouslySetInnerHTML={{ __html: p }} />}
                  </span>
                );
              })}
            </AlertDescription>
          </Alert>
          <div className="flex items-center gap-4">
            {dragWords.map((item) => (
              <Box {...item} key={item.id} />
            ))}
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button onClick={onSubmit} variant="secondary">
                Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {result?.correct ? "Correct" : "Wrong!"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: result?.message || ""
                    }}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </main>
  );
}

export default App;
