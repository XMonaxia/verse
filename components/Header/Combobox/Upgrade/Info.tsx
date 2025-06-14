import React from "react";
import {
  ModalTabsSharedData,
  useModalTabs,
} from "@/components/Provider/ModalTabsContext";
import style from "@/style/Combobox/Upgrade/GetPlan.module.css";

interface InfoProps {
  sharedData: ModalTabsSharedData;
}

const Info: React.FC<InfoProps> = ({ sharedData }) => {
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
      <h2>{plan.title}</h2>
      <p>Harga: ${plan.price}</p>
      <p>Akses: {plan.access}</p>
      <p>Fitur: {plan.hakAccess}</p>
      <button onClick={() => goToTab(0)}>Price</button>
      <button onClick={() => goToTab(1)}>Form</button>
    </div>
  );
};

export default Info;
