import baseApi from "../../common/api/baseApi";
import { HOLIDAY_ENDPOINTS } from "../../constants/endPoint";
import { PRIVATE_ROUTES } from "../../constants/routes";

export const holidayApi = {
    GetHolidays:() =>
        baseApi.get({
            endPoint : PRIVATE_ROUTES.HOLIDAY+HOLIDAY_ENDPOINTS.GetHolidays
        }),

    GetHolidayById:(id) =>
        baseApi.get({
            endPoint : PRIVATE_ROUTES.HOLIDAY+HOLIDAY_ENDPOINTS.GetHolidayById + id,
        }),

    SaveHoliday:(data) =>
        baseApi.post({
            endPoint : PRIVATE_ROUTES.HOLIDAY+HOLIDAY_ENDPOINTS.SaveHoliday,
            data : data
        }),

    DeleteHoliday:(id) => 
        baseApi.delete({
            endPoint : PRIVATE_ROUTES.HOLIDAY+HOLIDAY_ENDPOINTS.DeleteHoliday + id,
        })
}