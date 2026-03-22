import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import os from "os";

const execAsync = promisify(exec);
const PLATFORM = os.platform();

const BLOCKED_CMDS = ["rm -rf /", "shutdown", "reboot", "mkfs", "dd"];

//////////////////////////////////////////////////////
// TOOL DEFINITIONS
//////////////////////////////////////////////////////

export const tools = [
  {
    type: "function",
    function: {
      name: "run_command",
      parameters: {
        type: "object",
        properties: {
          command: { type: "string" },
        },
        required: ["command"],
      },
    },
  },
];

//////////////////////////////////////////////////////
// TOOL HANDLER
//////////////////////////////////////////////////////

async function run_command({ command }) {
  if (BLOCKED_CMDS.some((cmd) => command.includes(cmd))) {
    return "Blocked command";
  }

  try {
    const shell = PLATFORM === "win32" ? "powershell.exe" : "/bin/bash";

    const { stdout, stderr } = await execAsync(command, {
      shell,
      timeout: 10000,
    });

    return stdout || stderr;
  } catch (err) {
    return err.message;
  }
}

export const toolHandlers = {
  run_command,
};