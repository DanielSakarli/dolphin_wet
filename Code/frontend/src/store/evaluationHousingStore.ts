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
            for(let i = 0; i < requestBodiesHousing.length; i++){
                requestBodiesHousing[i]["enclosure_barrier_safety"] = null;
                requestBodiesHousing[i]["foreign_body_ingestion"] = null;
                requestBodiesHousing[i]["pool_design"] = null;
                requestBodiesHousing[i]["forced_loneliness"] = null;
                requestBodiesHousing[i]["water_quality"] = null;
                requestBodiesHousing[i]["sufficient_shade"] = null;
                requestBodiesHousing[i]["acoustic_comfort"] = null;
                requestBodiesHousing[i]["comments"] = null;
            }
        }
    }
})