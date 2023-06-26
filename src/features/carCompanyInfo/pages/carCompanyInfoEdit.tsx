import { Box, Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DetailCarCompanyResponse } from 'models/carCompany/detailCarCompany';
import carCompanyApi from 'api/carCompanyApi';
import { ApiSuccessResponse } from 'models';
import CarCompanyInfoForm from '../components/carCompanyInfoForm';
import styles from './carCompanyInfoEdit.module.css'

export default function EditCarCompanyPage() {
  const history = useHistory();
  const [carCompanyInfo, setCarCompanyInfo] = useState<DetailCarCompanyResponse>();

  const accountId = localStorage.getItem('accountId') ?? "";

  useEffect(() => {
    // IFFE
    (async () => {
      try {
        const data: ApiSuccessResponse<DetailCarCompanyResponse> = await carCompanyApi.getDetail(accountId);
        setCarCompanyInfo(data.data);
      } catch (error) {
        console.log('Failed to fetch car company details', error);
      }
    })();
  }, []);

  const handleFormSubmit = async (formValues: DetailCarCompanyResponse) => {
    // TODO: Handle submit here, call API  to add/update car company
    await carCompanyApi.update(formValues, formValues.newImage, formValues.newThumnail);

    // Toast success
    toast.success('Cập nhật thông tin nhà xe thành công!');

    // Redirect back to car company detail
    //history.push('/company/info');
  };

  const initialValues: DetailCarCompanyResponse = {
    carCompanyCode: "",
    carCompanyId: null,
    carCompanyName: "",
    email: "",
    hotline: "",
    officeAddress: "",
    phoneNumber: "",
    image: "",
    description: "",
    thumnail: "",
    socialMediaResponses: [],
    ...(carCompanyInfo ?? {}),
  } as DetailCarCompanyResponse;


  return (
    <Box maxWidth={800} className={styles.formContainer}>
      <Card variant="outlined">
        <CardContent>
          <CarCompanyInfoForm initialValues={initialValues} onSubmit={handleFormSubmit} />
        </CardContent>
      </Card>
    </Box>
  );
}
