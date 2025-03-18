import { useState } from "react";
import supabase from "../config/supabaseClient";

interface Meal {
  id: number;
  date: string;
  meal: string;
  calories: number;
  protein: number;
}

interface AddMealProps {
  addMeal: (meal: Meal) => void;
}

const AddMeal = ({ addMeal }: AddMealProps) => {
  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    // page refresh
    e.preventDefault();

    if (!meal || !calories || !protein) {
      setFormError("Please fill out all fields");
      return;
    }

    const { data, error } = await supabase
      .from("meals")
      .insert([
        {
          meal,
          calories,
          protein,
        },
      ])
      .select();

    if (error) {
      console.log(error);
      setFormError(error.message);
    }
    if (data) {
      console.log(data);
      // Call the addMeal function to update the parent component's state
      addMeal(data[0]);
      setFormError(null);
      setMeal("");
      setCalories("");
      setProtein("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow-md max-w-7xl border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <h1 className="bg-blue-50 p-2 rounded-lg font-bold text-center text-gray-800 mb-4">
        Add New Meal
      </h1>

      <div className="space-y-3 mb-4">
        <div className="flex items-center">
          <label htmlFor="meal" className="font-medium text-gray-700 w-24">
            Meal:
          </label>
          <input
            className="flex-1 p-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="meal"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="calories" className="font-medium text-gray-700 w-24">
            Calories:
          </label>
          <input
            className="flex-1 p-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="number"
            id="calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="protein" className="font-medium text-gray-700 w-24">
            Protein:
          </label>
          <input
            className="flex-1 p-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="number"
            id="protein"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
        </div>
      </div>

      {formError && (
        <p className="bg-red-100 p-2 rounded text-red-700 text-sm mb-4">
          {formError}
        </p>
      )}

      <div className="pt-3 border-t border-gray-200">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors font-medium"
        >
          Add Meal
        </button>
      </div>
    </form>
  );
};

export default AddMeal;
