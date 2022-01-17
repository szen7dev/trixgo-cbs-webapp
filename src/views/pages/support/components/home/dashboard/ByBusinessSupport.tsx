import { FC } from "react";
import { useListCompanyAccess } from 'services/hooks/useSupport';
import moment from 'moment';

const ByBusinessSupport: FC = () => {
  const { listCompany } = useListCompanyAccess();
  console.log('listCompany',listCompany)
  return (
    <section className="h-[834px] bg-primary-light px-6 py-4 mt-3">
      <p className="text-primary-gray text-lg font-bold">Theo doanh nghiệp</p>

      <div className="mt-6 text-primary-gray">
        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-full" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-1/2" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div>
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-4/6" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-full" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-1/2" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div>
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-4/6" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-full" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-1/2" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div>
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-4/6" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-full" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-1/2" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div>
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-4/6" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-full" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div className="mb-2">
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-1/2" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>

        <div>
          <p>Công ty cổ phần ABC</p>

          <div className="flex items-center justify-between">
            <div className="w-full mr-4">
              <div className="h-2 bg-primary w-4/6" />
            </div>
            <span className="w-1/12">12,2k</span>
          </div>
        </div>
      </div>

      <p className="mt-5 text-primary">Xem tất cả</p>
    </section>
  );
};

export default ByBusinessSupport;
