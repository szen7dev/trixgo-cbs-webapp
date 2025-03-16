import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "services/hooks/auth/useAuth";
import { useUpload } from "services/hooks/useUpload";
import { useInputChange } from "shareComponents/common/InputChange";
import { useMediaPost } from "services/hooks/crm/useMediaPost";

const MEDIA_APP_ID = "5df4ce16506d9b3c587948ca";

export const CreateMediaPost: FC = () => {
  const initialValues = {
    title: "",
    content: "",
    summary: "",
    description: "",
    slug: "",
    status: "1",
    categoryID: "",
    tags: [],
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề không được để trống"),
    content: Yup.string().required("Nội dung không được để trống"),
    summary: Yup.string().required("Tóm tắt không được để trống"),
    description: Yup.string().required("Mô tả không được để trống"),
    slug: Yup.string().required("Đường dẫn/Alias không được để trống"),
    status: Yup.string().required("Trạng thái không được để trống"),
  });

  const history = useHistory();
  const { user } = useAuth();
  const { parentID } = useParams<{ parentID: string }>();
  const [keyword] = useState("");
  const [image, setImage] = useState("/logo_medgo.png");
  const { inputValues, setInputValues } = useInputChange({
    status: "1",
    tags: [],
  });

  const [menus, setMenus] = useState<Record<string, string>[]>([]);
  const [tags, setTags] = useState<Record<string, string>[]>([]);

  const { addFileToUpload } = useUpload({
    appID: MEDIA_APP_ID,
    companyID: user?.company?._id,
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return toast.warn("Không tìm thấy file");

    try {
      if (!event.target.files || !event.target.files.length) return;
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl);
      };
      reader.readAsDataURL(file);

      // const { _id } = await addFileToUpload({
      //   files: file,
      //   progress: (percentCompleted: any) => {
      //     console.log(`${percentCompleted}%`);
      //     // setUploadImageProgress(key, percentCompleted);
      //   },
      // });
      for (const [, file] of Object.entries(event.target.files)) {
        const { _id } = await addFileToUpload({
          files: file as any,
          fileType: 2,
          useCompress: true,
        });
        if (!_id) {
          return toast.warn("Upload thumbnail failed");
        }

        setInputValues((prev: any) => ({
          ...prev,
          thumbnailID: _id,
        }));
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const clickBack = () => {
    history.push("/crm/post");
  };

  const { insertAsync, insertTag, listTags, listMenus } = useMediaPost({
    params: {
      parentID,
      keyword,
      populates: {
        path: "parent category userUpdate userCreate images thumbnail author",
        select: "name fullname parent createAt path",
        populate: {
          path: "parent",
          select: "name",
        },
      },
    },
    isFetchTags: true,
    isFetchMenu: true,
  });

  const handleSubmit = async (values: any) => {
    try {
      const tagIds = inputValues.tags?.map((tag: any) => tag._id);
      const dataInsert = {
        ...values,
        thumbnailID: inputValues.thumbnailID || "",
        tags: tagIds,
      };
      const { error } = await insertAsync(dataInsert);

      if (error) {
        return toast.warn("Tạo bài viết thất bại");
      }

      clickBack();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCreateTag = async (event: any) => {
    if (event.key === "Enter" && event.target.value) {
      event.preventDefault();
      const newTag = event.target.value;

      try {
        const { error, data } = await insertTag({ name: newTag });

        if (!error) {
          setInputValues((prev) => ({
            ...prev,
            tags: [...prev.tags, data],
          }));
          event.target.value = "";
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (listTags && listTags.length) {
      setTags(listTags);
    }

    if (listMenus && listMenus.length) {
      setMenus(listMenus);
    }
  }, [listTags, listMenus]);

  return (
    <main className="relative h-full">
      <Container>
        <Typography>
          <Button onClick={clickBack}>
            <ArrowBackIosNewIcon />
          </Button>
          Bài viết
        </Typography>
        <br />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur }) => (
            <Form
              // onSubmit={handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "26px", fontWeight: "700" }}>
                  Bao nhiêu năng lượng cho đủ hoạt động trong 1 ngày
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ color: "white", textTransform: "none" }}
                >
                  Xác nhận
                </Button>
              </Box>

              <br />
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <Card sx={{ padding: "22px" }}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      <div>
                        <Typography>Tiêu đề bài viết</Typography>
                        <Field
                          as={TextField}
                          fullWidth
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <ErrorMessage name="title">
                          {(msg) => (
                            <Typography className="error-text text-red-500">
                              {msg}
                            </Typography>
                          )}
                        </ErrorMessage>
                      </div>

                      <div>
                        <Typography>Nội dung</Typography>
                        <Field
                          as={TextField}
                          multiline
                          rows={4}
                          fullWidth
                          name="content"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="content">
                          {(msg) => (
                            <Typography className="error-text text-red-500">
                              {msg}
                            </Typography>
                          )}
                        </ErrorMessage>
                      </div>

                      <div>
                        <Typography>Tóm tắt</Typography>
                        <Field
                          as={TextField}
                          multiline
                          rows={2}
                          fullWidth
                          name="summary"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="summary">
                          {(msg) => (
                            <Typography className="error-text text-red-500">
                              {msg}
                            </Typography>
                          )}
                        </ErrorMessage>
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Typography>Tùy chỉnh SEO</Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "hsla(245, 86%, 36%, 1)",
                          }}
                        >
                          Bao nhiêu năng lượng cho đủ hoạt động trong 1 ngày
                        </Typography>
                        <a
                          href="#!"
                          style={{ color: "hsla(139, 100%, 20%, 1)" }}
                        >
                          https://medgo.trixgo.com/tinh-toan-nang-luong-moi-ngay
                        </a>
                        <Typography>
                          Chính thức mở bán Khai Trương cửa hàng thứ 24 tại Hà
                          Nội. Trong thời gian này WINGGO giảm giá 30% cho tổng
                          bill thanh toán tại cơ sở mới. Thân mời bạn bè ở gần
                          ghé qua địa chỉ 112K Thái Thịnh
                        </Typography>
                      </Box>
                      <div>
                        <Typography>Thẻ mô tả</Typography>
                        <Field
                          as={TextField}
                          multiline
                          rows={4}
                          fullWidth
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>

                      <div>
                        <Typography>Đường dẫn/Alias</Typography>
                        <Field
                          as={TextField}
                          fullWidth
                          name="slug"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="slug">
                          {(msg) => (
                            <Typography className="error-text text-red-500">
                              {msg}
                            </Typography>
                          )}
                        </ErrorMessage>
                      </div>
                    </Box>
                  </Card>
                </Grid>
                <Grid item md={4}>
                  <Card sx={{ padding: "22px" }}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      <FormControl>
                        <FormLabel
                          id="demo-radio-buttons-group-label"
                          sx={{ fontWeight: "700" }}
                        >
                          Trạng thái
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="status"
                          defaultValue={initialValues.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Hiển thị"
                          />
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="Ẩn"
                          />
                        </RadioGroup>
                      </FormControl>
                      <div>
                        <Typography sx={{ fontWeight: "700" }}>
                          Ảnh bài viết
                        </Typography>
                        <Box
                          sx={{
                            textAlign: "center",
                            background: "hsla(0, 0%, 80%, 1)",
                            padding: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              width: 200,
                              height: 200,
                              position: "relative",
                              borderRadius: 1,
                              overflow: "hidden",
                              mb: 2,
                              border: "1px solid #ccc",
                              margin: "auto",
                            }}
                          >
                            {/* <img
                                  src={image ? image : '/no_image.png'}
                                  alt="Uploaded Image"
                                /> */}
                            <img
                              src={image ? image : "/no_image.png"}
                              alt="Thumbnail"
                            />
                          </Box>
                          <br />

                          {/* Nút Upload */}
                          <Button
                            variant="contained"
                            component="label"
                            sx={{
                              background: "hsla(135, 59%, 49%, 1)",
                              color: "white",
                              textTransform: "none",
                            }}
                          >
                            Upload ảnh
                            <input
                              name="thumbnailID"
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={handleImageUpload}
                            />
                          </Button>
                        </Box>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button sx={{ textTransform: "none" }}>
                            Cập nhật
                          </Button>
                          <Button
                            sx={{ textTransform: "none" }}
                            onClick={() => setImage("/no_image.png")}
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Typography sx={{ fontWeight: "700" }}>
                          Tác giả
                        </Typography>
                        <Typography>{user?.fullname}</Typography>
                      </div>
                      <div>
                        <Typography sx={{ fontWeight: "700" }}>
                          Danh mục
                        </Typography>
                        <br />
                        <FormControl fullWidth>
                          <InputLabel
                            id="demo-select-small-label"
                            sx={{ fontWeight: "700" }}
                          >
                            Danh mục
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            defaultValue={menus}
                            label="Danh mục"
                            name="categoryID"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {!!menus.length &&
                              menus.map((menu: Record<string, string>) => {
                                return (
                                  <MenuItem value={menu._id} key={menu._id}>
                                    {menu.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </div>
                      <div>
                        <Typography sx={{ fontWeight: "700" }}>Tag</Typography>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={tags}
                          value={inputValues.tags}
                          getOptionLabel={(option) => option?.name}
                          onChange={(_, val: any) => {
                            setInputValues((prev) => ({
                              ...prev,
                              tags: val,
                            }));
                          }}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Nhập và enter để tạo tag mới"
                              onKeyDown={handleCreateTag}
                            />
                          )}
                        />
                      </div>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </main>
  );
};
