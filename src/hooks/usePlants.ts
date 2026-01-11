import { useCallback, useEffect, useState } from "react";

import { loadPlants, savePlants } from "../storage/plants";
import { Plant, PlantCategory } from "../types";
import { createPlant, markTaskCompleted } from "../utils/plant";

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>(() => loadPlants());

  useEffect(() => {
    savePlants(plants);
  }, [plants]);

  const addPlant = useCallback(
    (name: string, category: PlantCategory, room?: string) => {
      const next = createPlant({ name, category, room });
      setPlants((current) => [next, ...current]);
    },
    []
  );

  const completeTask = useCallback(
    (plantId: string, taskType: Plant["schedules"][number]["type"]) => {
      setPlants((current) =>
        current.map((plant) =>
          plant.id === plantId ? markTaskCompleted(plant, taskType) : plant
        )
      );
    },
    []
  );

  return { plants, addPlant, completeTask };
}
