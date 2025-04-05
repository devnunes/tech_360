import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import * as Collapsible from "@radix-ui/react-collapsible";
import { motion, useCycle } from "motion/react"
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button";

export function UploadWidget() {
  const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true);
  return (
    <Collapsible.Root onOpenChange={() => toggleWidgetOpen()}>
      <motion.div
        className="bg-zinc-900 w-[360] max rounded-xl shadow-shape"
        animate={isWidgetOpen ? 'open' : 'closed'}
        variants={{
          closed: {
            width: 'max-content',
            height: 44,
            transition: {
              type: 'inertia',
            }
          },
          open: {
            width: 360,
            height: 'auto',
            transition: {
              duration: 0.1,
            }
          },
        }}
      >

        {!isWidgetOpen && <UploadWidgetMinimizedButton />}

        <Collapsible.Content>
          <UploadWidgetHeader />

          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />

            <div className="h-px bg-zinc-800 border-t border-black/50 box-content" />

            <UploadWidgetUploadList />
          </div>
        </Collapsible.Content>
      </motion.div>
    </Collapsible.Root>
  );
}