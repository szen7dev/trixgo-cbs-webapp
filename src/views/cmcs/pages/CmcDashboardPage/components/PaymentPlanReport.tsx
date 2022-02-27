import { FC } from "react";

import cn from "classnames";

import styles from 'views/cmcs/styles/styles.module.css';

import PolygonIcon from "assets/images/icon-polygon.svg";

const PaymentPlanReport: FC = () => {
  return (
    <div className="bg-primary-light px-6 py-4">
      <div className="flex items-center justify-between">
        <p className="font-bold text-primary-gray text-lg">
          Kế hoạch thanh toán
        </p>

        <button className="flex items-center justify-around w-28 h-8 border border-secondary-gray ml-3 rounded">
          <img src={PolygonIcon} alt="Polygon" />
          <span className="text-sm text-secondary-gray">Năm 2021</span>
        </button>
      </div>

      <div className="grid grid-cols-6 text-center mt-4">
        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">8</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T1
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">6</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T2
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">12</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T3
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">9</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T4
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">10,6</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T5
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">66</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T7
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">21</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T7
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">65</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T8
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">22</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T9
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">15</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T10
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">7</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T11
          </div>
        </div>

        <div className="border border-secondary-gray h-12 flex flex-col justify-between">
          <div className="flex items-center justify-center h-9">
            <p className="text-base text-primary">9</p>
          </div>
          <div
            className={cn(
              "text-primary-gray h-3",
              styles.bgQuarter,
              styles.paymentTextSmall
            )}
          >
            T12
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlanReport;
