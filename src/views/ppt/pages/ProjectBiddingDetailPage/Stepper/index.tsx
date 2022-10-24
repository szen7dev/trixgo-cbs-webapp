import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = [
    'Kế hoạch triển khai gói thầu 15/1/2022',
    'Duyệt danh sách ngắn <br/> 25/2/2022',
    'Phát hành HSMT 16/3/2022',
    'Làm rõ hồ sơ mời thầu 16/5/2022',
    'Mở thầu',
    'Đánh giá và làm rõ về kỹ thuật',
    'Đánh giá và làm rõ về tài chính',
    'Thông báo kết quả lựa chọn',
    'Ký kết hợp đồng',
];
const isStepFailed = (step: number) => {
    return step === 1;
};

export default function BiddingStepper() {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label, index) => {
                    const labelProps: {
                        optional?: React.ReactNode;
                        error?: boolean;
                    } = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Alert message
                            </Typography>
                        );
                        labelProps.error = true;
                    }
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                }
                )}
            </Stepper>
        </Box>
    );
}
