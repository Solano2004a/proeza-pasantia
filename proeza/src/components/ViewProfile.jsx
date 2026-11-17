import { useState } from "react";
import { STEPS } from "../data";
import StepForm from "./StepForm";

const dt = (v) =>
  /^\d{4}-\d\d-\d\d$/.test(v)
    ? `${v.slice(8)}/${v.slice(5, 7)}/${v.slice(2, 4)}`
    : v;

export function diff(a, b) {
  const now = new Date(),
    pad = (n) => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
    time = `${now.getHours()}:${pad(now.getMinutes())}`;
  const out = [];
  STEPS.forEach((s) => {
    s.fields.forEach(
      ([k, l, , t]) =>
        a[k] !== b[k] &&
        out.push({ date, time, label: l, from: dt(a[k]), to: dt(b[k]) }),
    );
    if (
      s.list &&
      JSON.stringify(a[s.list.key]) !== JSON.stringify(b[s.list.key])
    )
      out.push({
        date,
        time,
        label: s.list.title,
        from: "modificado",
        to: "actualizado",
      });
  });
  return out;
}

export default function ViewProfile({ profile, onClose, onSave, onHistory }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(profile);
  const [edit, setEdit] = useState(false);
  const [warn, setWarn] = useState(false);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const dirty = JSON.stringify(data) !== JSON.stringify(profile);
  const S = STEPS[step];
  const tryClose = () => (dirty ? setWarn(true) : onClose());

  return (
    <div className="overlay">
      <div className="modal-x xl">
        <div className="mh">
          <h4>
            <i className={`bi bi-${S.icon} me-3`} />
            {S.title
              .replace("social", "Social")
              .replace("personales", "Personales")
              .replace("laborales", "Laborales")}
          </h4>
          <div className="d-flex gap-3 align-items-center">
            <button
              className="ic tip"
              data-tip="Ver historial de cambios"
              onClick={() => onHistory(profile.id)}
            >
              <i className="bi bi-clock-history" />
            </button>
            <button className="ic sq-x" onClick={tryClose}>
              <i className="bi bi-x-lg" />
            </button>
          </div>
        </div>
        <div className="mb-body">
          <StepForm step={step} data={data} set={set} disabled={!edit} />
        </div>
        <div className="mf">
          <div className="d-flex gap-3">
            {!edit ? (
              <button className="btn-g" onClick={() => setEdit(true)}>
                Habilitar edición
              </button>
            ) : (
              <>
                <button
                  className="btn-w"
                  onClick={() => {
                    setData(profile);
                    setEdit(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="btn-p"
                  disabled={!dirty}
                  onClick={() => {
                    onSave(data, diff(profile, data));
                    setEdit(false);
                  }}
                >
                  Guardar cambios
                </button>
              </>
            )}
          </div>
          <div className="d-flex gap-3">
            {step === 0 && (
              <button className="btn-w" onClick={tryClose}>
                Cerrar
              </button>
            )}
            {step > 0 && (
              <button className="btn-w" onClick={() => setStep(step - 1)}>
                Anterior
              </button>
            )}
            {step < 2 ? (
              <button className="btn-g" onClick={() => setStep(step + 1)}>
                Siguiente
              </button>
            ) : (
              <button className="btn-g" onClick={tryClose}>
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
      {warn && (
        <div className="overlay top">
          <div className="modal-x sm">
            <div className="mh">
              <h5>Advertencia</h5>
              <button className="ic sq-x" onClick={() => setWarn(false)}>
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <p>
              Los cambios realizados no se guardarán. Desea cerrar el perfil de
              todos modos?
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn-w" onClick={() => setWarn(false)}>
                Cancelar
              </button>
              <button className="btn-g" onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
