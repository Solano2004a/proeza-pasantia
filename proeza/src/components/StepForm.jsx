import { STEPS } from "../data";

export default function StepForm({ step, data, set, disabled }) {
  const S = STEPS[step],
    L = S.list;
  const upd = (i, k, v) =>
    set(
      L.key,
      data[L.key].map((r, j) => (j === i ? { ...r, [k]: v } : r)),
    );
  const add = () =>
    set(L.key, [
      ...data[L.key],
      Object.fromEntries(L.cols.map((c) => [c[0], ""])),
    ]);

  return (
    <>
      <div className="row g-3">
        {S.fields.map(([k, l, req, t, x]) => (
          <div className="col-md-6" key={k}>
            <label className="lbl">
              {l}
              {req > 0 && <b className="text-danger"> *</b>}
            </label>
            {t === "select" ? (
              <select
                className="form-select"
                disabled={disabled}
                required={req === 1}
                value={data[k]}
                onChange={(e) => set(k, e.target.value)}
              >
                <option value="">{x[0]}</option>
                {x.slice(1).map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                className="form-control"
                type={t}
                placeholder={x}
                disabled={disabled}
                required={req === 1}
                value={data[k]}
                onChange={(e) => set(k, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      {L && (
        <div className="box mt-4">
          <div className="box-t">{L.title}</div>
          <small className="muted">{L.hint}</small>
          {data[L.key].map((r, i) => (
            <div className="row g-3 mt-0" key={i}>
              {L.cols.map(([k, l, t, ph]) => (
                <div
                  className={L.cols.length === 3 ? "col-md-4" : "col-md-6"}
                  key={k}
                >
                  <label className="lbl">{l}</label>
                  <input
                    className="form-control"
                    type={t}
                    placeholder={ph}
                    disabled={disabled}
                    value={r[k]}
                    onChange={(e) => upd(i, k, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="add"
            disabled={disabled}
            onClick={add}
          >
            <i className="bi bi-plus-lg" /> {L.add}
          </button>
        </div>
      )}
    </>
  );
}
