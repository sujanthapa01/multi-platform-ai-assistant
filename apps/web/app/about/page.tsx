"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../../components/ui/input";

export default function About() {
  const [state, setState] = useState("");

  const [input, setInput] = useState("");
  function print() {
    // if (input == "sujan" || input == "aman" || input == "ashish") {
    //   setState("Hellow world!" + " " + input);
    // }
    setState(input);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-green-700 ">
        {state == "sujan" || state == "aman" || state == "ashish"? state : "state is empty"}
        <Input
          placeholder="enter you name "
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></Input>
        <Button variant={"destructive"} className="px-4 w-30" onClick={print}>
          Heloo
        </Button>
      </div>
    </div>
  );
}
