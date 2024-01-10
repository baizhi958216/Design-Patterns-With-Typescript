import { InstructionHandler } from "./InstructionHandler";

export const InterpreterPatternClient = () => {
  const instruction: string = "down run 10 and left move 20";
  const handler: InstructionHandler = new InstructionHandler();
  handler.handle(instruction);

  const outString: string | undefined = handler.output();
  console.log(outString);
};
