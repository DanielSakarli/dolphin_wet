import { defineStore} from "pinia";
import requestBodiesBehaviour from "@/data/requestBodiesBehaviour.json";

export const useEvaluationBehaviourStore = defineStore("evaluationBehaviourStore" , {
    state: () => {
        return {
            requestBodiesBehaviour,
        }
    },
    actions: {
        resetBodies(){
            for(let i =0; i < requestBodiesBehaviour.length; i++){
                requestBodiesBehaviour[i]["environmental_enrichment"] = 0;
                requestBodiesBehaviour[i]["affiliative_behaviour"] = 0;
                requestBodiesBehaviour[i]["play_behaviour"] = 0;
                requestBodiesBehaviour[i]["socio_sexual_behaviour"] = 0;
                requestBodiesBehaviour[i]["maternal_behaviour"] = 0;
                requestBodiesBehaviour[i]["displacement_behaviour"] = 0;
                requestBodiesBehaviour[i]["oral_stereotypic_behaviour"] = 0;
                requestBodiesBehaviour[i]["repetitive_body_movement"] = 0;
                requestBodiesBehaviour[i]["self_grooming_behaviour"] = 0;
                requestBodiesBehaviour[i]["regurgitation_reingestion"] = 0;
                requestBodiesBehaviour[i]["rake_marks"] = 0;
                requestBodiesBehaviour[i]["displaying_aggressive_behaviour"] = 0;
                requestBodiesBehaviour[i]["receiving_aggressive_behaviour"] = 0;
                requestBodiesBehaviour[i]["social_isolation"] = 0;
                requestBodiesBehaviour[i]["avoidance_pool_areas"] = 0;
                requestBodiesBehaviour[i]["comments"] = null;
            }
        }
    }
})