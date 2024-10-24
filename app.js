const search = document.querySelector('#search');

const checkWeather = async (city) => {
  const apiKey = 'GRWV5BVFJUM9U9WEEZ5W5DKKM';
  const apiUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  const descPara = document.querySelector('#description');
  const tempPara = document.querySelector('#temp');

  try {
    const res = await fetch(`${apiUrl}${city}?key=${apiKey}`);

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }

    const data = await res.json();

    descPara.textContent = data.description;
    const celsius = ((data.currentConditions.temp - 32) * 5) / 9;
    tempPara.textContent = `${Math.round(celsius)}°C`;

    const currentConditon = data.currentConditions;

    console.log(data);
    console.log(currentConditon);
  } catch (error) {
    console.log(error);
  }
};

const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const handleInputChange = debounce((e) => {
  checkWeather(e.target.value);
});

search.addEventListener('input', handleInputChange);
