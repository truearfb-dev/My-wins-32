const [wins, setWins] = useState([]); // Сначала пустой массив

// Загружаем данные только ПОСЛЕ того, как компонент появился в браузере
useEffect(() => {
  const saved = localStorage.getItem('wins');
  if (saved) {
    setWins(JSON.parse(saved));
  }
}, []);
