import { useMemo, useState } from "react";

const COLORS = [
  ["#e5dcef", "#3b1b63"],
  ["#fff3c4", "#8a6d00"],
  ["#fde4ea", "#b02a52"],
  ["#e6eeff", "#3b4db0"],
];

export default function Profiles({ profiles, onView, onHistory, onDelete }) {
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(null);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t
      ? profiles.filter((p) =>
          [p.nombre, p.correoCorp, p.cargo].some((v) =>
            v.toLowerCase().includes(t),
          ),
        )
      : profiles;
  }, [q, profiles]);

  return (
    <div className="wrap-wide">
      <div className="search">
        <i className="bi bi-search" />
        <input
          placeholder="Buscar por nombre, correo o cargo..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <h6 className="count">{list.length} Colaboradores</h6>
      <div className="tbl">
        <div className="tr th">
          <span>COLABORADOR</span>
          <span>CARGO Y ÁREA</span>
          <span>OFICINA</span>
          <span>CONTACTO</span>
          <span />
        </div>
        {list.map((p, i) => {
          const [bg, c] = COLORS[i % 4];
          const ini = p.nombre
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
          return (
            <div className="tr" key={p.id}>
              <span className="d-flex align-items-center gap-3">
                <span className="av-sq" style={{ background: bg, color: c }}>
                  {ini}
                </span>
                <span>
                  <b>{p.nombre}</b>
                  <small>{p.correoCorp}</small>
                </span>
              </span>
              <span>
                <b>{p.cargo}</b>
                <small>{p.area}</small>
              </span>
              <span>
                <b>{p.oficina}</b>
                <small>Agencia central</small>
              </span>
              <span>
                <b>
                  <i className="bi bi-telephone me-2" />
                  {p.celCorp}
                </b>
                <small>Corporativo</small>
              </span>
              <span className="pos-rel text-end">
                <button
                  className="dots-l"
                  onClick={() => setMenu(menu === p.id ? null : p.id)}
                >
                  <i className="bi bi-three-dots" />
                </button>
                {menu === p.id && (
                  <>
                    <div className="backdrop" onClick={() => setMenu(null)} />
                    <div className="menu-l">
                      <button
                        onClick={() => {
                          setMenu(null);
                          onView(p.id);
                        }}
                      >
                        Ver perfil
                      </button>
                      <button
                        onClick={() => {
                          setMenu(null);
                          onHistory(p.id);
                        }}
                      >
                        Ver historial de cambios
                      </button>
                      <button
                        onClick={() => {
                          setMenu(null);
                          onDelete(p.id);
                        }}
                      >
                        Eliminar perfil
                      </button>
                    </div>
                  </>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
