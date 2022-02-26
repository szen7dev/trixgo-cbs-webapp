
# Datahub guide

Các components liên quan đến form đã được định nghĩa, không thêm/sửa component này (đặc biệt là gắn api vào component)


## Example

```ts
import React from 'react';
import { Form, Formik } from 'formik'
import { CustomAutoCompleteFormik, CustomFieldFormik } from 'views/datahub/sharedComponents/common'

function Example() {
  const initialValues = {};
  const onSubmit = (values: typeof initialValues) => console.log(data);

  return (
    <Formik 
        initialValues={initialValues}
        onSubmit={handleSubmit}
    >
        <Form>
            <CustomAutoCompleteFormik name="select" title="Title" data={[
                { name: 'Tổ hợp chung cư cao tầng K2G' }, // name is default - customable by props "attribute"
            ]} />
            <CustomFieldFormik name='name' title='Tên hợp đồng' required />
            <button type="submit">Submit</button>
        </Form>
    </Formik>
  );
}
```