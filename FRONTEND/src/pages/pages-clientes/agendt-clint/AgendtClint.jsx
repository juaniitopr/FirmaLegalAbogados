import React, { useState } from 'react';

const DashboardCliente = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const renderCalendar = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(<div key={i} className="day">{i}</div>);
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div>
      <header className="header">
        <button className="hamburger-button" onClick={() => alert('Toggle Menu')}>
          ☰
        </button>
      </header>

      <main className="main-container">
        {/* <section className="left-panel">
          <div className="cajita">
            <div className="process-section">
              <h2>Procesos del Cliente</h2>
              <div className="process-list">
                {processes.length > 0 ? (
                  processes.map((process, index) => (
                    <div key={index} className="process-item">
                      {process}
                    </div>
                  ))
                ) : (
                  <p>No hay procesos asociados.</p>
                )}
              </div>
            </div>
          </div>
          <div className="missing-files-section">
            <h2>Archivos Faltantes</h2>
            <ul className="missing-files-list">
              {missingFiles.length > 0 ? (
                missingFiles.map((file, index) => <li key={index}>{file}</li>)
              ) : (
                <p>No hay archivos faltantes.</p>
              )}
            </ul>
          </div>
        </section> */}

        <section className="center-panel">
          <div className="calendar-section">
            <h2>Agenda</h2>
            <div className="calendar-container">
              <div className="calendar-header">
                <button className="nav-btn prev-month" onClick={prevMonth}>&lt;</button>
                <div className="month-year">
                  <span id="month">{months[currentDate.getMonth()]}</span>{' '}
                  <span id="year">{currentDate.getFullYear()}</span>
                </div>
                <button className="nav-btn next-month" onClick={nextMonth}>&gt;</button>
              </div>
              <div className="calendar-days">
                <div className="day-name">Lun</div>
                <div className="day-name">Mar</div>
                <div className="day-name">Mié</div>
                <div className="day-name">Jue</div>
                <div className="day-name">Vie</div>
                <div className="day-name">Sáb</div>
                <div className="day-name">Dom</div>
                {renderCalendar()}
              </div>
            </div>
          </div>
        </section>

        
      </main>
    </div>
  );
};

export default DashboardCliente;