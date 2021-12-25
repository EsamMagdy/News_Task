import { StepCard } from "./step-card.model";

export interface HttpRequestSignature {
  controller?: string;
  action?: string;
  stepDetails?: StepCard;
}
