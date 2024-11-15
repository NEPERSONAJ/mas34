import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Flower2, User, Check } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';

interface BookingStep {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const steps: BookingStep[] = [
  { id: 1, title: 'Выбор услуги', icon: <Flower2 className="w-6 h-6" /> },
  { id: 2, title: 'Выбор даты', icon: <Calendar className="w-6 h-6" /> },
  { id: 3, title: 'Выбор времени', icon: <Clock className="w-6 h-6" /> },
  { id: 4, title: 'Ваши данные', icon: <User className="w-6 h-6" /> },
];

const services = [
  {
    id: 1,
    name: 'Классический массаж',
    description: 'Традиционный массаж для расслабления и снятия напряжения',
    price: '2500₽',
    duration: '60 минут',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    name: 'Спортивный массаж',
    description: 'Интенсивный массаж для спортсменов и активных людей',
    price: '3000₽',
    duration: '90 минут',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&q=80&w=1000',
  },
];

const timeSlots = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00',
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comments: '',
  });

  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  const handleNext = () => {
    if (currentStep === 4) {
      // Handle form submission
      console.log('Booking submitted:', {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        ...formData,
      });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step.id === currentStep
                        ? 'bg-primary-500 dark:bg-primary-600 text-white'
                        : step.id < currentStep
                        ? 'bg-green-500 text-white'
                        : 'dark:bg-white/10 bg-white border dark:border-white/10 border-gray-200 dark:text-gray-400 text-gray-500'
                    }`}
                  >
                    {step.id < currentStep ? <Check className="w-6 h-6" /> : step.icon}
                  </motion.div>
                  <span className="mt-2 text-sm font-medium dark:text-gray-400 text-gray-600">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 dark:bg-white/10 bg-gray-200 mx-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Service Selection */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedService === service.id
                      ? 'ring-2 ring-primary-500 dark:ring-primary-400'
                      : 'hover:ring-2 hover:ring-primary-500/50 dark:hover:ring-primary-400/50'
                  }`}
                >
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                  </div>
                  <div
                    className="relative p-6 text-white"
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                      <span className="text-primary-300 font-bold">{service.price}</span>
                    </div>
                    <p className="text-gray-200 mb-4">{service.description}</p>
                    <div className="flex items-center text-sm text-primary-200">
                      <Clock className="w-4 h-4 mr-2" />
                      {service.duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Date Selection */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {getAvailableDates().map((date) => (
                <motion.button
                  key={date.toISOString()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-lg text-center transition-all ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? 'bg-primary-500 dark:bg-primary-600 text-white'
                      : 'dark:bg-white/5 bg-white hover:bg-primary-50 dark:hover:bg-primary-900/20 border dark:border-white/10 border-gray-200'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-sm font-medium">
                    {format(date, 'EEEEEE', { locale: ru })}
                  </div>
                  <div className="text-lg font-bold">
                    {format(date, 'd', { locale: ru })}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Time Selection */}
          {currentStep === 3 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-lg text-center transition-all ${
                    selectedTime === time
                      ? 'bg-primary-500 dark:bg-primary-600 text-white'
                      : 'dark:bg-white/5 bg-white hover:bg-primary-50 dark:hover:bg-primary-900/20 border dark:border-white/10 border-gray-200'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          )}

          {/* Form */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-lg dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 focus:border-primary-500 dark:focus:border-primary-400 dark:text-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-lg dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 focus:border-primary-500 dark:focus:border-primary-400 dark:text-white text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-lg dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 focus:border-primary-500 dark:focus:border-primary-400 dark:text-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Комментарии
                </label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full p-3 rounded-lg dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 focus:border-primary-500 dark:focus:border-primary-400 dark:text-white text-gray-900"
                  rows={4}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-lg dark:bg-white/10 bg-white border dark:border-white/10 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-white/20 hover:bg-primary-50 transition-colors dark:text-white text-gray-900"
          >
            Назад
          </button>
          <button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !selectedService) ||
              (currentStep === 2 && !selectedDate) ||
              (currentStep === 3 && !selectedTime) ||
              (currentStep === 4 && (!formData.name || !formData.phone))
            }
            className="px-6 py-3 rounded-lg bg-primary-500 dark:bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
          >
            {currentStep === 4 ? 'Подтвердить запись' : 'Далее'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;