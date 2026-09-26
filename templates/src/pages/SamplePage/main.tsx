import { page } from '@yodogawa404/print-assets/page';
import * as s from './sample.css.ts';

export default function SamplePage() {
  return (
    <div className={page} data-canvas="page" data-format="a4">
      <div className={s.canvas}>
        <header className={s.header}>
          <span className={s.brand}>BRAND / LOGO</span>
        </header>
        <h1 className={s.title}>Sample Page</h1>
        <p className={s.body}>
          このフォルダをコピーして、素材を作ってください。フォルダ名が URL になります。
        </p>
        <div style={{ flex: 1 }} />
        <footer className={s.footer}>
          <span>© 2026 Brand Inc.</span>
          <span>Sample / A4</span>
        </footer>
      </div>
    </div>
  );
}
