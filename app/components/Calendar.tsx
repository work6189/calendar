import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import EventModal from './EventModal';
import { Event } from '../types/event';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event: Event) => {
    if (selectedEvent) {
      setEvents(events.map(e => e.id === selectedEvent.id ? event : e));
    } else {
      setEvents([...events, { ...event, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="text-center mb-4 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">
          {format(currentDate, 'yyyy년 MM월', { locale: ko })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} className="text-center font-bold p-2">
            {day}
          </div>
        ))}
        {days.map((day: Date) => (
          <div
            key={day.toString()}
            className={`min-h-[100px] p-2 border ${
              isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-100'
            } cursor-pointer`}
            onClick={() => handleDateClick(day)}
          >
            <div className={`text-sm ${
              !isSameMonth(day, currentDate) ? 'text-gray-400' : ''
            }`}>
              {format(day, 'd')}
            </div>
            {events
              .filter(event => isSameDay(new Date(event.date), day))
              .map(event => (
                <div
                  key={event.id}
                  className="text-sm bg-blue-100 p-1 mt-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                >
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
        event={selectedEvent}
      />
    </div>
  );
} 