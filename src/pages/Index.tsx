import { useState } from "react";
import { FileText, Code2, GraduationCap, BookOpen } from "lucide-react";
import logoUniversidad from "@/assets/logo-universidad.png";
import logoCarrera from "@/assets/logo-carrera.png";
import FileModal, { FileType } from "@/components/FileModal";

const NOMBRE_UNIVERSIDAD = "Universidad Nacional del Altiplano - Puno";
const NOMBRE_CARRERA = "Ingeniería Estadística";
const NOMBRE_CURSO = "Estadística Espacial";
const NOMBRE_DOCENTE = "TORRES CRUZ FRED ";
const NOMBRE_ESTUDIANTE = "JOSÉ  JULIÁN  MULLUNI CÁNDIA";
const ANIO = "2026";

//  Reemplaza GITHUB_USER y GITHUB_REPO con tus datos reales de GitHub
const GITHUB_USER = "JulianStarM";
const GITHUB_REPO = "portafolio";
const GITHUB_BRANCH = "main";

const ghBlob = (path: string) =>
  `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${path}`;
const ghRaw = (path: string) =>
  `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${path}`;

interface Tarea {
  numero: number;
  titulo: string;
  descripcion: string;
  pdfFileName: string;
  codigoFileName: string;
  pdfPath: string;
  codigoPath: string;
}

interface Unidad {
  numero: number;
  titulo: string;
  tareas: Tarea[];
}

const unidades: Unidad[] = [
  {
    numero: 1,
    titulo: "Unidad I – Fundamentos del Análisis Espacial",
    tareas: [
      {
        numero: 1,
        titulo: "Tarea 1 – Posicionamiento de Información",
        descripcion:
          "Lectura de datos geográficos, sistemas de coordenadas y visualización inicial con R.",
        pdfFileName: "Posicionamiento_de_Informacion.pdf",
        codigoFileName: "Posicionamiento_de_Informacion.R",
        pdfPath: "pdf/u1_tarea1.pdf",
        codigoPath: "codigo/u1_tarea1.R",
      },
      {
        numero: 2,
        titulo: "Tarea 2 – Análisis Exploratorio Espacial",
        descripcion:
          "Estadísticas descriptivas espaciales y visualización temática de variables geográficas.",
        pdfFileName: "Analisis_Exploratorio_Espacial.pdf",
        codigoFileName: "Analisis_Exploratorio.R",
        pdfPath: "pdf/u1_tarea2.pdf",
        codigoPath: "codigo/u1_tarea2.R",
      },
      {
        numero: 3,
        titulo: "Tarea 3 – Autocorrelación Espacial",
        descripcion:
          "Cálculo del índice de Moran e interpretación de patrones espaciales globales y locales.",
        pdfFileName: "Autocorrelacion_Espacial.pdf",
        codigoFileName: "Indice_Moran.R",
        pdfPath: "pdf/u1_tarea3.pdf",
        codigoPath: "codigo/u1_tarea3.R",
      },
      {
        numero: 4,
        titulo: "Tarea 4 – Patrones de Puntos",
        descripcion:
          "Análisis de procesos puntuales: función K de Ripley y densidad de Kernel.",
        pdfFileName: "Patrones_de_Puntos.pdf",
        codigoFileName: "Patrones_Puntos.R",
        pdfPath: "pdf/u1_tarea4.pdf",
        codigoPath: "codigo/u1_tarea4.R",
      },
    ],
  },
  {
    numero: 2,
    titulo: "Unidad II – Geoestadística y Modelado Espacial",
    tareas: [
      {
        numero: 5,
        titulo: "Tarea 5 – Variogramas",
        descripcion:
          "Construcción y modelado de variogramas experimentales y teóricos.",
        pdfFileName: "Variogramas.pdf",
        codigoFileName: "Variograma.R",
        pdfPath: "pdf/u2_tarea1.pdf",
        codigoPath: "codigo/u2_tarea1.R",
      },
      {
        numero: 6,
        titulo: "Tarea 6 – Interpolación Kriging",
        descripcion:
          "Predicción espacial mediante Kriging ordinario y generación de mapas de predicción.",
        pdfFileName: "Kriging.pdf",
        codigoFileName: "Kriging.R",
        pdfPath: "pdf/u2_tarea2.pdf",
        codigoPath: "codigo/u2_tarea2.R",
      },
      {
        numero: 7,
        titulo: "Tarea 7 – Modelos Espaciales de Regresión",
        descripcion:
          "Aplicación de modelos SAR y CAR para datos con dependencia espacial.",
        pdfFileName: "Modelos_Regresion_Espacial.pdf",
        codigoFileName: "Modelos_SAR_CAR.R",
        pdfPath: "pdf/u2_tarea3.pdf",
        codigoPath: "codigo/u2_tarea3.R",
      },
      {
        numero: 8,
        titulo: "Tarea 8 – Proyecto Final",
        descripcion:
          "Aplicación integral de técnicas de estadística espacial sobre un caso de estudio.",
        pdfFileName: "Proyecto_Final.pdf",
        codigoFileName: "Proyecto_Final.R",
        pdfPath: "pdf/u2_tarea4.pdf",
        codigoPath: "codigo/u2_tarea4.R",
      },
    ],
  },
];

interface ModalState {
  open: boolean;
  fileName: string;
  fileType: FileType;
  githubUrl: string;
  rawUrl: string;
  downloadUrl: string;
}

const Index = () => {
  const [modal, setModal] = useState<ModalState>({
    open: false,
    fileName: "",
    fileType: "pdf",
    githubUrl: "",
    rawUrl: "",
    downloadUrl: "",
  });

  const openModal = (tarea: Tarea, type: FileType) => {
    const isCode = type === "code";
    const path = isCode ? tarea.codigoPath : tarea.pdfPath;
    const raw = ghRaw(path);
    setModal({
      open: true,
      fileName: isCode ? tarea.codigoFileName : tarea.pdfFileName,
      fileType: type,
      githubUrl: ghBlob(path),
      rawUrl: raw,
      downloadUrl: raw,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="border-b border-surface-border bg-card">
        <div className="border-b border-surface-border bg-institutional">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <img
              src={logoUniversidad}
              alt="Logo Universidad Nacional del Altiplano"
              width={56}
              height={56}
              className="h-12 w-12 rounded-full bg-white p-1 sm:h-14 sm:w-14"
            />
            <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-institutional-foreground sm:text-base">
              {NOMBRE_CURSO}
            </h2>
            <img
              src={logoCarrera}
              alt="Logo de la carrera de Ingeniería Estadística"
              width={56}
              height={56}
              loading="lazy"
              className="h-12 w-12 rounded-full bg-white p-1 sm:h-14 sm:w-14"
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-6 text-center sm:px-6 sm:py-8">
          <h1 className="text-xl font-bold text-institutional sm:text-2xl">
            {NOMBRE_UNIVERSIDAD}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Carrera Profesional de {NOMBRE_CARRERA}
          </p>
          <p className="mt-3 text-base text-foreground sm:text-lg">
            Curso: <span className="font-semibold">{NOMBRE_CURSO}</span>
          </p>
          <p className="mt-1 text-base text-foreground sm:text-lg">
            Estudiante: <span className="font-semibold">{NOMBRE_ESTUDIANTE}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Docente: {NOMBRE_DOCENTE}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        {/* PRESENTACIÓN */}
        <section aria-labelledby="presentacion-title" className="mb-12">
          <h2
            id="presentacion-title"
            className="mb-3 border-b border-surface-border pb-2 text-xl font-bold text-institutional sm:text-2xl"
          >
            Presentación
          </h2>
          <p className="text-base leading-relaxed text-foreground">
            El presente sitio constituye el portafolio académico de tareas
            individuales desarrolladas durante el curso de {NOMBRE_CURSO},
            organizado en dos unidades temáticas. Reúne los informes en formato
            PDF y los códigos elaborados en lenguaje R para su revisión y
            evaluación.
          </p>
        </section>

        {/* TAREAS POR UNIDAD */}
        <section aria-labelledby="tareas-title" className="mb-4">
          <div className="mb-8 flex items-center gap-3 border-b border-surface-border pb-2">
            <GraduationCap
              className="h-6 w-6 text-institutional"
              aria-hidden="true"
            />
            <h2
              id="tareas-title"
              className="text-xl font-bold text-institutional sm:text-2xl"
            >
              Portafolio de Tareas
            </h2>
          </div>

          {unidades.map((u) => (
            <div key={u.numero} className="mb-10">
              <div className="mb-5 flex items-center gap-2 rounded-md bg-institutional-soft px-4 py-3">
                <BookOpen
                  className="h-5 w-5 text-institutional"
                  aria-hidden="true"
                />
                <h3 className="text-base font-bold text-institutional sm:text-lg">
                  {u.titulo}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {u.tareas.map((t) => (
                  <article
                    key={t.numero}
                    className="group flex flex-col rounded-lg border border-surface-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-institutional/40 hover:shadow-md"
                  >
                    <header className="mb-3 border-b border-surface-border pb-2">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Trabajo individual N° {t.numero}
                      </span>
                      <h4 className="mt-1 text-base font-bold text-institutional">
                        {t.titulo}
                      </h4>
                    </header>

                    <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground">
                      {t.descripcion}
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => openModal(t, "pdf")}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-institutional bg-institutional px-3 py-2 text-sm font-medium text-institutional-foreground transition-colors hover:bg-institutional/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-institutional focus-visible:ring-offset-2"
                      >
                        <FileText className="h-4 w-4" aria-hidden="true" />
                        Ver PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal(t, "code")}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-institutional bg-card px-3 py-2 text-sm font-medium text-institutional transition-colors hover:bg-institutional-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-institutional focus-visible:ring-offset-2"
                      >
                        <Code2 className="h-4 w-4" aria-hidden="true" />
                        Ver Código
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-surface-border bg-institutional text-institutional-foreground">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm sm:px-6">
          <p className="font-semibold">{NOMBRE_ESTUDIANTE}</p>
          <p className="mt-1">{NOMBRE_UNIVERSIDAD}</p>
          <p className="mt-1">
            {NOMBRE_CARRERA} · {NOMBRE_CURSO}
          </p>
          <p className="mt-2 text-institutional-foreground/80">© {ANIO}</p>
        </div>
      </footer>

      <FileModal
        open={modal.open}
        onOpenChange={(open) => setModal((m) => ({ ...m, open }))}
        fileName={modal.fileName}
        fileType={modal.fileType}
        githubUrl={modal.githubUrl}
        rawUrl={modal.rawUrl}
        downloadUrl={modal.downloadUrl}
      />
    </div>
  );
};

export default Index;
