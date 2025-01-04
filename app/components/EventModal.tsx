import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { Event } from '../types/event';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  selectedDate: Date | null;
  event: Event | null;
}

export default function EventModal({ isOpen, onClose, onSave, selectedDate, event }: EventModalProps) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setTime(format(new Date(event.date), 'HH:mm'));
    } else {
      setTitle('');
      setTime('12:00');
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const [hours, minutes] = time.split(':');
    const eventDate = new Date(selectedDate);
    eventDate.setHours(parseInt(hours), parseInt(minutes));

    onSave({
      id: event?.id || Date.now().toString(),
      title,
      date: eventDate.toISOString(),
    });

    setTitle('');
    setTime('12:00');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-xl font-bold mb-4">
        {event ? '일정 수정' : '새 일정 추가'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  );
} 