import { useState } from "react";
import { STEPS, blank } from "../data";
import StepForm from "./StepForm";

export default function CreateProfile({ onSave, onCancel }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(blank());
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const S = STEPS[step];

  const submit = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else onSave(data);
  };

  return (
    <div className="wrap">
      <div className="crumb">
        <a href="#!" onClick={onCancel}>
          Perfiles
        </a>{" "}
        <i className="bi bi-chevron-right" /> <span>Nuevo perfil</span>
      </div>
      <div className="stepper">
        {STEPS.map((s, i) => (
          <div className="stp" key={s.title}>
            <span className={`dot ${i <= step ? "on" : ""}`}>
              {i < step ? <i className="bi bi-check-lg" /> : i + 1}
            </span>
            <div>
              <b className={i === step ? "cur" : ""}>{s.title}</b>
              <small>{s.sub}</small>
            </div>
          </div>
        ))}
      </div>
      <form className="card-x" onSubmit={submit}>
        <header className="card-h">
          <span className="ico-box">
            <i className={`bi bi-${S.icon}`} />
          </span>
          <div>
            <h5>{S.title}</h5>
            <small className="muted">{S.desc}</small>
          </div>
          <span className="pill">Paso {step + 1} de 3</span>
        </header>
        <div className="card-b">
          <StepForm step={step} data={data} set={set} />
        </div>
        <footer className="card-f">
          {step === 0 && (
            <button type="button" className="btn-w" onClick={onCancel}>
              Cancelar
            </button>
          )}
          {step > 0 && (
            <button
              type="button"
              className="btn-w"
              onClick={() => setStep(step - 1)}
            >
              Anterior
            </button>
          )}
          <button className="btn-p">
            {step < 2 ? (
              <>
                Continuar <i className="bi bi-chevron-right ms-2" />
              </>
            ) : (
              <>
                <i className="bi bi-check-lg me-2" />
                Guardar perfil
              </>
            )}
          </button>
        </footer>
      </form>
    </div>
  );
}
