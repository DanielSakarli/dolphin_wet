import { defineStore} from "pinia";
import requestBodiesHealth from "@/data/requestBodiesHealth.json";

export const useEvaluationHealthStore = defineStore("evaluationHealthStore" , {
    state: () => {
        return {
            requestBodiesHealth,
        }
    },
    actions: {
        resetBodies(){
            for(let i =0; i < requestBodiesHealth.length; i++){
                requestBodiesHealth[i]["normal_floatability"] = 0;
                requestBodiesHealth[i]["eye_lesions"] = 0;
                requestBodiesHealth[i]["visual_cues"] = 0;
                requestBodiesHealth[i]["mouth_exam"] = 0;
                requestBodiesHealth[i]["respiratory_disease"] = 0;
                requestBodiesHealth[i]["force_expiration"] = 0;
                requestBodiesHealth[i]["external_disease_signs"] = 0;
                requestBodiesHealth[i]["comments"] = null;
            }
        }
    }
})