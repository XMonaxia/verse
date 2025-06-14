import { PlanTypes } from "@/utils/Plan";
import { createContext, useContext } from "react";

export interface ModalTabsSharedData {
  selectedPlan?: PlanTypes;
}
interface ModalTabsContextProps {
  goToTab: (index: number) => void;
  sharedData: ModalTabsSharedData;
  setSharedData: (data: ModalTabsSharedData) => void;
}
const dummyContext: ModalTabsContextProps = {
  goToTab: () => {},
  sharedData: {},
  setSharedData: () => {},
};
export const ModalTabsContext =
  createContext<ModalTabsContextProps>(dummyContext);
export const useModalTabs = () => useContext(ModalTabsContext);
