import Navbar from "@/components/Navbar";
import { File, Folder, Tree } from "@/components/magic_ui/file-tree.tsx";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magic_ui/terminal.tsx";
import React from "react";

const Home = () => {
  const ELEMENTS = [
    {
      id: "1",
      isSelectable: true,
      name: "src",
      children: [
        {
          id: "2",
          isSelectable: true,
          name: "app",
          children: [
            {
              id: "3",
              isSelectable: true,
              name: "layout.tsx",
            },
            {
              id: "4",
              isSelectable: true,
              name: "page.tsx",
            },
          ],
        },
        {
          id: "5",
          isSelectable: true,
          name: "components",
          children: [
            {
              id: "6",
              isSelectable: true,
              name: "header.tsx",
            },
            {
              id: "7",
              isSelectable: true,
              name: "footer.tsx",
            },
          ],
        },
        {
          id: "8",
          isSelectable: true,
          name: "lib",
          children: [
            {
              id: "9",
              isSelectable: true,
              name: "utils.ts",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex flex-grow w-full">
        <div className="w-1/4 h-full p-4 pb-0 overflow-auto ">
          <Tree
            className="w-full h-full overflow-auto rounded-md bg-neutral-900 rounded-xl"
            initialSelectedId="7"
            initialExpandedItems={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
            ]}
            elements={ELEMENTS}
          >
            <Folder element="src" value="1">
              <Folder value="2" element="app">
                <File value="3">
                  {" "}
                  <p>layout.tsx</p>{" "}
                </File>
                <File value="4">
                  {" "}
                  <p>page.tsx</p>{" "}
                </File>
              </Folder>
              <Folder value="5" element="components">
                <Folder value="6" element="ui">
                  <File value="7">
                    {" "}
                    <p>button.tsx</p>{" "}
                  </File>
                </Folder>
                <File value="8">
                  {" "}
                  <p>header.tsx</p>{" "}
                </File>
                <File value="9">
                  {" "}
                  <p>footer.tsx</p>{" "}
                </File>
              </Folder>
              <Folder value="10" element="lib">
                <File value="11">
                  {" "}
                  <p>utils.ts</p>{" "}
                </File>
              </Folder>
            </Folder>
          </Tree>
        </div>
      </div>
      <div className="w-full p-4">
        <Terminal className="w-full max-w-1/4">
          <TypingAnimation>&gt; pnpm dlx shadcn@latest init</TypingAnimation>
          <AnimatedSpan delay={1500} className="text-green-500">
            <span>✔ Preflight checks.</span>
          </AnimatedSpan>
          <AnimatedSpan delay={2000} className="text-green-500">
            <span>✔ Verifying framework. Found Next.js.</span>
          </AnimatedSpan>
          <AnimatedSpan delay={2500} className="text-green-500">
            <span>✔ Validating Tailwind CSS.</span>
          </AnimatedSpan>
          <AnimatedSpan delay={3000} className="text-green-500">
            <span>✔ Validating import alias.</span>
          </AnimatedSpan>
          <AnimatedSpan delay={3500} className="text-green-500">
            <span>✔ Writing components.json.</span>
          </AnimatedSpan>
          <AnimatedSpan delay={4000} className="text-green-500">
            <span>✔ Checking registry.</span>
          </AnimatedSpan>
          <AnimatedSpan delay={4500} className="text-green-500">
            <span>✔ Updating tailwind.config.ts</span>
          </AnimatedSpan>
          <AnimatedSpan delay={5000} className="text-green-500">
            <span>✔ Updating app/globals.css</span>
          </AnimatedSpan>
          <AnimatedSpan delay={5500} className="text-green-500">
            <span>✔ Installing dependencies.</span>
          </AnimatedSpan>
          <AnimatedSpan delay={6000} className="text-blue-500">
            <span>ℹ Updated 1 file:</span>
            <span className="pl-2">- lib/utils.ts</span>
          </AnimatedSpan>
          <TypingAnimation delay={6500} className="text-muted-foreground">
            Success! Project initialization completed.
          </TypingAnimation>
        </Terminal>
      </div>
    </div>
  );
};

export default Home;
