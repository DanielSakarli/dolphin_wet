import { defineStore} from "pinia";
import requestBodiesFeeding from "@/data/requestBodiesFeeding.json";

export const useEvaluationFeedingStore = defineStore("evaluationFeedingStore" , {
    state: () => {
        return {
            requestBodiesFeeding,
        }
    },
    actions: {
        resetBodies(){
            for(let i = 0; i < requestBodiesFeeding.length; i++){
                requestBodiesFeeding[i]["body_condition_score"] = null;
                requestBodiesFeeding[i]["blood_hydration"] = null;
                requestBodiesFeeding[i]["weight_measured"] = null;
                requestBodiesFeeding[i]["kcal_calculations"] = null;
                requestBodiesFeeding[i]["fish_quality"] = null;
                requestBodiesFeeding[i]["fish_variety"] = null;
            }
        }
    }
})