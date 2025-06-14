import React from "react";
import {
  ModalTabsSharedData,
  useModalTabs,
} from "@/components/Provider/ModalTabsContext";
import style from "@/style/Combobox/Upgrade/GetPlan.module.css";

interface GetRoleProps {
  sharedData: ModalTabsSharedData;
}

const GetPlan: React.FC<GetRoleProps> = ({ sharedData }) => {
  const { goToTab } = useModalTabs();
  const plan = sharedData.selectedPlan;
  if (!plan)
    return (
      <div className={style.selectfirts}>
        <p className={style.declare}>Ambil Plan Terlebih Dahulu !</p>
        <button className={style.buttonGet} onClick={() => goToTab(0)}>
          Get Plans
        </button>
      </div>
    );

  return (
    <div>
      <h2>Get Role: {plan.title}</h2>
      <p>Price: ${plan.price}</p>
      <p>Access: {plan.access}</p>
      <p>Details: {plan.hakAccess}</p>
    </div>
  );
};

export default GetPlan;
