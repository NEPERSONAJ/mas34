import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Clock } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Sparkles className="w-16 h-16 text-amber-500" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600"
          >
            Откройте истинное расслабление
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Испытайте идеальное сочетание традиционных техник и современного комфорта
            в нашем оазисе спокойствия.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12"
          >
            <button
              onClick={() => navigate('/booking')}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-full overflow-hidden shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Записаться на сеанс
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Опытные мастера',
              description: 'Профессионалы с многолетним опытом работы',
            },
            {
              title: 'Роскошная атмосфера',
              description: 'Спокойная обстановка для полного расслабления',
            },
            {
              title: 'Индивидуальный подход',
              description: 'Процедуры, адаптированные под ваши потребности',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.2, duration: 0.8 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-amber-500/50 transition-colors"
            >
              <h3 className="text-xl font-semibold text-amber-500 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
            <MapPin className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Адрес</h3>
            <p className="text-gray-400">г. Хасавюрт, ул. Гагарина, 61</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
            <Phone className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Телефон</h3>
            <a href="tel:+79882018877" className="text-gray-400 hover:text-amber-500">
              +7 988-201-88-77
            </a>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
            <Clock className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Режим работы</h3>
            <p className="text-gray-400">Ежедневно: 10:00 - 20:00</p>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Как нас найти</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=46.587512%2C43.250224&mode=search&oid=225694162910&ol=biz&z=17"
              width="100%"
              height="400"
              frameBorder="0"
              className="w-full"
            ></iframe>
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://yandex.ru/maps/-/CDaWjXA8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Построить маршрут
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;