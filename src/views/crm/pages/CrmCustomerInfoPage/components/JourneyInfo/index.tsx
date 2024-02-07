import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import { useFnbCustomerCare, useCustomerJourneyByProperty } from "services/hooks/fnb/useFnbCustomerCare";

type Props = {
  info: Human
};

const BACKGROUND = [
	{ value: 1, color: "bg-red-400", color2: "F11F20" },
	{ value: 2, color: "bg-yellow-300", color2: "fa6b07" },
	{ value: 3, color: "bg-green-400", color2: "C55B11" },
	{ value: 4, color: "bg-blue-400", color2: "00AF50" },
	{ value: 5, color: "bg-purple-400", color2: "169150" },
	{ value: 6, color: "bg-pink-600", color2: "1F4E78" },
	{ value: 7, color: "bg-gray-600", color2: "262626" },
	{ value: 8, color: "bg-teal-400", color2: "262626" },
	{ value: 9, color: "bg-teal-400", color2: "262626" },
	{ value: 10, color: "bg-teal-400", color2: "262626" },
	{ value: 11, color: "bg-teal-400", color2: "262626" },
	{ value: 12, color: "bg-teal-400", color2: "262626" },
	{ value: 13, color: "bg-teal-400", color2: "262626" },
	{ value: 14, color: "bg-teal-400", color2: "262626" },
	{ value: 15, color: "bg-teal-400", color2: "262626" },
]

export const JourneyInfo: FC<Props> = memo((props) => {
  const { t: i18n } = useTranslation(["human"]);

  const { info } = props;
  // console.log(info)

  const { listCustomerJourneyByProperty, refetchListCustomerJourneyByProperty } = useCustomerJourneyByProperty({
    params: {
        option: 5,
        customerID: info._id
        // fromDate: inputFilter.fromDate,
        // toDate: inputFilter.toDate,
    },
    isFetchList: true
})
// console.log(listCustomerJourneyByProperty)

  return (
    <div className="px-4">
      {/* Hành trình trải nghiệm */}
      <p className="text-bold text-primary-gray text-lg mb-2 mt-5">Hành trình trải nghiệm</p>
      <div className="flex flex-wrap mb-1">
          { 
              listCustomerJourneyByProperty?.map((item: any, index: any) => {
                  const color = `cursor-pointer max-w-sm rounded overflow-hidden shadow-lg mb-2 mr-1`
                  const color2 = `#${BACKGROUND[index].color2}`

                  return (
                      <div key={index} className={color} style={{background: color2}}>
                          {/* <img className="w-full" src="/path/to/your/image" alt="Step 1"/> */}
                          <div className="px-2 py-1">
                              <div className="font-bold text-sm mb-1 text-white">{item._id.journey.name} ({item.quantity})</div>
                              <p className="text-white text-x-small">
                              {item._id.journey?.description}
                              </p>
                          </div>
                      </div>
                  ) 
              })
          }
      </div>

      <div className="text-[13px]">

      </div>

    </div>
  );
});

JourneyInfo.displayName = "JourneyInfo"