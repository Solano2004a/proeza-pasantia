import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  [
    "calendar3",
    "Calendario inteligente",
    "Visualiza eventos y vencimientos importantes.",
  ],
  [
    "people",
    "Perfiles centralizados",
    "Consulta la información de todo tu equipo.",
  ],
  ["bell", "Alertas oportunas", "Recibe avisos antes de cada vencimiento."],
];

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("andrea.guzman@proeza.com");
  const [pass, setPass] = useState("••••••••••");
  const [show, setShow] = useState(false);

  return (
    <div className="login">
      <section className="login-left">
        <div className="brand">
          <span className="logo">P</span>
          <div>
            <b>PROEZA</b>
            <small>Gestión de personas</small>
          </div>
        </div>
        <div className="login-copy">
          <div className="kicker">
            <i /> TALENTO HUMANO
          </div>
          <h1>La gestión de tu equipo, en un solo lugar.</h1>
          <p>
            Anticipa fechas importantes, organiza la información de tus
            colaboradores y mantén cada proceso bajo control.
          </p>
          {FEATURES.map(([i, t, d]) => (
            <div className="feat" key={t}>
              <span>
                <i className={`bi bi-${i}`} />
              </span>
              <div>
                <b>{t}</b>
                <small>{d}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="login-right">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            nav("/main-panel");
          }}
        >
          <span className="login-ico">
            <i className="bi bi-briefcase" />
          </span>
          <small className="portal">PORTAL ADMINISTRATIVO</small>
          <h2>Bienvenido de nuevo</h2>
          <p className="muted">
            Ingresa tus credenciales para acceder al panel de gestión.
          </p>
          <label className="lbl">
            Correo corporativo <b className="text-danger">*</b>
          </label>
          <div className="inp-ico">
            <i className="bi bi-envelope" />
            <input
              className="form-control"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label className="lbl mt-4">
            Contraseña <b className="text-danger">*</b>
          </label>
          <div className="inp-ico">
            <i className="bi bi-check-lg" />
            <input
              className="form-control"
              type={show ? "text" : "password"}
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="button"
              className="show"
              onClick={() => setShow(!show)}
            >
              {show ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div className="text-end mt-3 mb-3">
            <a href="#!" className="forgot">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button className="btn-p w-100 py-3">
            Ingresar <i className="bi bi-chevron-right ms-3" />
          </button>
        </form>
      </section>
    </div>
  );
}
