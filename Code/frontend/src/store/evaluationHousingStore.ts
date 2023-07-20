import { defineStore} from "pinia";
import requestBodiesHousing from "@/data/requestBodiesHousing.json";

export const useEvaluationHousingStore = defineStore("evaluationHousingStore" , {
    state: () => {
        return {
            requestBodiesHousing,
        }
    },
    actions: {
        resetBodies(){
            for(let i =0; i < requestBodiesHousing.length; i++){
                requestBodiesHousing[i]["enclosure_barrier_safety"] = 0;
                requestBodiesHousing[i]["foreign_body_ingestion"] = 0;
                requestBodiesHousing[i]["pool_design"] = 0;
                requestBodiesHousing[i]["forced_loneliness"] = 0;
                requestBodiesHousing[i]["water_quality"] = 0;
                requestBodiesHousing[i]["sufficient_shade"] = 0;
                requestBodiesHousing[i]["acoustic_comfort"] = 0;
                requestBodiesHousing[i]["comments"] = null;
            }
        }
    }
})