import { useEffect, useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import supabase from "../config/supabaseClient";
import MealCard from "../components/MealCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Meal {
  id: number;
  date: string;
  meal: string;
  calories: number;
  protein: number;
}

const DailyLog = () => {
  // Initialize with today's date
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format date as YYYY-MM-DD for database queries
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  // Calculate total calories and protein for the day
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);

  // Navigation functions
  const goToPreviousDay = () => setSelectedDate(subDays(selectedDate, 1));
  const goToNextDay = () => setSelectedDate(addDays(selectedDate, 1));

  // Fetch meals for the selected date
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("meals")
          .select()
          .eq("date", formattedDate);

        if (error) {
          throw error;
        }

        setMeals(data || []);
      } catch (err) {
        setError("Failed to fetch meals");
        console.error("Error fetching meals:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [formattedDate]);

  // Handle meal deletion
  const handleDelete = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  return (
    <div className="container mx-auto my-8 max-w-6xl px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Daily Meal Log
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              onClick={goToPreviousDay}
              variant="outline"
              size="icon"
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              onClick={goToNextDay}
              variant="outline"
              size="icon"
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="bg-orange-100 px-3 py-2 rounded-md text-orange-700">
              <span className="font-medium">Total Calories:</span>{" "}
              {totalCalories}
            </div>
            <div className="bg-green-100 px-3 py-2 rounded-md text-green-700">
              <span className="font-medium">Total Protein:</span> {totalProtein}
              g
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>
      ) : meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No meals recorded for this day.</p>
          <p className="text-gray-400">Navigate to Home to add a new meal.</p>
        </div>
      )}
    </div>
  );
};

export default DailyLog;
