import { page } from '@yodogawa404/print-assets/page';

export default function SamplePage() {
  return (
    <div className={page} data-canvas="page" data-format="a4">
      <div className="flex flex-1 flex-col bg-paper p-[18mm]">
        <header className="flex items-center justify-between">
          <span className="text-[5.5mm] font-bold tracking-[0.08em] text-ink">BRAND / LOGO</span>
        </header>
        <h1 className="mt-[20mm] text-[18mm] font-bold leading-[1.15] text-ink">Sample Page</h1>
        <p className="mt-[8mm] max-w-[140mm] text-[4.8mm] leading-[1.7] text-muted">
          このフォルダをコピーして、素材を作ってください。フォルダ名が URL になります。
        </p>
        <div className="flex-1" />
        <footer className="flex justify-between border-t border-line pt-[6mm] text-[3.8mm] text-muted">
          <span>© 2026 Brand Inc.</span>
          <span>Sample / A4</span>
        </footer>
      </div>
    </div>
  );
}
