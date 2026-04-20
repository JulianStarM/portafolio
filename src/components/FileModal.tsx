import { useState } from "react";
import { Download, ExternalLink, FileText, Code2, X, Eye, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type FileType = "pdf" | "code";

interface FileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  fileType: FileType;
  githubUrl: string;
  rawUrl: string;
  downloadUrl: string;
}

const FileModal = ({
  open,
  onOpenChange,
  fileName,
  fileType,
  githubUrl,
  rawUrl,
  downloadUrl,
}: FileModalProps) => {
  const [viewing, setViewing] = useState(false);
  const [codeContent, setCodeContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCode = fileType === "code";
  const Icon = isCode ? Code2 : FileText;

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setViewing(false);
      setCodeContent(null);
      setError(null);
    }
    onOpenChange(next);
  };

  const handleView = async () => {
    setViewing(true);
    if (isCode && codeContent === null) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(rawUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        setCodeContent(text);
      } catch (e) {
        setError(
          "No se pudo cargar el archivo. Verifica que el repositorio y la ruta de GitHub sean correctos.",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={
          viewing
            ? "h-[90vh] max-w-5xl flex flex-col gap-3 p-4 sm:p-6"
            : "sm:max-w-md"
        }
      >
        <DialogHeader>
          {!viewing && (
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-institutional-soft">
              <Icon className="h-6 w-6 text-institutional" aria-hidden="true" />
            </div>
          )}
          <DialogTitle
            className={
              viewing
                ? "flex items-center gap-2 text-base text-institutional"
                : "text-center text-lg text-institutional"
            }
          >
            {viewing && <Icon className="h-4 w-4" aria-hidden="true" />}
            {fileName}
          </DialogTitle>
          {!viewing && (
            <DialogDescription className="text-center">
              {isCode ? "Código R disponible" : "Informe PDF disponible"}
              <br />
              <span className="mt-1 inline-block text-xs">
                Elige cómo deseas visualizarlo.
              </span>
            </DialogDescription>
          )}
        </DialogHeader>

        {viewing ? (
          <>
            <div className="min-h-0 flex-1 overflow-hidden rounded border border-surface-border bg-surface">
              {isCode ? (
                loading ? (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Cargando código…
                  </div>
                ) : error ? (
                  <div className="flex h-full items-center justify-center p-4 text-center text-sm text-destructive">
                    {error}
                  </div>
                ) : (
                  <pre className="h-full overflow-auto bg-[hsl(215,25%,15%)] p-4 text-xs leading-relaxed text-[hsl(0,0%,95%)]">
                    <code>{codeContent}</code>
                  </pre>
                )
              ) : (
                <iframe
                  src={rawUrl}
                  title={fileName}
                  className="h-full w-full"
                />
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewing(false)}
              >
                ← Volver
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-institutional text-institutional hover:bg-institutional-soft hover:text-institutional"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Ver en GitHub
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-institutional text-institutional-foreground hover:bg-institutional/90"
              >
                <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Descargar
                </a>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleView}
              className="w-full bg-institutional text-institutional-foreground hover:bg-institutional/90"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              Ver aquí
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-institutional text-institutional hover:bg-institutional-soft hover:text-institutional"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Ver en GitHub
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-institutional text-institutional hover:bg-institutional-soft hover:text-institutional"
            >
              <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" aria-hidden="true" />
                Descargar archivo
              </a>
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => handleOpenChange(false)}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FileModal;
