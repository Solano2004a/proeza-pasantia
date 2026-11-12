import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEED } from "../data";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import Profiles from "./Profiles";
import CreateProfile from "./CreateProfile";
import ViewProfile from "./ViewProfile";
import HistoryChanges from "./HistoryChanges";

const HEAD = {
  calendar: [
    "Calendario",
    "Organiza y anticipa las fechas importantes de tu equipo.",
  ],
  profiles: [
    "Perfiles",
    "Organiza y anticipa las fechas importantes de tu equipo.",
  ],
  create: [
    "Crear perfil",
    "Registra la información personal, laboral y documental del colaborador.",
  ],
};

export default function AdminPanel() {
  const nav = useNavigate();
  const [section, setSection] = useState("calendar");
  const [collapsed, setCollapsed] = useState(false);
  const [profiles, setProfiles] = useState(SEED);
  const [viewId, setViewId] = useState(null);
  const [histId, setHistId] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [flow, setFlow] = useState("welcome"); // welcome | admin | instructions | null
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    usuario: "",
    pass: "",
    pass2: "",
  });
  const f = (k) => ({
    value: form[k],
    onChange: (e) => setForm({ ...form, [k]: e.target.value }),
    required: true,
  });
  const [title, sub] = HEAD[section];
  const byId = (id) => profiles.find((p) => p.id === id);

  const saveAdmin = (e) => {
    e.preventDefault();
    if (form.pass !== form.pass2) return alert("Las contraseñas no coinciden");
    const first = !admin;
    setAdmin(form);
    setFlow(first ? "instructions" : null);
  };
  const viewByEmail = (email) =>
    setViewId((profiles.find((p) => p.correoCorp === email) || profiles[0]).id);

  return (
    <div className="app">
      <Sidebar
        section={section}
        setSection={setSection}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        admin={admin}
        showAdmin={() => setFlow("admin")}
        onLogout={() => nav("/")}
      />
      <main className="main">
        <header className="topbar">
          <div>
            <h1>{title}</h1>
            <p>{sub}</p>
          </div>
          <button className="bell">
            <i className="bi bi-bell" />
            <u />
          </button>
        </header>
        <div className="content">
          {section === "calendar" && <Calendar onViewProfile={viewByEmail} />}
          {section === "profiles" && (
            <Profiles
              profiles={profiles}
              onView={setViewId}
              onHistory={setHistId}
              onDelete={(id) =>
                window.confirm("¿Eliminar este perfil?") &&
                setProfiles((p) => p.filter((x) => x.id !== id))
              }
            />
          )}
          {section === "create" && (
            <CreateProfile
              onCancel={() => setSection("profiles")}
              onSave={(d) => {
                setProfiles((p) => [
                  ...p,
                  { ...d, id: Date.now(), history: [] },
                ]);
                setSection("profiles");
              }}
            />
          )}
        </div>
      </main>

      {viewId && byId(viewId) && (
        <ViewProfile
          key={viewId}
          profile={byId(viewId)}
          onClose={() => setViewId(null)}
          onHistory={setHistId}
          onSave={(d, changes) =>
            setProfiles((p) =>
              p.map((x) =>
                x.id === d.id
                  ? { ...d, history: [...changes.reverse(), ...x.history] }
                  : x,
              ),
            )
          }
        />
      )}
      {histId && byId(histId) && (
        <HistoryChanges
          profile={byId(histId)}
          onClose={() => setHistId(null)}
        />
      )}

      {flow === "welcome" && (
        <div className="overlay">
          <div className="modal-x md">
            <h4>Bienvenido al panel administrativo</h4>
            <p>
              El primer paso es configurar tu perfil administrativo. Por favor,
              completa los campos requeridos en esta sección antes de continuar
            </p>
            <div className="text-end">
              <button className="btn-p sm" onClick={() => setFlow("admin")}>
                Ir a perfil administrativo
              </button>
            </div>
          </div>
        </div>
      )}
      {flow === "admin" && (
        <div className="overlay">
          <form className="modal-x xl" onSubmit={saveAdmin}>
            <h3 className="light">Datos del administrador</h3>
            <small className="muted d-block mb-4">
              Por favor, completa el registro del perfil de administrador
            </small>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="lbl">Nombre Completo</label>
                <input className="form-control" {...f("nombre")} />
                <label className="lbl mt-3">nombre de usuario</label>
                <input className="form-control" {...f("usuario")} />
                <small className="note">
                  Nota: El nombre de usuario y contraseña establecidos podrán
                  ser utilizados la próxima vez que se inicie sesión
                </small>
              </div>
              <div className="col-md-6">
                <label className="lbl">correo corporativo</label>
                <input className="form-control" type="email" {...f("correo")} />
                <label className="lbl mt-3">contraseña</label>
                <input
                  className="form-control"
                  type="password"
                  {...f("pass")}
                />
                <label className="lbl mt-3">confirmar contraseña</label>
                <input
                  className="form-control"
                  type="password"
                  {...f("pass2")}
                />
              </div>
            </div>
            <div className="text-end mt-3 d-flex justify-content-end gap-2">
              {admin && (
                <button
                  type="button"
                  className="btn-w sm"
                  onClick={() => setFlow(null)}
                >
                  Cancelar
                </button>
              )}
              <button className="btn-p sm">Guardar cambios</button>
            </div>
          </form>
        </div>
      )}
      {flow === "instructions" && (
        <div className="overlay">
          <div className="modal-x md">
            <h4>Instrucciones básicas</h4>
            <p>
              Perfecto! Ahora puedes crear perfiles de empleados de Proeza en la
              sección “Crear perfil” y visualizar todos los perfiles que crees
              en “Perfiles”. Cuando exista algún evento próximo de acuerdo a la
              información que completes sobre los perfiles al crearlos o
              editarlos, aparecerá en “Calendario”.
            </p>
            <div className="text-end">
              <button className="btn-g" onClick={() => setFlow(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
