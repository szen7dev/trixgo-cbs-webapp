import { FC } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import SearchIcon from "assets/images/icons8-search.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import MemberIcon from "assets/images/member-icon.svg";
import { useGetUsersByCompany } from "services/hooks/pcm/usePcmAdminDetail";

const CreateNewAdminMember: FC<any> = ({ companyID }) => {
  const { closeModal } = useModal();
  const { listMembers } = useGetUsersByCompany(companyID, "");
  console.log("listMembers", listMembers);
  return (
    <main className="py-[18px]">
      <header className="flex item-center justify-between h-[50] px-[30px]">
        <p className="text-xl">Thêm thành viên</p>
        <div
          className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center cursor-pointer"
          onClick={() => closeModal()}
        >
          <img src={CloseIcon} alt="Close" className="w-3 h-3" />
        </div>
      </header>

      <section className="mt-4 px-[30px]">
        <div className="relative">
          <input
            type="text"
            className="h-10 w-full bg-cbs-table-header border border-primary-border outline-none px-8"
            placeholder="Nhập từ khóa tìm kiếm"
          />
          <img
            src={SearchIcon}
            alt="Search"
            className="w-4 h-4 absolute top-3 left-2"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center mb-4">
            <input
              className="form-check-input mr-2"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              defaultChecked
            />
            <img src={PolygonIcon} alt="Polygon" />
          </div>

          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              defaultChecked
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>

          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              defaultChecked
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>

          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>

          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>

          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
          <div className="flex items-center">
            <input
              className="form-check-input mr-9"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />

            <div className="flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="mr-4 rounded-full"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-0 pb-6 w-full text-right px-[30px]">
        <button className="w-[95px] h-8 bg-primary text-primary-light rounded font-bold hover:opacity-90">
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default CreateNewAdminMember;
