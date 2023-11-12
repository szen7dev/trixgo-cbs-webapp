import React, { FC, useRef } from "react";
import debounce from "lodash/debounce";

// import { useQueryListFriend } from "services/hooks/users/useFriend";

import type { InsertTimeSheetChildPayload } from "typings/time-sheet";

type DetailChildRowCreateFormProps = {
  collapsed?: boolean;
  isLastRow?: boolean;
  onInsert: (values: InsertTimeSheetChildPayload) => Promise<boolean>;
};

export const CreateRow: FC<DetailChildRowCreateFormProps> = ({
  collapsed,
  isLastRow,
  onInsert,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickUpdateTimeSheet = React.useCallback(
    async (value) => {
      const isCreated = await onInsert({
        ...value,
      });
      return isCreated;
    },
    [onInsert]
  );

  return (
    <div
      ref={wrapperRef}
      style={
        collapsed
          ? {
              transform: "scaleY(0)",
              transformOrigin: "top center",
              height: 0,
              visibility: "collapse",
            }
          : {}
      }
      className={
        "transition duration-300 ease-in-out child-row table-row " +
        (collapsed ? "collapsed " : "not-collapsed ") +
        (isLastRow ? "last-child-row" : "")
      }
    >
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 px-2 py-5"}
        >
          {""}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <input
          placeholder="Nhập nội dung..."
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          onBlur={debounce(async (e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value.length === 0) {
              return null;
            }
            const isCreated = await handleClickUpdateTimeSheet({
              name: value,
            });
            if (isCreated) {
              e.target.value = "";
            }
          }, 700)}
        />
      </div>
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 bg-white"
        }
      ></div>
      {/* <div
        className={
          "table-cell relative box-border border border-gray-300 text-end bg-white"
        }
      >
        <p className={"w-full h-full focus:outline-blue-600 p-2"}></p>
      </div> */}
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          // contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white w-1/12"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white w-1/12"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
        />
      </div>
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 bg-white"
        }
      />
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 bg-white"
        }
      />
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 p-2"}
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 p-2"}
        />
      </div>
    </div>
  );
};