import { FC, useState } from 'react';
import { toast } from "react-toastify";

/**
 * Libraries
 */
import { Dialog } from '@headlessui/react';
import { Form, Formik, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import debounce from "lodash/debounce";

/**
 * Components, Utils
 */
import { DropdownSearchable } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { BIDDING_PLAN_CONTRACT_TYPE, BIDDING_PLAN_FORM, BIDDING_PLAN_STATUS, FINANCIAL_PLANNING_TYPES } from 'apis/localdb';

/**
 * Hooks
 */
import { useBiddingDoc } from 'services/hooks/bidding/useBiddingDoc';
import { useQueryListCompany } from "services/hooks/useCompanies";

interface ModalProps {
	toggle: () => void;
	onConfirm?: () => void;
	projectID: string,
	planID: string
}

const ModalCreateBiddingDoc: FC<ModalProps> = ({ toggle, onConfirm, projectID, planID }) => {
	const { insertAsync } = useBiddingDoc({});

	const financialSchema = object().shape({
		name: string().required("Bạn cần nhập nội dung"),
	});
	const [bidder, setBidder] = useState("");

	const {
		data: listCompany,
		hasNextPage: hasNextPageCompany,
		fetchNextPage: fetchNextPageCompany
	  } = useQueryListCompany({ limit: 20, keyword: bidder });

	const handleSubmit = async (values: any) => {
		try {
			const { error, data } = await insertAsync({ ...values, planID });

			if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }

            toast.success('Tạo mới thành công', TOAST_DEFAULT_OPTIONS);
			toggle();
			onConfirm && onConfirm();
		} catch (error) {
			if (typeof error === "string") {
                toast.error(error, TOAST_DEFAULT_OPTIONS);
            } else if (error instanceof Error) {
                toast.error(error.message, TOAST_DEFAULT_OPTIONS);
            }
		}
	};

	return (
		<Formik
			initialValues={{ name: '', projectID }}
			validationSchema={financialSchema}
			onSubmit={handleSubmit}
		>
			{
				formik => {
					return (
						<Form autoComplete="off">
							<div className="flex items-center px-6 py-2.5 justify-between bg-cbs-table-header overflow">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-bold"
								>
									Tạo mới
								</Dialog.Title>
								<button className="p-2 rounded-3xl" type="button" onClick={toggle}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="relative px-6 mt-2 pt-3.5 flex-1 md:h-[850px] text-x-small">
								<label className='block'>
									<div className='mb-1.5'>
										Nội dung (*)
									</div>
									<textarea
										rows={2}
										tabIndex={0}
										autoFocus={true}
										placeholder="Nhập nội dung"
										className="py-1.5 px-3 bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('name')}
									/>
									<ErrorMessage
										name="name"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Mã hiệu
									</div>
									<input
										type="text"
										placeholder="Nhập mã hiệu"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('sign')}
									/>
									<ErrorMessage
										name="sign"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Thời điểm phát hành
									</div>
									<input
										type="date"
										placeholder="Nhập kế hoạch bắt đầu"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('releaseTime')}
									/>
									<ErrorMessage
										name="releaseTime"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Thời điểm đóng dấu
									</div>
									<input
										type="date"
										placeholder="Nhập thời điểm đóng dấu"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('closingTime')}
									/>
									<ErrorMessage
										name="closingTime"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Ghi chú
									</div>
									<textarea
										rows={2}
										tabIndex={0}
										autoFocus={true}
										placeholder="Nhập nội dung"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('note')}
									/>
									<ErrorMessage
										name="note"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Giá NET trước VAT
									</div>
									<input
										type="number"
										placeholder="Nhập giá NET trước VAT"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('amount')}
									/>
									<ErrorMessage
										name="amount"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Hệ số 1
									</div>
									<input
										type="number"
										placeholder="Nhập hệ số 1"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('factor1')}
									/>
									<ErrorMessage
										name="factor1"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Hệ số 2
									</div>
									<input
										type="number"
										placeholder="Nhập hệ số 2"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('factor2')}
									/>
									<ErrorMessage
										name="factor2"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Hệ số 3
									</div>
									<input
										type="number"
										placeholder="Nhập hệ số 3"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('factor3')}
									/>
									<ErrorMessage
										name="factor3"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Hệ số 4
									</div>
									<input
										type="number"
										placeholder="Nhập hệ số 4"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('factor4')}
									/>
									<ErrorMessage
										name="factor4"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Hệ số 5
									</div>
									<input
										type="number"
										placeholder="Nhập hệ số 5"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('factor5')}
									/>
									<ErrorMessage
										name="factor5"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Thuế giá trị gia tăng
									</div>
									<input
										type="number"
										placeholder="Nhập thuế giá trị gia tăng"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('vatValue')}
									/>
									<ErrorMessage
										name="vatValue"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
							
							</div>
							<div className="flex justify-end pt-5 px-6 pb-6 mt-6">
								<div>
									<button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-white font-bold text-sm leading-4">Xác nhận</button>
								</div>
							</div>
						</Form>
					)
				}
			}
		</Formik>
	)
}

export default ModalCreateBiddingDoc