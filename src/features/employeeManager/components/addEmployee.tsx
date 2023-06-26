import { Avatar, Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "../styles.module.css"
import EmployeeApi, { addEmployee } from "api/employeeApi";
import { Autocomplete } from "@material-ui/lab";
import { CommonResponse2 } from "models";
import { AddEmployeeRequest } from "models/carCompany/employee/employee";

const AddEmployeeForm = () => {
    const accountId = localStorage.getItem('accountId');

    const [listPosition, setListPosition] = React.useState<CommonResponse2[]>([]);
    // const [position, setPosition] = React.useState<CommonResponse2>();
    const [employeeName, setEmployeeName] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [position, setPosition] = React.useState<CommonResponse2 | null>(null);


    useEffect(() => {
        async function fetchData() {
            try {
                const positions = await EmployeeApi.getListPosition();
                setListPosition(positions.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        // console.log(listPosition)
        // console.log(detailEmployee)
    }, []);

    const handleAddEmployee = () => {
        const request = {
            accountId: accountId,
            employeeName: employeeName,
            email: email,
            phoneNumber: phoneNumber,
            positionCode: position?.key,
            description: description
        } as AddEmployeeRequest

        addEmployee(request)
    }

    return (
        <Box>
            <Box className={styles.formEditCotainer}>
                <Box className={styles.formEditItem}>
                    <Box className={styles.editEmployeeItem}>
                        <Typography className={styles.labelFilter}>Tên nhân viên</Typography>
                        <TextField
                            required
                            className={styles.editEmployeeInput}
                            size="small"
                            id="EmployeeName"
                            variant="outlined"
                            onChange={(e) => setEmployeeName(e.target.value)}/>
                    </Box>
                    <Box className={styles.editEmployeeItem}>
                        <Typography className={styles.labelFilter}>Vị trí</Typography>
                        <Autocomplete
                            id="listPosition"
                            className={styles.editEmployeeInput}
                            options={listPosition}
                            getOptionLabel={(option) => option.value}
                            style={{ width: 300 }}
                            size="small"
                            onChange={(event, newValue) => {
                                setPosition(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </Box>
                    <Box className={styles.editEmployeeItem}>
                        <Typography className={styles.labelFilter}>Số điện thoại</Typography>
                        <TextField
                            required
                            className={styles.editEmployeeInput}
                            size="small"
                            id="PhoneNumer"
                            variant="outlined"
                            onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </Box>
                    <Box className={styles.editEmployeeItem}>
                        <Typography className={styles.labelFilter}>Email</Typography>
                        <TextField
                            required
                            className={styles.editEmployeeInput}
                            size="small"
                            id="Email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)} />
                    </Box>
                    <Box className={styles.editEmployeeItem}>
                        <Typography className={styles.labelFilter}>Ghi chú</Typography>
                        <TextField
                            required
                            className={styles.editEmployeeInput}
                            size="small"
                            id="Description"
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)} />
                    </Box>
                </Box>
                <Box className={styles.formEditItem}>
                    <Avatar className={styles.employeeImage} alt="img" src="https://img.freepik.com/free-vector/man-shows-gesture-great-idea_10045-637.jpg?w=740&t=st=1682266364~exp=1682266964~hmac=a09976e242306631423ab3556d38b87a387d17057659ca20ace4703e5352b3d6" />
                </Box>
            </Box>
            <Button className={styles.btnAddEmployee} onClick={handleAddEmployee}>
                Thêm mới
            </Button>
        </Box>

    );
};

export default AddEmployeeForm;