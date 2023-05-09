import { useState, useEffect } from 'react';

const RandomMeal = () => {
  const [mealFetch, setMealFetch] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [ingredient, setIngredient] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
      const data = await response.json();
      setMealFetch(data.meals[0]);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  function Ingredients() {
    const ingredients = Array.from({ length: 20 }, (_, i) => ({
      ingredient: mealFetch[`strIngredient${i + 1}`],
      measure: mealFetch[`strMeasure${i + 1}`],
    }))
      .filter(({ ingredient }) => ingredient)
      .map(({ ingredient, measure }) => (
        <li key={ingredient}>
          {ingredient} - {measure}
        </li>
      ));

    return <ul>{ingredients}</ul>;
  }

  // --------------------------------- //
  return (
    <>
      <div className={`text-front-page ${isLoaded === false ? '' : 'move'}`}>
        <h1>Hungry?</h1>
        <p>🎲Let's roll some food🍔</p>
        <p>🍴And get's you on the mood🥢</p>
        <button className="roll-button" onClick={fetchData}>
          Roll
        </button>
      </div>

      {isLoaded ? (
        <div className="meal-info">
          <h2>{mealFetch.strMeal}</h2>
          <div className="instructions scroll">
            <h3>{mealFetch.strInstructions}</h3>
          </div>
          <div className="plate">
            <img className="meal-img" src={mealFetch.strMealThumb} alt={mealFetch.strMeal} />
            <div className="category">
              <p>Category: </p>
              <p>{mealFetch.strCategory}</p>
            </div>
            <div className="area">
              <p>Area: </p>
              <p>{mealFetch.strArea}</p>
            </div>
          </div>
          <div className="ingredients-div scroll">
            <Ingredients />
          </div>
          {mealFetch.strYoutube ? (
            <div>
              <div className="yt-div">
                <iframe
                  title="YT Video"
                  className="yt-inframe"
                  src={`https://www.youtube.com/embed/${mealFetch.strYoutube.slice(-11)}`}></iframe>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default RandomMeal;
