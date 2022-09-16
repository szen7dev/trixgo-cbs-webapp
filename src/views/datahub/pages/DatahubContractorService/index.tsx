import DatahubRepository from "apis/datahub";
import { buildKeyDatahubPackage } from "apis/datahub/package";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

type Props = {
  //
};

const DatahubContractorService: FC<Props> = (props) => {
  const { id } = useParams<{ id?: string }>();

  const datahubPackages = useQuery(
    buildKeyDatahubPackage({ mode: 3, contractorID: id }),
    () =>
      DatahubRepository.getDatahubPackageList(3, {
        contractorID: id,
      }),
    {
      enabled: Boolean(id),
    }
  );
  return (
    <div className="bg-white w-full py-2 mx-3.5 border-cbs-border border-0.5">
      <div className="flex flex-wrap text-cbs-subtext pt-1 text-medium px-2">
        {datahubPackages.data?.data.map((record, idx) => {
          const { _id, name, description } = record._id.field;
          return (
            <div key={_id} className="w-3/12 px-2 mb-3">
              <div className="flex flex-col h-full rounded-cbs-sm overflow-hidden border-cbs-border border-0.5 ">
                <div className="p-3">
                  <div>
                    <div className="inline-block bg-[#E1ECF4] border border-cbs-border px-4 py-2 rounded-cbs-sm">
                      <h3 className=" line-clamp-1">{name}</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p>{description}</p>
                  </div>
                  <div className="flex mt-4">
                    <div className="flex-1 leading-5">
                      <div className="text-black">{record.amount}</div>
                      <div className="text-cbs-subtext">hợp đồng</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className='text-center mt-6 mb-1'>
				<button className='text-cbs-primary border-cbs-border border w-40 py-2.5 rounded-cbs-sm text-large'>
					Xem thêm
				</button>
			</div> */}
    </div>
  );
};

export default DatahubContractorService;
