import { defineStore} from "pinia";
import requestBodiesFeeding from "@/data/requestBodiesFeeding.json";

export const useEvaluationFeedingStore = defineStore("evaluationFeedingStore" , {
    state: () => {
        return {
            requestBodiesFeeding,
        }
    }
})