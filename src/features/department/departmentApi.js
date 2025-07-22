import baseApi from "../../common/api/baseApi";
import { DEPARTMENT_ENDPOINTS } from "../../constants/endPoint";
import { PRIVATE_ROUTES } from "../../constants/routes";

export const departmentApi = {
    GetDepartments:() =>
        baseApi.get({
            endPoint : PRIVATE_ROUTES.DEPARTMENT+DEPARTMENT_ENDPOINTS.GetDepartments
        }),

    GetDepartmentById:(id) =>
        baseApi.get({
            endPoint : PRIVATE_ROUTES.DEPARTMENT+DEPARTMENT_ENDPOINTS.GetDepartmentById + id,
        }),

    SaveDepartment:(data) =>
        baseApi.post({
            endPoint : PRIVATE_ROUTES.DEPARTMENT+DEPARTMENT_ENDPOINTS.SaveDepartment,
            data : data
        }),

    DeleteDepartment:(id) => 
        baseApi.delete({
            endPoint : PRIVATE_ROUTES.DEPARTMENT+DEPARTMENT_ENDPOINTS.DeleteDepartment + id,
        })
}