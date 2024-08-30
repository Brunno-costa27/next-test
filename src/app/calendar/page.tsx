import React from 'react';
import Calendar from '../../components/Calendar';

const App: React.FC = () => {
  // Dados simulados para adicionar dentro das células
  const reservations = [
    // Janeiro
    { name: 'Ana', checkin: '2024-01-02', checkout: '2024-01-05' },
    { name: 'bel', checkin: '2024-01-02', checkout: '2024-01-03' },
    { name: 'João', checkin: '2024-01-08', checkout: '2024-01-10' },
    { name: 'Didi', checkin: '2024-01-09', checkout: '2024-01-10' },
    { name: 'Junior', checkin: '2024-01-18', checkout: '2024-01-19' },
    { name: 'Lucas', checkin: '2024-01-22', checkout: '2024-01-25' },
    { name: 'Dida', checkin: '2024-01-22', checkout: '2024-01-24' },
  
    // Fevereiro
    { name: 'Bruna', checkin: '2024-02-02', checkout: '2024-02-05' },
    { name: 'Felipe', checkin: '2024-02-07', checkout: '2024-02-10' },
    { name: 'Rafael', checkin: '2024-02-12', checkout: '2024-02-15' },
    { name: 'Julia', checkin: '2024-02-17', checkout: '2024-02-20' },
    { name: 'Gustavo', checkin: '2024-02-27', checkout: '2024-02-29' },
  
    // Março
    { name: 'Isabela', checkin: '2024-03-03', checkout: '2024-03-06' },
    { name: 'Rodrigo', checkin: '2024-03-09', checkout: '2024-03-11' },
    { name: 'Paula', checkin: '2024-03-13', checkout: '2024-03-16' },
    { name: 'Thiago', checkin: '2024-03-18', checkout: '2024-03-21' },
    { name: 'Sofia', checkin: '2024-03-23', checkout: '2024-03-26' },
    { name: 'Eduardo', checkin: '2024-03-28', checkout: '2024-03-31' },
  
    // Abril
    { name: 'Lucia', checkin: '2024-04-02', checkout: '2024-04-05' },
    { name: 'Victor', checkin: '2024-04-07', checkout: '2024-04-10' },
    { name: 'Beatriz', checkin: '2024-04-12', checkout: '2024-04-15' },
    { name: 'Henrique', checkin: '2024-04-17', checkout: '2024-04-20' },
    { name: 'Aline', checkin: '2024-04-22', checkout: '2024-04-25' },
    { name: 'Marcos', checkin: '2024-04-27', checkout: '2024-04-30' },
  
    // Maio
    { name: 'Camila', checkin: '2024-05-02', checkout: '2024-05-05' },
    { name: 'Vitor', checkin: '2024-05-07', checkout: '2024-05-10' },
    { name: 'Leticia', checkin: '2024-05-12', checkout: '2024-05-15' },
    { name: 'Daniel', checkin: '2024-05-17', checkout: '2024-05-20' },
    { name: 'Helena', checkin: '2024-05-22', checkout: '2024-05-25' },
    { name: 'Guilherme', checkin: '2024-05-27', checkout: '2024-05-30' },
  
    // Junho
    { name: 'Maria', checkin: '2024-06-12', checkout: '2024-06-15' },
    { name: 'Carlos', checkin: '2024-06-17', checkout: '2024-06-20' },
    { name: 'Lucas', checkin: '2024-06-22', checkout: '2024-06-25' },
    { name: 'Fernanda', checkin: '2024-06-27', checkout: '2024-06-30' },
  
    // Julho
    { name: 'Felipe', checkin: '2024-07-07', checkout: '2024-07-10' },
    { name: 'Rafael', checkin: '2024-07-12', checkout: '2024-07-15' },
    { name: 'Julia', checkin: '2024-07-17', checkout: '2024-07-20' },
    { name: 'Mariana', checkin: '2024-07-22', checkout: '2024-07-25' },
    { name: 'Gustavo', checkin: '2024-07-27', checkout: '2024-07-30' },
  
    // Agosto
    { name: 'Isabela', checkin: '2024-08-02', checkout: '2024-08-04' },
    { name: 'Rodrigo', checkin: '2024-08-05', checkout: '2024-08-08' },
    { name: 'Paula', checkin: '2024-08-12', checkout: '2024-08-15' },
    { name: 'Thiago', checkin: '2024-08-17', checkout: '2024-08-20' },
    { name: 'Sofia', checkin: '2024-08-22', checkout: '2024-08-25' },
    { name: 'Eduardo', checkin: '2024-08-27', checkout: '2024-08-30' },
  
    // Setembro
    { name: 'Lucia', checkin: '2024-09-02', checkout: '2024-09-05' },
    { name: 'Lucinha', checkin: '2024-09-03', checkout: '2024-09-05' },
    { name: 'Victor', checkin: '2024-09-07', checkout: '2024-09-10' },
    { name: 'Beatriz', checkin: '2024-09-12', checkout: '2024-09-15' },
    { name: 'Henrique', checkin: '2024-09-17', checkout: '2024-09-20' },
    { name: 'Aline', checkin: '2024-09-22', checkout: '2024-09-25' },
    { name: 'Marcos', checkin: '2024-09-27', checkout: '2024-09-30' },
  
    // Outubro
    { name: 'Camila', checkin: '2024-10-02', checkout: '2024-10-05' },
    { name: 'Vitor', checkin: '2024-10-07', checkout: '2024-10-10' },
    { name: 'Leticia', checkin: '2024-10-12', checkout: '2024-10-15' },
    { name: 'Daniel', checkin: '2024-10-17', checkout: '2024-10-20' },
    { name: 'Helena', checkin: '2024-10-22', checkout: '2024-10-25' },
    { name: 'Guilherme', checkin: '2024-10-27', checkout: '2024-10-30' },
  
    // Novembro
    { name: 'Carlos', checkin: '2024-11-17', checkout: '2024-11-20' },
    { name: 'Lucas', checkin: '2024-11-22', checkout: '2024-11-25' },
  
    // Dezembro
    { name: 'Bruna', checkin: '2024-12-02', checkout: '2024-12-05' },
    { name: 'Felipe', checkin: '2024-12-07', checkout: '2024-12-10' },
    { name: 'Rafael', checkin: '2024-12-12', checkout: '2024-12-15' },
    { name: 'Rafael leão', checkin: '2024-12-13', checkout: '2024-12-15' },
    { name: 'Julia', checkin: '2024-12-17', checkout: '2024-12-20' },
    { name: 'Gustavo', checkin: '2024-12-27', checkout: '2024-12-30' },
  ];
  
  return (
    <div className='w-full h-full bg-[FFFFFF]'>
      <Calendar reservations={reservations} />
    </div>
  );
};

export default App;
