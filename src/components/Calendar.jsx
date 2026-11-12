import { useMemo, useState } from "react";
import { TYPES, EVENTS, TODAY } from "../data";

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const DIAS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
const key = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function Pop({ e, onView }) {
  const t = TYPES[e.t];
  return (
    <div className="pop" style={{ background: t.bg, borderColor: t.c + "55" }}>
      <b style={{ color: t.c === "#e6d325" ? "#8a6d00" : t.c }}>{e.n}</b>
      <b
        className="mt-1"
        style={{ color: t.c === "#e6d325" ? "#8a6d00" : t.c }}
      >
        {t.l}
      </b>
      <small>{e.e}</small>
      <a
        href="#!"
        onClick={(ev) => {
          ev.preventDefault();
          onView(e.e);
        }}
      >
        ver perfil
      </a>
    </div>
  );
}

export default function Calendar({ onViewProfile }) {
  const [cur, setCur] = useState(
    new Date(TODAY.getFullYear(), TODAY.getMonth(), 1),
  );
  const [filter, setFilter] = useState("all");

  const byDate = useMemo(() => {
    const m = {};
    EVENTS.filter((e) => filter === "all" || e.t === filter).forEach((e) =>
      (m[e.d] ??= []).push(e),
    );
    return m;
  }, [filter]);

  const monthCount = useMemo(() => {
    const pre = key(cur).slice(0, 7);
    return Object.entries(byDate).reduce(
      (a, [d, v]) => a + (d.startsWith(pre) ? v.length : 0),
      0,
    );
  }, [byDate, cur]);

  const off = (cur.getDay() + 6) % 7;
  const days = new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate();
  const cells = Array.from(
    { length: Math.ceil((off + days) / 7) * 7 },
    (_, i) => new Date(cur.getFullYear(), cur.getMonth(), i - off + 1),
  );
  const go = (n) => setCur(new Date(cur.getFullYear(), cur.getMonth() + n, 1));

  return (
    <div className="wrap-wide">
      <div className="summary">
        <div className="d-flex align-items-center gap-3">
          <span className="ico-box sm">
            <i className="bi bi-calendar3" />
          </span>
          <span className="big">{monthCount}</span>
          <span className="muted">eventos este mes</span>
        </div>
        <div className="legend">
          {Object.values(TYPES).map((t) => (
            <span key={t.l}>
              <i style={{ background: t.c }} />
              {t.l}
            </span>
          ))}
        </div>
      </div>
      <div className="cal-bar">
        <div className="d-flex align-items-center gap-3">
          <button className="sq" onClick={() => go(-1)}>
            <i className="bi bi-chevron-left" />
          </button>
          <span className="mes">
            {MESES[cur.getMonth()]}{" "}
            <span className="muted">{cur.getFullYear()}</span>
          </span>
          <button className="sq" onClick={() => go(1)}>
            <i className="bi bi-chevron-right" />
          </button>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn-w sm"
            onClick={() =>
              setCur(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1))
            }
          >
            Hoy
          </button>
          <select
            className="form-select form-select-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todos los eventos</option>
            {Object.entries(TYPES).map(([k, t]) => (
              <option key={k} value={k}>
                {t.l}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="cal">
        {DIAS.map((d) => (
          <div className="cal-h" key={d}>
            {d}
          </div>
        ))}
        {cells.map((d) => {
          const out = d.getMonth() !== cur.getMonth();
          const evs = byDate[key(d)] || [];
          const many = evs.length > 2;
          const shown = many ? evs.slice(0, 0) : evs;
          const today = key(d) === key(TODAY);
          return (
            <div className={`cell ${out ? "out" : ""}`} key={+d}>
              <span className={today ? "today" : ""}>{d.getDate()}</span>

              {shown.map((e, i) => (
                <div
                  className="ev"
                  key={i}
                  style={{
                    background: TYPES[e.t].bg,
                    color:
                      TYPES[e.t].c === "#e6d325" ? "#8a6d00" : TYPES[e.t].c,
                  }}
                >
                  {e.n}
                  <Pop e={e} onView={onViewProfile} />
                </div>
              ))}
              {many && (
                <div className="more">
                  +{evs.length} eventos registrados
                  <div className="pop-list">
                    {evs.map((e, i) => (
                      <Pop key={i} e={e} onView={onViewProfile} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
