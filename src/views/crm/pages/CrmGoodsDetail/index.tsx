/*=====1.LIBRARY=====*/
import { FC, useState, useEffect, useRef, ChangeEvent } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { validateFiles } from "validation/file";

/*=====2.COMPONENTS=====*/
import { QuillEditor } from "shareComponents/common/QuillEditor";
import { ModalZoomView } from "shareComponents/common";

/*=====3.HOOKS=====*/
import { useGoods } from "services/hooks/items/useGoods";
import { useAuth } from "services/hooks/auth/useAuth";
import { useUpload } from "services/hooks/useUpload";

/*=====3.ICONS=====*/
import CameraIcon from "assets/images/camera-icon.svg";

/*=====4.CONSTANTS=====*/
import { APP_ID } from "apis/localdb";
import API from "apis/repository";
import { ImageProps } from "typings/common";

interface FormData {
  goodsID: string;
  name: string;
  sign: string;
  unit: string;
  unitprice: number;
  sellingUnitprice: number;
  listedUnitprice: number;
  description: string;
  features: string;
  ingredients: string;
  benefits: string;
  instructions: string;
  sideEffects: string;
  warnings: string;
  storage: string;
}

interface ImageState {
  mediaID: string;
  images: ImageProps[];
  index: number;
  createAt: string;
}

export const CrmGoodsDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { addFileToUpload } = useUpload({
    appID: APP_ID.ITEM.id,
    companyID: user?.company?._id,
  });

  const [formData, setFormData] = useState<FormData>({
    goodsID: id,
    name: "",
    sign: "",
    unit: "",
    unitprice: 0,
    sellingUnitprice: 0,
    listedUnitprice: 0,
    description: "",
    features: "",
    ingredients: "",
    benefits: "",
    instructions: "",
    sideEffects: "",
    warnings: "",
    storage: "",
  });

  const { info, updateAsync, refetchInfo } = useGoods({
    params: { goodsID: id },
    isFetchInfo: true,
  });

  const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);
  const [imageState, setImageState] = useState<ImageState>({
    mediaID: "",
    images: [],
    index: 0,
    createAt: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (info) {
      setFormData({
        goodsID: id,
        name: info.name || "",
        sign: info.sign || "",
        unit: info.unit || "",
        unitprice: Number(info.unitprice) || 0,
        sellingUnitprice: Number(info.sellingUnitprice) || 0,
        listedUnitprice: info.listedUnitprice || 0, // Since this field doesn't exist in Goods type
        description: info.description || "",
        features: info.features || "", // Since these fields don't exist in Goods type
        ingredients: info.ingredients || "",
        benefits: info.benefits || "",
        instructions: info.instructions || "",
        sideEffects: info.sideEffects || "",
        warnings: info.warnings || "",
        storage: info.storage || "",
      });
    }
  }, [info, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleQuillChange = (name: string) => (content: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: content,
    }));
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const { path } = await addFileToUpload({
        files: file as any,
        fileType: 1,
        progress: (percentCompleted) => {
          console.info(`${percentCompleted}%`);
        },
      });

      return `${process.env.REACT_APP_URL_S3}${path}`;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const handleUploadAttach = async (filesSelected: FileList | null) => {
    if (!filesSelected || !filesSelected.length) return;

    const validation = await validateFiles(filesSelected);
    if (validation.error) {
      return toast.warn(validation.message);
    }

    const imagesID: any = [];

    try {
      // Upload images
      for (const [_, file] of Object.entries(filesSelected)) {
        const { _id } = await addFileToUpload({
          files: file as any,
          fileType: 1,
          progress: (percentCompleted) => {
            console.info(`${percentCompleted}%`);
          },
        });
        console.log(_id);
        _id && imagesID.push(_id);
      }

      // Clear input file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Update image to products
      await API.put(`/api/item/goods`, {
        goodsID: id,
        imagesID,
      });

      toast.success("Cập nhật ảnh thành công");
      // Refetch the goods info to get updated images
      await refetchInfo();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật ảnh");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      return toast.warn("Vui lòng nhập nội dung");
    }

    setIsLoading(true);
    try {
      const { error, message } = await updateAsync(formData);

      if (error) {
        return toast.warning(message);
      }

      toast.success("Cập nhật thành công", { autoClose: 1500 });
      history.push("/crm/goods");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    history.push("/crm/goods");
  };

  const handleRemoveImage = async (imageId: string) => {
    try {
      await API.put(`/api/item/goods`, {
        goodsID: id,
        removeImageID: imageId,
      });

      toast.success("Xóa ảnh thành công");
      await refetchInfo();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi xóa ảnh");
    }
  };

  const renderImageSection = () => (
    <div className="mt-8">
      <label className="block mb-2 font-medium text-large">
        Hình ảnh sản phẩm
      </label>
      <div className="flex flex-wrap gap-2">
        {info?.images?.map((image: any, i: number) => (
          <div
            key={image._id}
            className="mt-2 cursor-pointer relative w-[75px] h-[75px] group"
          >
            <img
              src={`${process.env.REACT_APP_URL_S3}${image?.path}`}
              alt={`Product image ${i + 1}`}
              className="w-full h-full object-cover rounded"
              onClick={() => {
                setImageState({
                  mediaID: image._id,
                  images: info.images,
                  index: i,
                  createAt: image.createAt,
                });
                setIsShowImageFullScreen(true);
              }}
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-white rounded-full h-5 w-5 flex justify-center items-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation(); // Prevent opening the zoom view
                handleRemoveImage(image._id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}

        <label className="mt-2">
          <div className="w-[75px] h-[75px] bg-secondary-gray rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
            <img src={CameraIcon} alt="Upload" className="w-[24px] h-[24px]" />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleUploadAttach(e.target.files)
              }
            />
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <main className="relative h-full bg-white">
      <header className="sticky top-0 bg-primary-light z-10 border-b border-primary-border">
        <div className="h-[50px] flex items-center justify-between px-5">
          <h1 className="text-xl font-bold">Chi tiết sản phẩm</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Quay lại
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </header>

      <div className="p-5 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block mb-2 font-medium text-large">
              Nội dung
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-large">Mã hiệu</label>
            <input
              type="text"
              name="sign"
              value={formData.sign}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-large">
              Đơn vị tính
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-large">
              Đơn giá nhập
            </label>
            <input
              type="number"
              name="unitprice"
              value={formData.unitprice}
              onChange={handleNumberInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-large">
              Đơn giá xuất
            </label>
            <input
              type="number"
              name="sellingUnitprice"
              value={formData.sellingUnitprice}
              onChange={handleNumberInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-large">
              Đơn giá bán niêm yết
            </label>
            <input
              type="number"
              name="listedUnitprice"
              value={formData.listedUnitprice}
              onChange={handleNumberInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {renderImageSection()}

        <div className="mt-8">
          <label className="block mb-2 font-medium text-large">
            Mô tả sản phẩm
          </label>
          <div className="mb-6">
            <QuillEditor
              placeholder="Nhập mô tả sản phẩm"
              value={formData.description}
              onChange={(value) => handleQuillChange("description")(value)}
              onUploadImage={handleImageUpload}
            />
          </div>

          <label className="block mb-2 font-medium text-large">
            Đặc điểm nổi bật
          </label>
          <div className="mb-6">
            <QuillEditor
              placeholder="Nhập đặc điểm nổi bật"
              value={formData.features}
              onChange={(value) => handleQuillChange("features")(value)}
              onUploadImage={handleImageUpload}
            />
          </div>

          <label className="block mb-2 font-medium text-large">
            Thành phần
          </label>
          <div className="mb-6">
            <QuillEditor
              placeholder="Nhập thành phần"
              value={formData.ingredients}
              onChange={(value) => handleQuillChange("ingredients")(value)}
              onUploadImage={handleImageUpload}
            />
          </div>

          <label className="block mb-2 font-medium text-large">
            Công dụng/lợi ích
          </label>
          <div className="mb-6">
            <QuillEditor
              placeholder="Nhập công dụng/lợi ích"
              value={formData.benefits}
              onChange={(value) => handleQuillChange("benefits")(value)}
              onUploadImage={handleImageUpload}
            />
          </div>

          <label className="block mb-2 font-medium text-large">Cách dùng</label>
          <div className="mb-6">
            <QuillEditor
              placeholder="Nhập cách dùng"
              value={formData.instructions}
              onChange={(value) => handleQuillChange("instructions")(value)}
              onUploadImage={handleImageUpload}
            />
          </div>

          <label className="block mb-2 font-medium text-large">
            Tác dụng phụ
          </label>
          <div className="mb-6">
            <QuillEditor
              placeholder="Nhập tác dụng phụ"
              value={formData.sideEffects}
              onChange={(value) => handleQuillChange("sideEffects")(value)}
              onUploadImage={handleImageUpload}
            />
          </div>

          <label className="block mb-2 font-medium text-large">Lưu ý</label>
          <div className="mb-6">
            <QuillEditor
              placeholder="Nhập lưu ý"
              value={formData.warnings}
              onChange={(value) => handleQuillChange("warnings")(value)}
              onUploadImage={handleImageUpload}
            />
          </div>

          <label className="block mb-2 font-medium text-large">Bảo quản</label>
          <div className="mb-6">
            <QuillEditor
              placeholder="Nhập hướng dẫn bảo quản"
              value={formData.storage}
              onChange={(value) => handleQuillChange("storage")(value)}
              onUploadImage={handleImageUpload}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      <ModalZoomView
        isShow={isShowImageFullScreen}
        toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
        initialData={imageState}
      />
    </main>
  );
};
