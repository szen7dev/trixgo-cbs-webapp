import { FC } from "react";

import { useModal } from "services/hooks/useModal";
import { toast } from "react-toastify";
import { DepartmentRepositories } from "apis/item/department";

const DeleteMembers: FC<any> = ({ appID, idsChecked, setIdsChecked, refetchGetListAppRoleMenu }) => {
	const { closeModal } = useModal();

	const onDelete = async () => {
		const response = await DepartmentRepositories.addOrRemoveMemberToDepartment({ departmentID: appID, membersRemove: idsChecked });

		if (!response.error) {
			toast.success('Xoá dữ liệu thành công');
			refetchGetListAppRoleMenu();
		} else {
			toast.error('Xoá dữ liệu thất bại');
		}
		closeModal();
	};

	return (
		<main className="relative h-full">
			<header className="px-10 py-4">
				<p className="font-bold text-xl">Bạn có muốn xóa không?</p>
			</header>

			<section className="px-10 text-primary-gray">
				<p>
					Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này
				</p>
			</section>

			<footer className="absolute right-0 bottom-0 px-10 py-9">
				<button
					className="bg-cbs-gray text-dark text-base w-24 h-8 rounded mr-4"
					onClick={closeModal}
				>
					Hủy
				</button>
				<button className="bg-primary text-primary-light text-base w-24 h-8 rounded"
					onClick={onDelete}>
					Xác nhận
				</button>
			</footer>
		</main>
	);
};

export default DeleteMembers;