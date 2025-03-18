import React from "react";
import MealCard from "./MealCard";

interface Meal {
  id: number;
  date: string;
  meal: string;
  calories: number;
  protein: number;
}

interface MealCardDailyProps {
  date: string;
  meals: Meal[];
  onDelete: (id: number) => void;
}

const MealCardDaily: React.FC<MealCardDailyProps> = ({
  date,
  meals,
  onDelete,
}) => {
  // Calculate total calories and protein for the day
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);

  // Format the date to be more readable, ensuring correct day
  const formattedDate = (() => {
    // Create a date object with timezone handling
    const [year, month, day] = date.split("-").map(Number);
    // Month is 0-indexed in JavaScript Date
    const dateObj = new Date(year, month - 1, day);

    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  })();

  return (
    <div className="mb-8 border-b pb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{formattedDate}</h2>
        <div className="flex gap-4">
          <div className="bg-orange-100 px-3 py-1 rounded text-orange-700">
            <span className="font-medium">Total Calories:</span> {totalCalories}
          </div>
          <div className="bg-green-100 px-3 py-1 rounded text-green-700">
            <span className="font-medium">Total Protein:</span> {totalProtein}g
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default MealCardDaily;
