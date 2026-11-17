import { useMemo, useState } from "react";

const MES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];
const fmt = (d) => {
  const [y, m, day] = d.split("-");
  return `${+day} de ${MES[+m - 1]}, ${y}`;
};

export default function HistoryChanges({ profile, onClose }) {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    const list = profile.history.filter(
      (h) => !t || h.label.toLowerCase().includes(t) || fmt(h.date).includes(t),
    );
    return list.reduce((a, h) => ((a[h.date] ??= []).push(h), a), {});
  }, [q, profile]);

  return (
    <div className="overlay">
      <div className="modal-x lg">
        <h4 className="mt-title">
          <i className="bi bi-folder me-3" />
          Historial de cambios
        </h4>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="search-s">
            <i className="bi bi-search" />
            <input
              placeholder="Buscar por nombre del campo o fecha"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <small className="me-5">{profile.nombre}</small>
        </div>
        <div className="hist">
          {Object.entries(groups).map(([d, items]) => (
            <div key={d}>
              <small className="hd">Cambios - {fmt(d)}</small>
              {items.map((h, i) => (
                <div className="hrow" key={i}>
                  <span>
                    <b>{h.label}:</b>{" "}
                    <span className="ms-2">
                      {h.from || "—"} → {h.to || "—"}
                    </span>
                  </span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          ))}
          {!Object.keys(groups).length && (
            <p className="muted">No hay cambios registrados.</p>
          )}
        </div>
        <div className="text-end">
          <button className="btn-g" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
