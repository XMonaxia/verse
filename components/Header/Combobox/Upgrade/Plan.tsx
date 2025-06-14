"use client";
import React, { useState, useEffect } from "react";
import styles from "@/style/Combobox/Upgrade/Upgrade.module.css";
import { useModalTabs } from "@/components/Provider/ModalTabsContext";
import { getPlans, PlanTypes } from "@/utils/Plan";

interface UpgradeProps {
  updateSharedData: (
    updater: (prev: { selectedPlan?: PlanTypes }) => {
      selectedPlan?: PlanTypes;
    }
  ) => void;
}
const Plan: React.FC<UpgradeProps> = ({ updateSharedData }) => {
  const { goToTab } = useModalTabs();
  const [plans, setPlans] = useState<PlanTypes[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(3);

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getPlans();
      setPlans(data);
    };
    fetchPlans();
  }, []);
  const handleSelect = (plan: PlanTypes, plans: number, targetTab: number) => {
    setActiveIndex(plans);
    updateSharedData((prev) => ({
      ...prev,
      selectedPlan: plan,
    }));
    goToTab(targetTab);
  };

  return (
    <div className={styles.container}>
      {plans.map((plan, plans) => (
        <div
          key={plan._id}
          className={`${styles.card} ${
            activeIndex === plans ? styles.active : ""
          }`}
        >
          <div className={styles.info}>
            <h3 className={styles.title}>
              {plan.title}
              {plans === 3 && <span className={styles.recommended}>⭐</span>}
            </h3>
            <p className={styles.price}>${plan.price}</p>
            <p className={styles.access}>{plan.access}</p>
            <p className={styles.detail}>{plan.hakAccess}</p>
          </div>
          <div>
            <button
              className={styles.buttonPlans}
              onClick={() => handleSelect(plan, plans, 1)}
            >
              BUY NOW
            </button>
            <button
              className={styles.buttonPlans}
              onClick={() => handleSelect(plan, plans, 2)}
            >
              INFO
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plan;
