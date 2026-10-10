import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { BookOpen, Printer, ChevronLeft, ChevronRight, Check, List, Minus, Plus, PanelRightClose, PanelRightOpen, GraduationCap, AlertTriangle, Sparkles, Copy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OctoberCoverPage } from '@/components/OctoberCoverPage';
import revision from '@/data/revision.json';
import badge from '@/assets/prepared-badge-october.png.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Math Notebook | Grade 5 · Units 1 & 2 Revision' },
    { name: 'description', content: 'Grade 5 lessons and October solutions: 12 multiple-choice and 43 written questions in original order, followed by homework booklet solutions. Prepared by Mr. Ali Ashraf.' },
    { property: 'og:title', content: 'Math Notebook · Grade 5 Revision' },
    { property: 'og:description', content: 'Original lesson explanations and step-by-step October assessments with A4 and two-up printing.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Notebook,
});

type Model = { type: string; parts?: number[]; removed?: number; caption?: string; number?: string; rows?: string[]; labels?: string[] };
type SheetItem = {
  label?: string;
  question: string;
  steps?: string[];
  answer?: string;
  column?: { lines: string[] };
  shift?: { direction: string; places: number; input: string; output: string; operation: string; factor: number };
  model?: Model;
};

type Sheet = {
  id: string;
  chapter: string;
  title: string;
  sourcePages?: number[];
  sourceSection?: string;
  sourceNumber?: number;
  tag?: string;
  vocabulary?: string[][];
  rule?: string;
  question?: string;
  steps?: string[];
  answer?: string;
  note?: string;
  words?: string[][];
  model?: Model;
  column?: { lines: string[] };
  shift?: { direction: string; places: number; input: string; output: string; operation: string; factor: number };
  items?: SheetItem[];
};

const sheets: Sheet[] = revision.sheets;
const lessonAssessmentSheets: Sheet[] = revision.assessmentSheets;
const sourceOrderSheets: Sheet[] = revision.octoberSourceOrderSheets;
const chapters = revision.chapters.map(ch => ({ ...ch, start: sheets.findIndex(s => s.chapter === ch.id), count: sheets.filter(s => s.chapter === ch.id).length }));

function NumberLineModel({ model }: { model: Model }) {
  const minLabel = model.labels?.[0] ?? '1.27';
  const midLabel = model.labels?.[1] ?? '1.275';
  const maxLabel = model.labels?.[2] ?? '1.28';

  const ticks = Array.from({ length: 11 }, (_, i) => ({
    i,
    x: 80 + i * 56,
    isMid: i === 5,
  }));

  return (
    <figure className="math-model number-line-wrapper">
      <svg viewBox="0 0 720 185" className="number-line-svg" aria-label="Rounding on a Number Line with Midpoint">
        <defs>
          <marker id="arrow-left" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 10 1 L 1 5 L 10 9 z" fill="var(--diagram-color-0)" />
          </marker>
          <marker id="arrow-right" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--diagram-color-0)" />
          </marker>
        </defs>

        <rect x="80" y="74" width="280" height="16" fill="var(--diagram-color-1)" rx="4" />
        <rect x="360" y="74" width="280" height="16" fill="var(--diagram-color-2)" rx="4" />

        <text x="220" y="46" textAnchor="middle" fill="var(--diagram-color-3)" fontSize="12" fontWeight="700" letterSpacing="0.5">
          ROUND DOWN (&lt; {midLabel})
        </text>
        <text x="500" y="46" textAnchor="middle" fill="var(--diagram-color-4)" fontSize="12" fontWeight="700" letterSpacing="0.5">
          ROUND UP (≥ {midLabel})
        </text>

        <line x1="40" y1="82" x2="680" y2="82" stroke="var(--diagram-color-0)" strokeWidth="3" markerStart="url(#arrow-left)" markerEnd="url(#arrow-right)" />

        {ticks.map(t => {
          if (t.i === 0 || t.i === 10 || t.isMid) return null;
          return (
            <line key={t.i} x1={t.x} y1="74" x2={t.x} y2="90" stroke="var(--diagram-color-5)" strokeWidth="1.5" />
          );
        })}

        <line x1="80" y1="64" x2="80" y2="100" stroke="var(--diagram-color-0)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="82" r="5" fill="var(--diagram-color-0)" />
        <text x="80" y="124" textAnchor="middle" fill="var(--diagram-color-6)" fontSize="16.5" fontWeight="800" fontFamily="monospace">{minLabel}</text>
        <text x="80" y="142" textAnchor="middle" fill="var(--diagram-color-3)" fontSize="11" fontWeight="600">Lower benchmark</text>

        <line x1="360" y1="54" x2="360" y2="110" stroke="var(--diagram-color-7)" strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round" />
        <circle cx="360" cy="82" r="6.5" fill="var(--diagram-color-8)" stroke="var(--diagram-color-9)" strokeWidth="2" />
        <text x="360" y="126" textAnchor="middle" fill="var(--diagram-color-9)" fontSize="17.5" fontWeight="800" fontFamily="monospace">{midLabel}</text>
        <text x="360" y="146" textAnchor="middle" fill="var(--diagram-color-7)" fontSize="11.5" fontWeight="800" letterSpacing="0.8">MIDPOINT</text>

        <line x1="472" y1="58" x2="472" y2="104" stroke="var(--diagram-color-10)" strokeWidth="2" strokeDasharray="2 2" />
        <circle cx="472" cy="82" r="7.5" fill="var(--diagram-color-10)" stroke="var(--diagram-color-11)" strokeWidth="2" />

        <g transform="translate(472, 22)">
          <rect x="-35" y="-22" width="70" height="24" rx="6" fill="var(--diagram-color-10)" />
          <polygon points="0,6 -5,2 5,2" fill="var(--diagram-color-10)" />
          <text x="0" y="-6" textAnchor="middle" fill="var(--diagram-color-11)" fontSize="13.5" fontWeight="800" fontFamily="monospace">1.277</text>
        </g>
        <text x="472" y="124" textAnchor="middle" fill="var(--diagram-color-10)" fontSize="12" fontWeight="700">Given number</text>
        <text x="472" y="140" textAnchor="middle" fill="var(--diagram-color-4)" fontSize="11" fontWeight="700">Closer to 1.28 → Round UP</text>

        <line x1="640" y1="64" x2="640" y2="100" stroke="var(--diagram-color-0)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="640" cy="82" r="5" fill="var(--diagram-color-0)" />
        <text x="640" y="124" textAnchor="middle" fill="var(--diagram-color-6)" fontSize="16.5" fontWeight="800" fontFamily="monospace">{maxLabel}</text>
        <text x="640" y="142" textAnchor="middle" fill="var(--diagram-color-3)" fontSize="11" fontWeight="600">Upper benchmark</text>
      </svg>
      {model.caption && <figcaption className="number-line-caption">{model.caption}</figcaption>}
    </figure>
  );
}

function MathModel({ model }: { model: Model }) {
  if (model.type === 'bar') return <figure className="math-model"><div className="part-whole-model"><div className="bar-whole">{model.labels?.[0]}</div><div className="bar-parts"><span>{model.labels?.[1]}</span><span>{model.labels?.[2]}</span></div></div></figure>;
  if (model.type === 'grid') {
    const parts = model.parts ?? [];
    const total = parts.reduce((a,b) => a+b,0);
    return <figure className="math-model"><div className="model-grids">{Array.from({length:Math.ceil(total/100)},(_,grid) => <div className="hundred-grid" key={grid}>{Array.from({length:100},(_,i) => {
      const n = grid*100+i;
      return <span key={i} className={`${n < (parts[0] ?? 0) ? 'shade-first' : n < total ? 'shade-second' : ''} ${n < (model.removed ?? 0) ? 'crossed-square' : ''}`} />;
    })}</div>)}</div><figcaption>{model.caption}</figcaption></figure>;
  }
  if (model.type === 'line') return <NumberLineModel model={model} />;

  return <table className="revision-place-table"><thead><tr>{['Thous.','Hund.','Tens','Ones','.','Tenths','Hundredths','Thousandths'].map(x => <th key={x}>{x}</th>)}</tr></thead><tbody>{(model.rows ?? [model.number ?? '']).map((row, idx) => <tr key={idx}>{row.split('').map((x,i) => <td key={i}>{x}</td>)}</tr>)}</tbody></table>;
}

function Paper({ sheet, index, isMini = false, theme = 'royal' }: { sheet: Sheet; index: number; isMini?: boolean; theme?: 'royal' | 'classic' }) {
  const chapter = chapters.find(c => c.id === sheet.chapter);
  const isDense = Boolean(
    sheet.words ||
    (sheet.model && (sheet.steps?.length ?? 0) >= 4) ||
    (sheet.column && (sheet.steps?.length ?? 0) >= 4) ||
    (sheet.shift && (sheet.steps?.length ?? 0) >= 4)
  );

  const isRoyal = theme === 'royal';

  return <article className={`paper ${isRoyal ? 'royal-edition' : ''} ${isDense ? 'is-dense' : ''} ${sheet.tag ? 'eval-sheet' : ''} ${isMini ? 'is-mini' : ''}`} data-sheet-id={sheet.id} aria-label={`Page ${index+1}: ${sheet.title}`}>
    <div className="binding" aria-hidden="true">{Array.from({length:18},(_,i) => <i key={i}/>)}</div>
    {isRoyal && (
      <>
        <div className="royal-border-outer" aria-hidden="true" />
        <div className="royal-border-inner" aria-hidden="true" />
        <div className="royal-corner corner-tl" aria-hidden="true" />
        <div className="royal-corner corner-tr" aria-hidden="true" />
        <div className="royal-corner corner-bl" aria-hidden="true" />
        <div className="royal-corner corner-br" aria-hidden="true" />
      </>
    )}
    <div className="paper-content">
      <div className="paper-running">
        <span>{isRoyal ? 'MINIA BRITISH INTERNATIONAL SCHOOL · GRADE 5' : 'GRADE 5 · MATHEMATICS'}</span>
        <span>{sheet.sourceSection ? `OCTOBER · SOURCE PAGE ${sheet.sourcePages?.[0]}` : chapter?.concept === 5 ? 'OCTOBER REVISION · HARDEST QUESTIONS' : chapter?.concept && chapter.concept >= 3 ? `OCTOBER REVISION · UNIT 2 · CONCEPT ${chapter.concept - 2}` : `OCTOBER REVISION · UNIT 1 · CONCEPT ${chapter?.concept}`}</span>
      </div>
      <div className="paper-lesson-banner">
        <span className="lesson-badge">{sheet.sourceSection ? `(${sheet.sourceNumber})` : chapter?.lessons}</span>
        <span className="lesson-topic">{sheet.sourceSection ? sheet.sourceSection === 'mcq' ? 'First: Choose the correct answer' : 'Second: Answer each of the following' : chapter?.title}</span>
      </div>
      <h2 className="paper-title">{sheet.title}</h2>
      {sheet.tag && <span className="eval-tag-pill">{sheet.tag}</span>}
      {sheet.vocabulary ? <>
        <table className="revision-vocab"><thead><tr><th>Math word</th><th>Simple meaning & example</th></tr></thead><tbody>{sheet.vocabulary.map(([term,definition]) => <tr key={term}><td>{term}</td><td>{definition}</td></tr>)}</tbody></table>
      </> : <>
        {sheet.words && (
          <div className="lesson-words">
            <span className="lesson-words-tag">Key Vocabulary:</span>
            {sheet.words.map(([t,x]) => (
              <p key={t} className="word-item"><b>{t}:</b> {x}</p>
            ))}
          </div>
        )}
        <div className="revision-rule"><span className="rule-label">The rule</span><p>{sheet.rule}</p></div>
        {sheet.items && sheet.items.length > 0 ? (
          <div className="worked-items-container">
            {sheet.items.map((item, idx) => (
              <section key={idx} className="worked-item-card">
                <div className="worked-item-header">
                  <span className="worked-item-badge">{item.label || `Question ${idx + 1}`}</span>
                  <p className="worked-question worked-item-question">{item.question}</p>
                </div>
                {item.shift && (
                  <div className="decimal-move">
                    <span>{item.shift.input}</span>
                    <span className="move-arrow">
                      {item.shift.direction === 'right' ? '→' : '←'}
                      <small>{item.shift.places} {item.shift.places === 1 ? 'place' : 'places'} {item.shift.direction}</small>
                    </span>
                    <mark>{item.shift.output}</mark>
                  </div>
                )}
                {item.steps && item.steps.length > 0 && (
                  <ol className="worked-steps">
                    {item.steps.map((st, sidx) => <li key={sidx}>{st}</li>)}
                  </ol>
                )}
                {item.column && <pre className="column-work">{item.column.lines.join('\n')}</pre>}
                {item.model && <MathModel model={item.model} />}
                {item.answer && (
                  <div className="worked-answer">
                    <Check size={18} />
                    <p>{item.answer}</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : (
          <>
            <h3 className="worked-label">Worked case</h3>
            <p className="worked-question">{sheet.question}</p>
            {sheet.shift && <div className="decimal-move"><span>{sheet.shift.input}</span><span className="move-arrow">{sheet.shift.direction === 'right' ? '→' : '←'}<small>{sheet.shift.places} {sheet.shift.places === 1 ? 'place' : 'places'} {sheet.shift.direction}</small></span><mark>{sheet.shift.output}</mark></div>}
            <ol className="worked-steps">{sheet.steps?.map((step,i) => <li key={i}>{step}</li>)}</ol>
            {sheet.model && <MathModel model={sheet.model}/>}
            {sheet.column && <pre className="column-work">{sheet.column.lines.join('\n')}</pre>}
            <div className="worked-answer"><Check size={20}/><p>{sheet.answer}</p></div>
          </>
        )}
        <div className={`revision-note ${index%3 === 0 ? 'yellow' : index%3 === 1 ? 'green' : 'pink'}`}><strong>Remember</strong><p>{sheet.note}</p></div>
      </>}
    </div>
    <footer className="paper-footer">
      <div className="footer-prepared">
        <img src={isRoyal ? "/mbis_logo.png" : badge.url} alt="Prepared by Mr. Ali Ashraf" className="footer-avatar-badge" />
        <span className="footer-teacher-name">
          {isRoyal ? (
            <>Prepared by <b>Mr. Ali Ashraf</b> <small>· Supervised by Ms. Hadeel & Ms. Christine</small></>
          ) : (
            'Prepared by Mr. Ali Ashraf'
          )}
        </span>
      </div>
      <span className="footer-page-num">{String(index+1).padStart(2,'0')}</span>
    </footer>
  </article>;
}

type NotebookMode = 'full' | 'two-up' | 'assessment' | 'source-order';

function Notebook() {
  const [mode, setMode] = useState<NotebookMode>('full');
  const [page, setPage] = useState(0);
  const [evalPage, setEvalPage] = useState(0);
  const [twoUpIndex, setTwoUpIndex] = useState(0);
  const [zoom, setZoom] = useState(90);
  const [sidebar, setSidebar] = useState(true);
  const [isCover, setIsCover] = useState(true);
  const [theme, setTheme] = useState<'royal' | 'classic'>('royal');
  const isAssessment = mode === 'assessment' || mode === 'source-order';
  const assessmentSheets = mode === 'source-order' ? sourceOrderSheets : lessonAssessmentSheets;
  const octoberCount = assessmentSheets.findIndex(s => s.id.startsWith('booklet-'));
  const assessmentCount = octoberCount < 0 ? assessmentSheets.length : octoberCount;

  // Group sheets into pairs for 2-up printing/viewing
  const pairs: [Sheet, Sheet | null][] = [];
  for (let i = 0; i < sheets.length; i += 2) {
    const first = sheets[i];
    if (first) pairs.push([first, sheets[i + 1] ?? null]);
  }

  useEffect(() => {
    if (window.innerWidth <= 760) setSidebar(false);
  }, []);

  useEffect(() => {
    const fit = () => {
      const mobile = window.innerWidth <= 760;
      const available = Math.min(window.innerWidth, 1600) - (!mobile && sidebar ? 300 : 0) - 48;
      const paperWidth = mode === 'two-up' ? 1118 : 794;
      setZoom(Math.max(30, Math.min(90, Math.floor(available / paperWidth * 100))));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [mode, sidebar]);

  useEffect(() => {
    document.body.classList.remove('print-mode-full', 'print-mode-2up', 'print-mode-chal', 'theme-royal', 'theme-classic');
    if (theme === 'royal') {
      document.body.classList.add('theme-royal');
    } else {
      document.body.classList.add('theme-classic');
    }
    document.body.classList.add(mode === 'two-up' ? 'print-mode-2up' : isAssessment ? 'print-mode-chal' : 'print-mode-full');
  }, [mode, theme, isAssessment]);

  const go = (p: number) => {
    setIsCover(false);
    setPage(Math.max(0, Math.min(sheets.length - 1, p)));
    setTwoUpIndex(Math.floor(p / 2));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goEval = (p: number) => {
    setIsCover(false);
    setEvalPage(Math.max(0, Math.min(assessmentSheets.length - 1, p)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goTwoUp = (pairIdx: number) => {
    setIsCover(false);
    const safeIdx = Math.max(0, Math.min(pairs.length - 1, pairIdx));
    setTwoUpIndex(safeIdx);
    setPage(safeIdx * 2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const print = async () => {
    // Set class on body for accurate print styling
    document.body.classList.remove('print-mode-full', 'print-mode-2up', 'print-mode-chal', 'theme-royal', 'theme-classic');
    if (theme === 'royal') {
      document.body.classList.add('theme-royal');
    } else {
      document.body.classList.add('theme-classic');
    }
    if (mode === 'two-up') {
      document.body.classList.add('print-mode-2up');
    } else if (isAssessment) {
      document.body.classList.add('print-mode-chal');
    } else {
      document.body.classList.add('print-mode-full');
    }

    await document.fonts.ready;
    window.print();
  };

  return (
    <div className={`notebook-app english-revision mode-${mode}`}>
      <header className="app-header">
        <div className="app-brand">
          <span className="brand-icon"><BookOpen size={23}/></span>
          <div>
            <h1>Math Notebook<span className="brand-dot">.</span></h1>
            <p>Grade 5 · Units 1–2 · Mr. Ali Ashraf</p>
          </div>
        </div>

        {/* Royal Edition vs Classic Switcher */}
        <div className="theme-switcher-group" role="radiogroup" aria-label="Booklet Design Theme">
          <Button
            variant="ghost"
            type="button"
            className={`theme-switch-btn ${theme === 'royal' ? 'active-royal' : ''}`}
            onClick={() => setTheme('royal')}
            title="النسخة الملكية الفاخرة المعتمدة بشعار مدرسة MBIS والإطارات الذهبية والكحلية"
          >
            <Sparkles size={14} style={{ marginRight: '6px', color: theme === 'royal' ? '#f7d070' : '#c8a251' }} />
            <span>النسخة الملكية (MBIS Royal)</span>
          </Button>
          <Button
            variant="ghost"
            type="button"
            className={`theme-switch-btn ${theme === 'classic' ? 'active-classic' : ''}`}
            onClick={() => setTheme('classic')}
            title="النسخة الدفترية الأصلية بخط اليد"
          >
            <BookOpen size={14} style={{ marginRight: '6px' }} />
            <span>النسخة الدفترية (Classic)</span>
          </Button>
          <Button variant="ghost"
            type="button"
            className={`edition-tab ${mode === 'source-order' ? 'active' : ''}`}
            aria-pressed={mode === 'source-order'}
            onClick={() => { setMode('source-order'); setEvalPage(0); setIsCover(true); }}
          >
            <List size={15} />
            <span>حل أكتوبر بالترتيب الأصلي + البوكليت</span>
          </Button>
        </div>

        {/* Version / Edition Switcher */}
        <div className="edition-tabs">
          <Button variant="ghost"
            type="button"
            className={`edition-tab ${mode === 'full' ? 'active' : ''}`}
            aria-pressed={mode === 'full'}
            onClick={() => setMode('full')}
            title="النسخة الكاملة المفصلة (صفحة واحدة A4 عمودي)"
          >
            <FileText size={15} />
            <span>النسخة الأصلية (صفحة A4)</span>
          </Button>
          <Button variant="ghost"
            type="button"
            className={`edition-tab ${mode === 'two-up' ? 'active' : ''}`}
            aria-pressed={mode === 'two-up'}
            onClick={() => setMode('two-up')}
            title="نسخة موفرة للطباعة (صفحتين جنب بعض A4 بالعرض)"
          >
            <Copy size={15} />
            <span>نسخة صفحتين جنب بعض (A4 أفقي)</span>
          </Button>
          <Button variant="ghost"
            type="button"
            className={`edition-tab ${mode === 'assessment' ? 'active' : ''}`}
            aria-pressed={mode === 'assessment'}
            onClick={() => setMode('assessment')}
            title="مذكرة شهر أكتوبر: حل تقييمات الوزارة وأصعب أسئلة البوكليت"
          >
            <Sparkles size={15} />
            <span>مذكرة أكتوبر وأسئلة البوكليت</span>
          </Button>
        </div>

        <div className="header-actions">
          <span className="ready-label"><span/>Print ready</span>
          <Button onClick={print} className="print-button">
            <Printer/>
            <span>
              {mode === 'two-up' ? 'Print 2-Up Booklet' : isAssessment ? 'Print Assessments' : 'Print Notebook'}
              <small> / PDF</small>
            </span>
          </Button>
        </div>
      </header>

      <div className="workspace">
        <main className="viewer">
          <div className="viewer-toolbar">
            <div className="toolbar-group">
              <Button size="icon" variant="ghost" onClick={() => setSidebar(!sidebar)} aria-label="Toggle contents">
                {sidebar ? <PanelRightClose/> : <PanelRightOpen/>}
              </Button>
              <span className="toolbar-title">
                {isCover
                  ? 'Cover Page · Minia British International School (MBIS)'
                  : isAssessment
                  ? assessmentSheets[evalPage]?.title
                  : mode === 'two-up'
                  ? `Sheets ${twoUpIndex * 2 + 1} & ${Math.min(sheets.length, twoUpIndex * 2 + 2)} · ${sheets[twoUpIndex * 2]?.title}`
                  : sheets[page]?.title}
              </span>
            </div>
            <div className="toolbar-group zoom-controls">
              <Button size="icon" variant="ghost" aria-label="Zoom out" disabled={zoom<=30} onClick={() => setZoom(Math.max(30,zoom-10))}><Minus/></Button>
              <span>{zoom}%</span>
              <Button size="icon" variant="ghost" aria-label="Zoom in" disabled={zoom>=110} onClick={() => setZoom(Math.min(110,zoom+10))}><Plus/></Button>
              <span className="toolbar-divider"/>
              <span>{mode === 'two-up' ? 'A4 Landscape (2-Up)' : 'A4 Portrait'}</span>
            </div>
          </div>

          {/* VIEW MODE 1: ORIGINAL FULL NOTEBOOK (1 Page per A4 sheet) */}
          {mode === 'full' && (
            <>
              <div className="paper-stage">
                <div className="paper-scale" style={{ zoom: zoom / 100 }}>
                  <div className={`page-slot ${isCover ? 'active-page' : ''} cover-slot`}>
                    <OctoberCoverPage />
                  </div>
                  {sheets.map((s, i) => (
                    <div key={s.id} className={`page-slot ${!isCover && i === page ? 'active-page' : ''}`}>
                      <Paper sheet={s} index={i} theme={theme} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="page-navigation">
                <Button variant="outline" size="icon" onClick={() => {
                  if (page === 0 && !isCover) setIsCover(true);
                  else if (!isCover) go(page - 1);
                }} disabled={isCover} aria-label="Previous page"><ChevronLeft/></Button>
                <span>{isCover ? <b>Cover Page · غلاف المذكرة</b> : <>Page <b>{page + 1}</b> of {sheets.length}</>}</span>
                <Button variant="outline" size="icon" onClick={() => {
                  if (isCover) { setIsCover(false); setPage(0); }
                  else go(page + 1);
                }} disabled={!isCover && page === sheets.length - 1} aria-label="Next page"><ChevronRight/></Button>
              </div>
            </>
          )}

          {/* VIEW MODE 2: 2-UP SIDE-BY-SIDE (2 Pages per A4 Landscape sheet) */}
          {mode === 'two-up' && (
            <>
              <div className="paper-stage two-up-stage">
                <div className="two-up-scale" style={{ zoom: zoom / 100 }}>
                  {isCover ? (
                    <div className="page-slot active-page cover-slot" style={{ display: 'flex', justifyContent: 'center' }}>
                      <OctoberCoverPage />
                    </div>
                  ) : (
                    pairs.map(([leftSheet, rightSheet], idx) => (
                      <div key={leftSheet.id} className={`two-up-slot ${idx === twoUpIndex ? 'active-two-up' : ''}`}>
                        <div className="two-up-pair-card">
                          <div className="two-up-half left-half">
                            <Paper sheet={leftSheet} index={idx * 2} isMini theme={theme} />
                          </div>
                          {rightSheet ? (
                            <div className="two-up-half right-half">
                              <Paper sheet={rightSheet} index={idx * 2 + 1} isMini theme={theme} />
                            </div>
                          ) : (
                            <div className="two-up-half empty-half" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="page-navigation">
                <Button variant="outline" size="icon" onClick={() => {
                  if (twoUpIndex === 0 && !isCover) setIsCover(true);
                  else if (!isCover) goTwoUp(twoUpIndex - 1);
                }} disabled={isCover} aria-label="Previous sheet"><ChevronLeft/></Button>
                <span>{isCover ? <b>Cover Page · غلاف المذكرة</b> : <>Sheet <b>{twoUpIndex + 1}</b> of {pairs.length} (Pages {twoUpIndex * 2 + 1}–{Math.min(sheets.length, twoUpIndex * 2 + 2)})</>}</span>
                <Button variant="outline" size="icon" onClick={() => {
                  if (isCover) { setIsCover(false); setTwoUpIndex(0); }
                  else goTwoUp(twoUpIndex + 1);
                }} disabled={!isCover && twoUpIndex === pairs.length - 1} aria-label="Next sheet"><ChevronRight/></Button>
              </div>
            </>
          )}

          {/* VIEW MODE 3: HIGH-YIELD CHALLENGING REVISION NOTEBOOK */}
          {isAssessment && (
            <>
              <div className="paper-stage">
                <div className="paper-scale" style={{ zoom: zoom / 100 }}>
                  <div className={`page-slot ${isCover ? 'active-page' : ''} cover-slot`}>
                    <OctoberCoverPage />
                  </div>
                  {assessmentSheets.map((s, i) => (
                    <div key={s.id} className={`page-slot ${!isCover && i === evalPage ? 'active-page' : ''}`}>
                      <Paper sheet={s} index={i} theme={theme} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="page-navigation">
                <Button variant="outline" size="icon" onClick={() => {
                  if (evalPage === 0 && !isCover) setIsCover(true);
                  else if (!isCover) goEval(evalPage - 1);
                }} disabled={isCover} aria-label="Previous assessment sheet"><ChevronLeft/></Button>
                <span>{isCover ? <b>Cover Page · غلاف المذكرة</b> : <>Assessment Sheet <b>{evalPage + 1}</b> of {assessmentSheets.length}</>}</span>
                <Button variant="outline" size="icon" onClick={() => {
                  if (isCover) { setIsCover(false); setEvalPage(0); }
                  else goEval(evalPage + 1);
                }} disabled={!isCover && evalPage === assessmentSheets.length - 1} aria-label="Next assessment sheet"><ChevronRight/></Button>
              </div>
            </>
          )}
        </main>

        {sidebar && (
          <aside className="notebook-contents">
            <div className="contents-title">
              <List size={19}/>
              <h2>Notebook contents</h2>
              <span>{isAssessment ? `${assessmentSheets.length} assessment sheets` : `${sheets.length} pages`}</span>
            </div>

            <div className="cover-nav-section" style={{ padding: '6px 12px 12px', borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: '10px' }}>
              <Button
                variant="ghost"
                className={`contents-item cover-item ${isCover ? 'selected' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', textAlign: 'left' }}
                onClick={() => { setIsCover(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <Sparkles size={16} style={{ color: '#c8a251', flexShrink: 0 }} />
                <span>
                  Cover Page · غلاف المذكرة
                  <small style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>MBIS · October Revision · Grade 5</small>
                </span>
                {isCover && <span className="active-dot" />}
              </Button>
            </div>

            {isAssessment ? (
              <div className="challenging-nav-list">
                <div className="unit-summary">
                  <span className="unit-tag">OCTOBER ASSESSMENTS</span>
                  <h3>October Assessment<br/>Step-by-step Solutions</h3>
                  <p>{mode === 'source-order' ? '12 MCQs · 43 written questions' : `Ministry evaluation models · ${assessmentCount} sheets`}</p>
                </div>
                {assessmentSheets.slice(0, assessmentCount).map((cs, idx) => (
                  <Button
                    key={cs.id}
                    variant="ghost"
                    className={`contents-item ${evalPage === idx ? 'selected' : ''}`}
                    onClick={() => goEval(idx)}
                  >
                    <Sparkles size={16} />
                    <span>
                      {cs.title}
                      <small>{cs.sourceSection ? `${cs.sourceSection === 'mcq' ? 'First · Choose' : 'Second · Written'} (${cs.sourceNumber})` : chapters.find(c => c.id === cs.chapter)?.title} · Sheet {idx + 1}</small>
                    </span>
                    {evalPage === idx && <span className="active-dot"/>}
                  </Button>
                ))}

                {assessmentSheets.length > assessmentCount && (
                  <>
                    <div className="unit-summary" style={{ marginTop: '16px' }}>
                      <span className="unit-tag">HOMEWORK BOOKLET</span>
                      <h3>Hardest Booklet Questions<br/>Step-by-step Solutions</h3>
                      <p>Selected challenges · 14 sheets</p>
                    </div>
                    {assessmentSheets.slice(assessmentCount).map((cs, i) => {
                      const idx = assessmentCount + i;
                      return (
                        <Button
                          key={cs.id}
                          variant="ghost"
                          className={`contents-item ${evalPage === idx ? 'selected' : ''}`}
                          onClick={() => goEval(idx)}
                        >
                          <BookOpen size={16} />
                          <span>
                            {cs.title}
                            <small>{chapters.find(c => c.id === cs.chapter)?.title} · Sheet {idx + 1}</small>
                          </span>
                          {evalPage === idx && <span className="active-dot"/>}
                        </Button>
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="unit-summary">
                  <span className="unit-tag">UNITS 1 & 2</span>
                  <h3>Decimal Place Value & Equations</h3>
                  <p>Rules, models & worked cases</p>
                </div>
                {[1, 2, 3, 4, 5].map(concept => (
                  <div className="concept-group" key={concept}>
                    <h4>
                      {concept === 5 ? 'Homework Booklet · Hardest Questions' : concept >= 3 ? `Unit 2 · Concept ${concept - 2}` : `Concept ${concept}`}
                      <small>{concept === 1 ? 'Decimal place value' : concept === 2 ? 'Addition & subtraction' : concept === 3 ? 'Expressions & equations' : concept === 4 ? 'Factors & multiples' : 'Booklet challenges solved step by step'}</small>
                    </h4>
                    {chapters.filter(c => c.concept === concept).map(c => (
                      <Button
                        key={c.id}
                        variant="ghost"
                        className={`contents-item ${sheets[page]?.chapter === c.id ? 'selected' : ''}`}
                        onClick={() => go(c.start)}
                      >
                        <BookOpen size={18}/>
                        <span>
                          {c.title}
                          <small>{c.lessons} · pp. {c.start + 1}–{c.start + c.count}</small>
                        </span>
                        {sheets[page]?.chapter === c.id && <span className="active-dot"/>}
                      </Button>
                    ))}
                  </div>
                ))}
              </>
            )}

            <div className="contents-footer">
              <GraduationCap size={20}/>
              <span>Mr. Ali Ashraf · Grade 5<small>English worked revision</small></span>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
