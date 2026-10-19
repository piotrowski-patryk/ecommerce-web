import { DesignSystemPageHeader } from "@/components/design-system/page-header";
import { DesignSystemSection } from "@/components/design-system/section";
import { DesignSystemSpecimen } from "@/components/design-system/specimen";

const typeStyles = [
  {
    name: "Heading 1",
    details: "36 / 48 px · Semibold 600",
    sample: "Nowa kolekcja na każdy dzień",
    className: "text-4xl leading-tight font-semibold sm:text-5xl",
  },
  {
    name: "Heading 2",
    details: "30 / 36 px · Semibold 600",
    sample: "Odkryj swój styl",
    className: "text-3xl leading-tight font-semibold sm:text-4xl",
  },
  {
    name: "Heading 3",
    details: "24 px · Medium 500",
    sample: "Detale, które robią różnicę",
    className: "text-2xl leading-snug font-medium",
  },
  {
    name: "Body",
    details: "16 px · Regular 400",
    sample:
      "Wybieraj rzeczy, do których chcesz wracać. Dobrze zaprojektowane produkty zostają z nami na dłużej.",
    className: "max-w-2xl text-base leading-relaxed font-normal",
  },
  {
    name: "Small",
    details: "14 px · Regular 400",
    sample: "Dostępność i cena produktu mogą się zmienić.",
    className: "text-sm leading-relaxed font-normal text-muted",
  },
] as const;

const weights = [
  { name: "Regular", value: "400", className: "font-normal" },
  { name: "Medium", value: "500", className: "font-medium" },
  { name: "Semibold", value: "600", className: "font-semibold" },
  { name: "Bold", value: "700", className: "font-bold" },
] as const;

export default function DesignSystemPage() {
  return (
    <div className="container space-y-14 py-10 sm:py-16">
      <DesignSystemPageHeader
        index="01"
        title="Typografia"
        description="Poppins nadaje interfejsowi czytelny, geometryczny charakter. Poniżej znajdziesz podstawowe style tekstu używane w projekcie."
      />

      <DesignSystemSection id="font-family-heading" title="Krój pisma">
        <div className="grid overflow-hidden rounded-3xl border border-default bg-muted lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.75fr)]">
          <div className="flex min-h-72 flex-col justify-between p-6 sm:p-9">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                Krój podstawowy
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-strong sm:text-4xl">
                Poppins
              </h3>
            </div>
            <p className="mt-10 text-[clamp(5rem,15vw,9rem)] leading-none font-medium tracking-tight text-primary">
              Aa
            </p>
          </div>
          <div className="flex flex-col justify-end border-t border-default bg-default p-6 sm:p-9 lg:border-t-0 lg:border-l">
            <p className="text-2xl leading-snug font-medium text-strong">
              Dobrze wygląda. Dobrze się czyta.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Geometryczne formy, miękkie zaokrąglenia i wyraźna hierarchia dla
              nagłówków, opisów oraz elementów interfejsu.
            </p>
            <p className="mt-8 border-t border-default pt-5 text-sm text-muted">
              Latin + Latin Extended · 4 wagi
            </p>
          </div>
        </div>
      </DesignSystemSection>

      <DesignSystemSection
        id="type-scale-heading"
        title="Skala tekstu"
        description="Przykłady zastosowania"
      >
        <div className="overflow-hidden rounded-2xl border border-default">
          {typeStyles.map((style) => (
            <DesignSystemSpecimen
              key={style.name}
              name={style.name}
              details={style.details}
            >
              <p className={style.className}>{style.sample}</p>
            </DesignSystemSpecimen>
          ))}
        </div>
      </DesignSystemSection>

      <DesignSystemSection id="weights-heading" title="Wagi i znaki">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {weights.map((weight) => (
            <div
              key={weight.value}
              className="rounded-2xl border border-default bg-muted p-5"
            >
              <p className="text-xs text-muted">
                {weight.name} / {weight.value}
              </p>
              <p className={`mt-6 text-4xl text-strong ${weight.className}`}>
                Ag 29
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 break-words rounded-2xl border border-default px-5 py-6 text-xl leading-relaxed tracking-wide text-strong sm:px-8 sm:text-2xl">
          AĄ B CĆ D EĘ F G H I J K LŁ M NŃ OÓ P R SŚ T U W Y ZŹŻ
          <br />
          aą b cć d eę f g h i j k lł m nń oó p r sś t u w y zźż
        </p>
      </DesignSystemSection>
    </div>
  );
}
