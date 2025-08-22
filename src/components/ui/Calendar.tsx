import * as React from 'react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: string | null; // Alterado para data única
  onDateChange: (date: string) => void; // Alterado para data única
  availableDates?: string[]; // Datas disponíveis no formato YYYY-MM-DD
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, availableDates = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Permite o clique apenas se a data estiver disponível
    if (availableDates.includes(dateString)) {
      onDateChange(dateString);
    }
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toISOString().split('T')[0];
      const isSelected = selectedDate === dateString;
      const isAvailable = availableDates.includes(dateString);

      let dayClass = 'w-10 h-10 flex items-center justify-center rounded-full';
      if (isAvailable) {
        dayClass += ' cursor-pointer';
        if (isSelected) {
          dayClass += ' bg-primary text-white';
        } else {
          dayClass += ' bg-teal-100 text-teal-800 hover:bg-teal-200';
        }
      } else {
        dayClass += ' text-gray-400 cursor-not-allowed';
      }

      days.push(
        <div key={i} 
             className={dayClass}
             onClick={() => isAvailable && handleDateClick(i)}>
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-200"><ChevronLeft /></button>
        <h3 className="text-lg font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <button type="button" onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-200"><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => <div key={day} className="font-semibold text-sm">{day}</div>)}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;