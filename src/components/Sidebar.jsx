import { useState } from "react";
function Icon({ name, size = 20 }) {
  const paths = {
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    userPlus: (
      <>
        <path d="M15 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8" cy="7" r="4" />
        <path d="M19 8v6M16 11h6" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5h8v2M3 12h18" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.62a2 2 0 0 1-.45 2.11L8.03 9.73a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92Z" />
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    close: <path d="M18 6 6 18M6 6l12 12" />,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export default function Sidebar({
  section,
  setSection,
  collapsed,
  setCollapsed,
  admin,
  showAdmin,
  onLogout,
}) {
  const [menu, setMenu] = useState(false);
  const items = [
    { view: "calendar", label: "Calendario", icon: "calendar" },
    { view: "profiles", label: "Perfiles", icon: "users" },
    { view: "create", label: "Crear perfil", icon: "userPlus" },
  ];
  const name = admin?.nombre || "Andrea Guzmán";
  const ini = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className={`side ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <span className="logo">P</span>
        <div className="txt">
          <b>PROEZA</b>
          <small>Gestión de personal</small>
        </div>
      </div>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        <i className={`bi bi-chevron-${collapsed ? "right" : "left"}`} />
      </button>
      <small className="grp txt">GESTIÓN</small>
      <nav>
        {items.map((item) => (
          <button
            key={item.view}
            className={section === item.view ? "active" : ""}
            onClick={() => setSection(item.view)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="user">
        <span className="av">{ini}</span>
        <div className="txt">
          <b>{name}</b>
          <small>Talento Humano</small>
        </div>
        <button className="dots txt" onClick={() => setMenu(!menu)}>
          <i className="bi bi-three-dots" />
        </button>
        {menu && (
          <>
            <div className="backdrop" onClick={() => setMenu(false)} />
            <div className="menu-dark">
              <button
                onClick={() => {
                  setMenu(false);
                  showAdmin();
                }}
              >
                Ver perfil
              </button>
              <button onClick={onLogout}>Cerrar sesión</button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
