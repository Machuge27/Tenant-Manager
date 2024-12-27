import React, { useState } from "react"; 
import { ChevronRight, ChevronLeft, Trash2 } from "lucide-react";
import '../../css/admin/Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Rent Due',
      date: '2024-02-01',
      type: 'payment'
    },
    {
      id: 2,
      title: 'Monthly meeting',
      date: '2024-02-15',
      type: 'meeting'
    },
    {
      id: 3,
      title: 'Maintenance',
      date: '2024-02-15',
      type: 'maintenance'
    },
    {
      id: 3,
      title: 'Maintenance',
      date: '2024-02-15',
      type: 'maintenance'
    },
    {
      id: 3,
      title: 'Maintenance',
      date: '2024-02-15',
      type: 'maintenance'
    },
    {
      id: 3,
      title: 'Maintenance',
      date: '2024-02-15',
      type: 'maintenance'
    },
    {
      id: 3,
      title: 'Maintenance',
      date: '2024-02-15',
      type: 'maintenance'
    },
  ]);

  const generateCalendarDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth() + 1, 
      0
    ).getDate();
    
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth(), 
      1
    ).getDay();

    const calendarDays = [];

    // Add empty days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === fullDate);
      calendarDays.push({
        day,
        events: dayEvents
      });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div>
      <div className="dashboard-header">Calendar Overview</div>

      <div className="events-section">
        <div className="calendar-container" style={{ width: "90%" }}>
          <h2>Upcoming Events</h2>
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                <span className="event-date">{event.date}</span>
                <span className="event-title">{event.title}</span>
                <span className="event-type">{event.type}</span>
                <span></span>
                <span className="trash"><Trash2 /></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="add-event-section">
          <h2>Add New Event</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const date = e.target.date.value;
              const title = e.target.title.value;
              const type = e.target.type.value; // Get the event type
              setEvents([...events, { id: events.length + 1, date, title, type }]);
              e.target.reset();
            }}
          >
            <input type="date" name="date" required className="input-field" />
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              required
              className="input-field"
            />
            <select name="type" required className="input-field">
              <option value="">Select Event Type</option>
              <option value="payment">Payment</option>
              <option value="meeting">Meeting</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <button type="submit" className="action-button">
              Add Event
            </button>
          </form>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <button 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
          >
            <ChevronLeft />
          </button>
          <h2>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
          >
            <ChevronRight />
          </button>
        </div>

        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}

          {calendarDays.map((dayItem, index) => {
            const isToday = dayItem && new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), dayItem.day).toDateString();
            return (
              <div 
                key={index} 
                className={`calendar-day ${dayItem ? 'active' : 'inactive'} ${isToday ? 'today' : ''}`}>
                {dayItem && (
                  <>
                    <span className="day-number">{dayItem.day}</span>
                    {dayItem.events.map(event => (
                      <div 
                        key={event.id} 
                        className={`event ${event.type}`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>      
    </div>
  );
};

export default Calendar;
