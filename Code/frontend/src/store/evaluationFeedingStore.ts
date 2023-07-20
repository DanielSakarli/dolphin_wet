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
            for(let i =0; i < requestBodiesFeeding.length; i++){
                requestBodiesFeeding[i]["body_condition_score"] = 0;
                requestBodiesFeeding[i]["blood_hydration"] = 0;
                requestBodiesFeeding[i]["weight_measured"] = 0;
                requestBodiesFeeding[i]["kcal_calculations"] = 0;
                requestBodiesFeeding[i]["fish_quality"] = 0;
                requestBodiesFeeding[i]["fish_variety"] = 0;
            }
        }
    }
})