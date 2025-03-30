import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button";

export function UploadWidget() {
  const [isWidgetOpen, setWidgetOpen] = useState(false);
  return (
    <Collapsible.Root onOpenChange={setWidgetOpen}>
      <div className="bg-zinc-900 w-[360px] overflow-hidden rounded-xl shadow-shape">

        {!isWidgetOpen && <UploadWidgetMinimizedButton />}

        <Collapsible.Content>
          <UploadWidgetHeader />

          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />

            <div className="h-px bg-zinc-800 border-t border-black/50 box-content" />

            <UploadWidgetUploadList />
          </div>
        </Collapsible.Content>
      </div>
    </Collapsible.Root>
  );
}