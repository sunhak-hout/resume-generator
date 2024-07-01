import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";

import { FileText, Tangent, X } from "lucide-react";
import { FormSection } from "./components/form-section";
import { Button } from "./components/shadcn/ui/button";
import TemplateResult from "./components/template-result";

function App() {
  return (
    <div className="bg-secondary">
      <div className="sticky top-0 z-50 h-16 bg-white shadow">
        <div className="container flex h-full items-center gap-2 px-4 sm:px-8">
          <div className="mr-auto flex items-baseline">
            <div className="relative">
              <h6 className="text-lg font-extrabold sm:text-2xl">
                Resume Generator.
              </h6>
              <Tangent
                className="absolute -right-3 top-0 h-4 w-4 -rotate-90"
                strokeWidth={4}
              />
            </div>
            <a
              className="ml-4 text-sm font-semibold italic text-muted-foreground underline"
              href="https://sunhak.dev/"
              target="_blank"
            >
              By: Sunhak
            </a>
          </div>
          <Button className="rounded-full" variant="outline" size="icon">
            <svg
              className="h-6 w-6"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="container grid h-[calc(100dvh-theme(space.16))] w-lvw grid-cols-2 gap-8 overscroll-none px-4 sm:px-8">
        <div className="scrollbar-light-transparent relative col-span-2 h-full w-full overflow-auto py-8 lg:col-span-1">
          <FormSection />
        </div>
        <div className="scrollbar-light-transparent relative hidden h-full w-full overflow-auto py-8 lg:block">
          <TemplateResult />
        </div>

        <div className="lg:hidden">
          <Drawer>
            <DrawerTrigger>
              <Button
                className="fixed bottom-6 right-6 gap-2 rounded-full lg:hidden"
                size="lg"
              >
                <FileText />
                Preview
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="scrollbar-light-transparent relative h-[calc(100dvh-theme(space.16))] w-full overflow-auto bg-secondary p-4">
                <TemplateResult />
              </div>
              <DrawerTrigger>
                <Button
                  className="fixed bottom-6 right-6 gap-2 rounded-full lg:hidden"
                  size="lg"
                >
                  <X />
                  Close
                </Button>
              </DrawerTrigger>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default App;
