"browserslist": [
">0.2%",
"not dead",
"not op_mini all"
],

"lint-staged": {
"src/\*_/_.{js,jsx,ts,tsx,json,css,scss,md} !src/styles/output.css": [
"prettier --write"
]
}

# This Is A Web Application For Core Build Solutions Platform

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# CÁC BƯỚC LÀM VIỆC VỚI MỘT ROUTE CĂN BẢN

1. Khai báo route (layout, view)

2. Tạo file để định nghĩa kiểu giá trị (Typing)
   /src/typings/cmcs.d.ts

3. Tạo file khai báo/quản lý việc lấy dữ liệu/làm việc với API
   src/apis/cmcs/index.ts
   src/apis/item/contract/index.ts => Cho riêng phần hợp đồng

4. Tạo file useCMCS trong thư mục trên cơ sở Import API vào
   /src/services/hooks/useCmcs.ts

5. Trở lại file view để đưa data vào

- Import Hooks
- Khai báo Data vào file quản lý chung các view con
- Truyền Data vào view con qua Props
- View: hiển thị mẩu tin, modal thêm sửa mẩu tin

=================
https://gitlab.com/hiepyen/cbs_webapp/-/commit/14fe624f6da4e93a19966f6a04e341c6b592417d
1-Vào file src/apis/task/index.ts

- Viết hàm mới
- Khai báo Type cho hàm src/typings/task.d.ts
  2-Vào file src/services/hooks/useTask.ts

# LÀM VIỆC VỚI EXCEL

1. Khai báo hàm trong API
2. Khai báo phương thức trong HOOKS -> link tới API
3. Gắn nút bấm vào file View và khai báo các hàm để kết nối tới HOOKS

=================

# LÀM VIỆC VỚI FILE, ẢNH

1.  Triệu gọi các hàm
    import { useUpload } from "services/hooks/useUpload";
    const fileInputRef = useRef<HTMLInputElement>(null);
2.  Khai báo phương thức
    const { addFileToUpload } = useUpload({
    appID: APP_ID.FNB.id,
    companyID: user?.company?.\_id,
    });

    const handleUploadAttach = async (filesSelected: FileList | null, productID: string) => {
    if (!filesSelected || !filesSelected.length) return;

        const validation = await validateFiles(filesSelected);
        if (validation.error) return toast.warn(validation.message);

        // Clear input file
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        const imagesID: any = [];

        // Upload images
        for (const [_, file] of Object.entries(filesSelected)) {
        	const { _id } = await addFileToUpload({
        		files: file as any,
        		fileType: 1,
        		progress: percentCompleted => {
        			console.info(`${percentCompleted}%`)
        		}
        	})
        	_id && imagesID.push(_id);
        }

        // Update image to products
        await API.put(
        	`/api/fnb/products`,
        	{
        		productID,
        		imagesID,
        	}
        );
        refetch();

    }
