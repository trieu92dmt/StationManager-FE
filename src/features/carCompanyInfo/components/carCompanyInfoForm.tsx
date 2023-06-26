import { Avatar, Box, Button, CircularProgress, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { InputField } from 'components/FormFields';
import { DetailCarCompanyResponse, SocialMediaResponse } from 'models/carCompany/detailCarCompany';
import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../pages/carCompanyInfoEdit.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';


export interface CarCompanyInfoFormProps {
    initialValues?: DetailCarCompanyResponse;
    onSubmit?: (formValues: DetailCarCompanyResponse) => void;
}

export default function CarCompanyInfoForm({ initialValues, onSubmit }: CarCompanyInfoFormProps) {

    const [error, setError] = useState<string>('');

    const [socialMediaResponses, setSocialMediaResponses] = useState<SocialMediaResponse[]>(initialValues?.socialMediaResponses || []);

    const [avatarImage, setAvatarImage] = useState<File | null>(null);

    const [avatarImageUrl, setAvatarImageUrl] = useState<string>('');

    const [thumnail, setThumnail] = useState<File | null>(null);

    const [thumnailUrl, setThumnailUrl] = useState<string>('');

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue // <-- thêm setValue vào đây
    } = useForm<DetailCarCompanyResponse>({
        defaultValues: initialValues,
    });

    // Gọi setValue để đặt giá trị mặc định cho các trường trong form
    useEffect(() => {
        if (initialValues) {
            setValue('carCompanyId', initialValues.carCompanyId);
            setValue('carCompanyCode', initialValues.carCompanyCode);
            setValue('carCompanyName', initialValues.carCompanyName);
            setValue('email', initialValues.email);
            setValue('hotline', initialValues.hotline);
            setValue('phoneNumber', initialValues.phoneNumber);
            setValue('officeAddress', initialValues.officeAddress);
            setValue('image', initialValues.image);
            setValue('newImage', initialValues.newImage);
            setValue('newThumnail', initialValues.newThumnail);
            setValue('socialMediaResponses', initialValues.socialMediaResponses);
            setValue('description', initialValues.description);
            setAvatarImageUrl(initialValues.image);
            setThumnailUrl(initialValues.thumnail);
            setSocialMediaResponses(initialValues.socialMediaResponses);
            // ...
        }
    }, [initialValues, setValue]);

    const handleFormSubmit = async (formValues: DetailCarCompanyResponse) => {
        try {
            console.log(formValues)
            // Clear previous submission error
            setError('');

            await onSubmit?.(formValues);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleAvatarInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setAvatarImage(files[0]);
            setValue('newImage', files[0]);
            setAvatarImageUrl(URL.createObjectURL(files[0]))
        }
    };

    const handleThumnailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setThumnail(files[0]);
            setValue('newThumnail', files[0]);
            setThumnailUrl(URL.createObjectURL(files[0]))
        }
    };

    // Hàm để cập nhật giá trị cho một social media response
    const handleSocialMediaChange = (index: number, value: string) => {
        setSocialMediaResponses(prevState => {
            const newSocialMediaResponses = [...prevState];
            if (newSocialMediaResponses[index]) {
                newSocialMediaResponses[index].link = value;
            }
            return newSocialMediaResponses;
        });
    };

    return (
        <Box>
            <Box>
                <form onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
                    <Typography className={styles.title}>
                        Chỉnh sửa thông tin nhà xe
                    </Typography>
                    <Box>
                        <Avatar alt="Remy Sharp" src={avatarImageUrl} className={styles.avatar} />
                        <input
                            accept="image/*"
                            className={styles.inputImg}
                            id="contained-button-file"
                            type="file"
                            onChange={handleAvatarInputChange}
                        />
                        <label htmlFor="contained-button-file" className="d-flex justify-content-center">
                            <Button variant="contained" color="primary" component="span" className={styles.btnEditImage}>
                                Thay đổi
                            </Button>
                        </label>
                    </Box>
                    <Box className={styles.infoGroup}>
                        <Row className='align-items-center'>
                            <Col sm={3}>
                                <label className='fw-bold'>Tên nhà xe:</label>
                            </Col>
                            <Col sm={9}>
                                <InputField name="carCompanyName" control={control} />
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col sm={3}>
                                <label className='fw-bold'>Email:</label>
                            </Col>
                            <Col sm={9}>
                                <InputField name="email" control={control} />
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col sm={3}>
                                <label className='fw-bold'>Hotline:</label>
                            </Col>
                            <Col sm={9}>
                                <InputField name="hotline" control={control} />
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col sm={3}>
                                <label className='fw-bold'>Số điện thoại:</label>
                            </Col>
                            <Col sm={9}>
                                <InputField name="phoneNumber" control={control} />
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col sm={3}>
                                <label className='fw-bold'>Địa chỉ văn phòng:</label>
                            </Col>
                            <Col sm={9}>
                                <InputField name="officeAddress" control={control} />
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col sm={3}>
                                <label className='fw-bold'>Mô tả:</label>
                            </Col>
                            <Col sm={9}>
                                <InputField name="description" control={control} />
                            </Col>
                        </Row>
                        <Box>
                            <label className='fw-bold'>Ảnh Thumnail</label>
                            <img alt="Remy Sharp" src={thumnailUrl} className={styles.thumnail} />
                            <input
                                accept="image/*"
                                className={styles.inputImg}
                                id="thumnail-input"
                                type="file"
                                onChange={handleThumnailInputChange}
                            />
                            <label htmlFor="thumnail-input" className="d-flex justify-content-center">
                                <Button variant="contained" color="primary" component="span" className={`${styles.btnEditImage}`}>
                                    Thay đổi
                                </Button>
                            </label>
                        </Box>
                    </Box>

                    <Box className={styles.infoGroup}>
                        <Typography className={styles.title}>
                            Thông tin mạng xã hội
                        </Typography>
                        {initialValues?.socialMediaResponses?.map((socialMedia, index) => (
                            <React.Fragment key={index}>
                                <Row className='align-items-center'>
                                    <Col sm={3}>
                                        <label className='fw-bold'>{socialMedia.socialMediaName}:</label>
                                    </Col>
                                    <Col sm={9}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            className={styles.socialInput}
                                            name={`socialMediaResponses[${index}].link`}
                                            defaultValue={socialMedia.link !== "null" ? socialMedia.link : ""}
                                            onChange={(e) => handleSocialMediaChange(index, e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <div hidden>
                                    <TextField name={`socialMediaResponses[${index}].socialMediaCode`} defaultValue={socialMedia.socialMediaCode} />
                                </div>
                                <div hidden>
                                    <TextField name={`socialMediaResponses[${index}].socialMediaName`} defaultValue={socialMedia.socialMediaName} />
                                </div>
                            </React.Fragment>
                        ))}
                    </Box>


                    {error && <Alert severity="error">{error}</Alert>}

                    <Box mt={3}>
                        <Button className={styles.btnSubmit} type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            {isSubmitting && <CircularProgress size={16} color="primary" />}
                            &nbsp;Lưu Thay Đổi
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
