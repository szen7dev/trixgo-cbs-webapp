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

CÁC BƯỚC LÀM VIỆC VỚI API
1. Tạo file useCMCS trong thư mục 
/src/services/hooks/useCmcs.ts
2. Tạo file để định nghĩa kiểu giá trị (Typing)
/src/typings/cmcs.d.ts
3. Tạo file khai báo/quản lý việc lấy dữ liệu/làm việc với API
src/apis/cmcs/index.ts
src/apis/item/contract/index.ts => Cho riêng phần hợp đồng
4. Quay lại /src/services/hooks/useCmcs.ts để Import thông tin từ Bước 3
và khai báo các dữ liệu trả về
5. Trở lại file view để đưa data vào
- Import Hooks
- Khai báo Data vào file quản lý chung các view con
- Truyền Data vào view con qua Props