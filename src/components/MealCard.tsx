import { useState } from "react";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";

interface Meal {
  id: number;
  date: string;
  meal: string;
  calories: number;
  protein: number;
}

interface MealCardProps {
  meal: Meal;
  onDelete: (id: number) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onDelete }) => {
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    const { error } = await supabase.from("meals").delete().eq("id", meal.id);

    if (error) {
      setDeleteError(error.message);
      console.error("Error deleting meal:", error);
    } else {
      onDelete(meal.id);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <h1 className="bg-blue-50 p-2 rounded-lg font-bold text-center text-gray-800 mb-3">
        {meal.meal}
      </h1>
      <div className="space-y-2 mb-4">
        <p className="flex items-center text-gray-700">
          <span className="font-medium mr-2">Calories:</span>
          <span className="bg-orange-100 px-2 py-1 rounded text-orange-700">
            {meal.calories}
          </span>
        </p>
        <p className="flex items-center text-gray-700">
          <span className="font-medium mr-2">Protein:</span>
          <span className="bg-green-100 px-2 py-1 rounded text-green-700">
            {meal.protein + "g"}
          </span>
        </p>
      </div>
      <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-1 transition-colors"
          to={`/${meal.id}`}
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center space-x-1 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span>Delete</span>
        </button>
      </div>
      {deleteError && (
        <p className="text-red-500 text-sm mt-1">{deleteError}</p>
      )}
    </div>
  );
};

export default MealCard;
