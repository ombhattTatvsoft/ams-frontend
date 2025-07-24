import React, { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { getHolidays } from "../holidaySlice";
import Loader from "../../../common/components/ui/Loader";
import { getUserData } from "../../../utils/manageUserData";
import { ROLES } from "./../../../constants/roles";
import { toast } from "react-toastify";
import PopUpModal from "../../../common/components/ui/PopUpModal";
import HolidayUpsertForm from "./HolidayUpsertForm";
import { GENERAL } from "../../../constants/general";

const today = new Date();

const Holiday = () => {
  const { loading, holidays } = useSelector((state) => state.holiday);
  const dispatch = useDispatch();
  const [showUpsertModal, setShowUpsertModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const user = getUserData();
  const role = user.roleName;
  const entity = "Holiday";

  useEffect(() => {
    if (holidays.length === 0) {
      dispatch(getHolidays());
    }
  }, [dispatch, holidays.length]);

  const form = useMemo(
    () => (
      <HolidayUpsertForm
        editData={editData}
        goBack={() => setShowUpsertModal(false)}
      />
    ),
    [editData]
  );

  return (
    <>
      {loading && <Loader />}
      <div className="content">
        <div className="row">
          <div>
            <h3 className="sitetxtcolor">Holiday</h3>
          </div>
          <div className="col-12">
            <div className="card p-3">
              <FullCalendar
                plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                height={window.innerHeight - 200}
                headerToolbar={{
                  left: "prev next today",
                  center: "title",
                  right: "dayGridMonth listMonth listYear",
                }}
                buttonText={{
                  today: "Today",
                  month: "Month",
                  dayGridMonth: "Month View",
                  listMonth: " Monthly List",
                  listYear: "Yearly List",
                }}
                initialView="dayGridMonth"
                events={holidays}
                dateClick={function (arg) {
                  if (role === ROLES.ADMIN) {
                    const selectedDate = new Date(arg.dateStr);
                    if (selectedDate <= today) {
                      toast.error(GENERAL.ADD_PAST_HOLIDAY);
                      return;
                    }
                    setEditData({
                      holidayId: 0,
                      holidayName: "",
                      holidayDate: arg.dateStr,
                    });
                    setShowUpsertModal(true);
                  }
                }}
                eventClick={function (arg) {
                  if (role === ROLES.ADMIN) {
                    const selectedDate = new Date(arg.event.start);
                    if (selectedDate <= today) {
                      toast.error(GENERAL.EDIT_PAST_HOLIDAY);
                      return;
                    }
                    setEditData({
                      holidayId: arg.event.id,
                      holidayName: arg.event.title,
                      holidayDate: arg.event.startStr,
                    });
                    setShowUpsertModal(true);
                  }
                }}
                // eventContent={renderEventContent}
              />
            </div>
          </div>
        </div>
      </div>
      {/* upsert modal */}
      <PopUpModal
        showModal={showUpsertModal}
        setShowModal={setShowUpsertModal}
        title={entity}
        body={form}
      ></PopUpModal>
    </>
  );
};
// a custom render function
// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <div>
//         <strong>{eventInfo.event}</strong>
//         <br />
//         <span>{eventInfo.event.title}</span>
//       </div>
//     </>
//   );
// }
export default Holiday;
