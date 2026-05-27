import { derived, writable, type Writable } from "svelte/store";

interface TerminalLine {
  type: "input" | "output" | "error" | "info" | "ascii";
  content: string;
}

interface CommandMap {
  [key: string]: (args: string[]) => TerminalLine[] | Promise<TerminalLine[]>;
}

// ASCII Art Logo
const logo = `
   _____  _____  _____  _____  _____
  / __/ / __/ / __/ / __/ / __/ / __/
 / _/  / _/  / _/  / _/  / _/  / _/
/_/   /_/   /_/   /_/   /_/   /_/
`;

const systemInfo = [
  "OS: BrowserOS v2026",
  "Kernel: WebEngine v121.0",
  "Uptime: Since birth",
  "Shell: zsh (virtual)",
  "Terminal: xterm-256color",
  "CPU: Creative Engine",
  "Memory: Infinite imagination",
  "Disk: GitHub v3",
];

// Command handlers
const commands: CommandMap = {
  help: () => [
    { type: "info", content: "Available commands:" },
    { type: "output", content: "  banner    - Show welcome banner" },
    { type: "output", content: "  whoami    - Who am I?" },
    { type: "output", content: "  about     - A bit about me" },
    { type: "output", content: "  skills    - My technical skills" },
    { type: "output", content: "  contact   - How to reach me" },
    { type: "output", content: "  neofetch  - System information" },
    { type: "output", content: "  projects  - My projects" },
    { type: "output", content: "  clear     - Clear terminal" },
    { type: "output", content: "  help      - Show this help menu" },
  ],

  banner: () => [
    { type: "ascii", content: logo },
    { type: "info", content: "Welcome to my interactive terminal portfolio!" },
    { type: "output", content: 'Type "help" for available commands.' },
    { type: "output", content: "" },
  ],

  whoami: () => [
    { type: "output", content: "Name: Developer" },
    { type: "output", content: "Role: Aspiring Web Developer" },
    { type: "output", content: "Focus: Building interactive web experiences" },
  ],

  about: () => [
    {
      type: "output",
      content: "I am passionate about creating modern web applications.",
    },
    {
      type: "output",
      content:
        "Currently learning: Advanced Svelte, TypeScript, and system design.",
    },
    {
      type: "output",
      content:
        "This terminal is my latest project - built with SvelteKit + Melt UI.",
    },
    {
      type: "output",
      content: "I believe in clean code, accessibility, and great UX.",
    },
  ],

  skills: () => [
    { type: "info", content: "Technical Skills:" },
    {
      type: "output",
      content: "  Languages: JavaScript, TypeScript, HTML, CSS",
    },
    {
      type: "output",
      content: "  Frameworks: Svelte, SvelteKit, React (basic)",
    },
    { type: "output", content: "  Tools: Git, npm, Vite, Tailwind CSS" },
    {
      type: "output",
      content: "  Concepts: Responsive design, accessibility, state management",
    },
  ],

  contact: () => [
    { type: "info", content: "Get in touch:" },
    { type: "output", content: "  Email: dev [at] example [dot] com" },
    { type: "output", content: "  GitHub: github.com/developer" },
    { type: "output", content: "  LinkedIn: linkedin.com/in/developer" },
  ],

  neofetch: () => [
    {
      type: "ascii",
      content: logo.split("\n").join("\n") + "  visitor@portfolio",
    },
    ...systemInfo.map((line) => ({ type: "output" as const, content: line })),
  ],

  projects: () => [
    { type: "info", content: "My Projects:" },
    {
      type: "output",
      content: "  • This Terminal Portfolio - Built with SvelteKit + Melt UI",
    },
    { type: "output", content: "  • [Project 1] - Coming soon" },
    { type: "output", content: "  • [Project 2] - Coming soon" },
    {
      type: "info",
      content:
        "Note: This terminal is my latest project! Check the source on GitHub.",
    },
  ],

  clear: () => [{ type: "info", content: "Terminal cleared." }],

  history: () => [
    { type: "info", content: "No history available in this session." },
  ],
};

class TerminalStore {
  private store: Writable<TerminalLine[]>;

  constructor() {
    this.store = writable<TerminalLine[]>([]);
  }

  subscribe(run: (value: TerminalLine[]) => void) {
    return this.store.subscribe(run);
  }

  async addLines(lines: TerminalLine[]) {
    this.store.update((current) => [...current, ...lines]);
  }

  async clear() {
    this.store.update(() => []);
  }

  async runCommand(command: string) {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add input line
    this.store.update((current) => [
      ...current,
      { type: "input", content: command },
    ]);

    if (cmd === "clear") {
      this.store.update(() => []);
      return;
    }

    const handler = commands[cmd];

    if (!handler) {
      this.store.update((current) => [
        ...current,
        {
          type: "error",
          content: `Command not found: ${cmd}. Type "help" for available commands.`,
        },
      ]);
      return;
    }

    const result = await handler(args);
    this.store.update((current) => [...current, ...result]);
  }

  async runInitialCommands() {
    await commands.banner([]);
    await commands.help([]);
  }
}

export const terminal = new TerminalStore();
