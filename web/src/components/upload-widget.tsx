import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";

export function UploadWidget() {
  return (
    <div className="bg-zinc-900 w-full max-w-[360px] overflow-hidden rounded-xl shadow-shape">
      <UploadWidgetHeader />
      
      <div className="flex flex-col gap-4 py-3">
        <UploadWidgetDropzone />
        
        <div className="h-px bg-zinc-800 border-t border-black/50 box-content" />
        
        <UploadWidgetUploadList />
      </div>
    </div>
  );
}