import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

import MealCardDaily from "../components/MealCardDaily";
import AddMeal from "../components/AddMeal";

interface Meal {
  id: number;
  date: string;
  meal: string;
  calories: number;
  protein: number;
}

interface MealsByDate {
  [date: string]: Meal[];
}

const Home = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [meals, setMeals] = useState<Meal[] | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const { data, error } = await supabase
        .from("meals")
        .select()
        .order("date", { ascending: false });

      if (error) {
        setFetchError(error.message);
        setMeals(null);
      }
      if (data) {
        console.log(data);
        setMeals(data);
        setFetchError(null);
      }
    };
    fetchMeals();
  }, []);

  // Function to add a new meal to the meals state
  const addMeal = (newMeal: Meal) => {
    setMeals((prevMeals) => (prevMeals ? [...prevMeals, newMeal] : [newMeal]));
  };

  const handleDelete = (id: number) => {
    // Only update the UI after successful deletion in MealCard
    setMeals((prev) => {
      return prev ? prev.filter((meal) => meal.id !== id) : null;
    });
  };

  // Group meals by date with proper date normalization
  const groupMealsByDate = (meals: Meal[]): MealsByDate => {
    return meals.reduce((acc: MealsByDate, meal) => {
      // Normalize the date to avoid timezone issues
      const normalizedDate = normalizeDate(meal.date);
      if (!acc[normalizedDate]) {
        acc[normalizedDate] = [];
      }
      acc[normalizedDate].push(meal);
      return acc;
    }, {});
  };

  // Function to normalize dates to avoid timezone issues
  const normalizeDate = (dateString: string): string => {
    // Parse the date in the local timezone
    const [year, month, day] = dateString.split("-").map(Number);

    // Create a date object using UTC to avoid timezone shifts
    // Format it back to YYYY-MM-DD format
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toISOString().split("T")[0];
  };

  // Handle sorting with the normalized dates
  const sortDates = (dateA: string, dateB: string): number => {
    const dateObjA = new Date(dateA);
    const dateObjB = new Date(dateB);
    return dateObjB.getTime() - dateObjA.getTime();
  };

  return (
    <div className="mx-auto my-8 max-w-7xl px-4">
      <AddMeal addMeal={addMeal} />
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {meals && meals.length > 0 ? (
        <div className="mt-8">
          {Object.entries(groupMealsByDate(meals))
            .sort(([dateA], [dateB]) => sortDates(dateA, dateB))
            .map(([date, dateMeals]) => (
              <MealCardDaily
                key={date}
                date={date}
                meals={dateMeals}
                onDelete={handleDelete}
              />
            ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-gray-500">No meals recorded yet.</p>
      )}
    </div>
  );
};

export default Home;
